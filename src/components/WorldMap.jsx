import React, { useMemo } from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Fix default icons
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";

L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export default function WorldMap({ earthquakes }) {
  const getColor = (mag) => (mag < 3 ? "green" : mag < 5 ? "orange" : "red");

  const createColoredIcon = (color) =>
    L.divIcon({
      html: `<div style="
        background-color:${color};
        width:14px;
        height:14px;
        border-radius:50%;
        border:2px solid white;
        box-shadow: 0 0 4px rgba(0,0,0,0.4);
      "></div>`,
      className: "",
      iconSize: [14, 14],
    });

  const markers = useMemo(() => {
    if (!earthquakes) return [];
    return earthquakes
      .map((eq) => {
        if (!eq?.geometry?.coordinates) return null;
        const [lon, lat] = eq.geometry.coordinates;
        const mag = eq.properties?.mag;
        const place = eq.properties?.place;
        const time = new Date(eq.properties?.time).toLocaleString();

        return (
          <Marker
            key={eq.id}
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
      })
      .filter(Boolean);
  }, [earthquakes]);

  return (
    <MapContainer
      center={[20, 0]}
      zoom={3}
      style={{ height: "100%", width: "100vw" }}
      scrollWheelZoom={true}
      minZoom={2}
      maxBounds={[
        [-90, -180],
        [90, 180],
      ]}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
      />
      {markers}
    </MapContainer>
  );
}
