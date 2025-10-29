import React, { useContext, useEffect, useState, useMemo } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  ZoomControl,
  Tooltip,
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import L from "leaflet";
import { EarthquakeContext } from "../context/EarthquakeProvider";

// Utility functions
const getColor = (magnitude) => {
  if (magnitude >= 7) return "#ff0000"; // Red for major earthquakes
  if (magnitude >= 5) return "#ff6600"; // Orange for moderate to strong
  if (magnitude >= 3) return "#ffcc00"; // Yellow for light to moderate
  return "#00cc00"; // Green for minor earthquakes
};

const createColoredIcon = (color) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      width: 24px;
      height: 24px;
      background-color: ${color};
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 0 4px rgba(0,0,0,0.4);
    "></div>`,
    iconSize: [24, 24],
    iconAnchor: [12, 12],
  });
};

const createClusterIcon = (cluster) => {
  return L.divIcon({
    html: `<div class="cluster-marker">${cluster.getChildCount()}</div>`,
    className: "custom-cluster-marker",
    iconSize: L.point(40, 40),
  });
};

// FlyTo component for selected earthquakes
function FlyToSelected({ selected, quakes }) {
  const map = useMap();

  useEffect(() => {
    if (!selected) return;
    const earthquake = quakes.find((q) => q.id === selected);
    if (earthquake) {
      const [lng, lat] = earthquake.geometry.coordinates;
      map.flyTo([lat, lng], 6, { duration: 1.2 });
    }
  }, [selected, quakes, map]);

  return null;
}

// Earthquake Marker component
function EarthquakeMarker({ earthquake }) {
  const [lon, lat] = earthquake.geometry.coordinates;
  const mag = earthquake.properties?.mag;
  const place = earthquake.properties?.place;
  const time = new Date(earthquake.properties?.time).toLocaleString();

  return (
    <Marker
      key={earthquake.id}
      position={[lat, lon]}
      icon={createColoredIcon(getColor(mag))}
    >
      <Tooltip direction="top" offset={[0, -10]} opacity={0.9}>
        <strong>{mag}</strong> — {place}
      </Tooltip>

      <Popup>
        <strong>{place || "Unknown location"}</strong>
        <br />
        Magnitude: {mag}
        <br />
        Time: {time}
      </Popup>
    </Marker>
  );
}

// Map Content component
function MapContent({ quakes, selectedId }) {
  const [filterRange, setFilterRange] = useState([0, 10]);

  const filteredQuakes = useMemo(() => {
    return Array.isArray(quakes)
      ? quakes.filter((eq) => {
          const mag = eq?.properties?.mag ?? 0;
          return mag >= filterRange[0] && mag <= filterRange[1];
        })
      : [];
  }, [quakes, filterRange]);

  return (
    <>
      <div className="magnitude-filter">
        <label>Filter magnitude: </label>
        <input
          type="range"
          min="0"
          max="10"
          step="0.1"
          value={filterRange[1]}
          onChange={(e) => setFilterRange([0, Number(e.target.value)])}
        />
        <span>Up to {filterRange[1]}</span>
      </div>

      <ZoomControl position="bottomright" />

      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MarkerClusterGroup chunkedLoading iconCreateFunction={createClusterIcon}>
        {filteredQuakes.map((earthquake) =>
          earthquake?.geometry?.coordinates ? (
            <EarthquakeMarker key={earthquake.id} earthquake={earthquake} />
          ) : null
        )}
      </MarkerClusterGroup>

      {selectedId && <FlyToSelected selected={selectedId} quakes={quakes} />}
    </>
  );
}

// Main MapView component
export default function MapView() {
  const { state } = useContext(EarthquakeContext);
  const { quakes = [], selectedId } = state || {};
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    return () => setMounted(false);
  }, []);

  if (!mounted) return null;

  return (
    <div className="map-wrapper">
      <MapContainer
        center={[30, 0]}
        zoom={3}
        className="leaflet-container"
        scrollWheelZoom={true}
        zoomControl={false}
        minZoom={2}
        maxZoom={18}
        maxBounds={[[-90, -180], [90, 180]]}
        maxBoundsViscosity={1.0}
      >
        <MapContent quakes={quakes} selectedId={selectedId} />
      </MapContainer>
    </div>
  );
}
