import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// 🧭 Fix marker icon paths (needed for Vite/Cra builds)
import iconRetinaUrl from "leaflet/dist/images/marker-icon-2x.png";
import iconUrl from "leaflet/dist/images/marker-icon.png";
import shadowUrl from "leaflet/dist/images/marker-shadow.png";
L.Icon.Default.mergeOptions({ iconRetinaUrl, iconUrl, shadowUrl });

export default function EarthquakeMap() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🛰 Fetch data from USGS
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );
        const data = await res.json();
        const features = data.features || [];

        const parsed = features.map((f) => ({
          id: f.id,
          place: f.properties.place,
          mag: f.properties.mag,
          time: new Date(f.properties.time).toLocaleString(),
          coordinates: f.geometry.coordinates, // [lon, lat, depth]
        }));

        setEarthquakes(parsed);
      } catch (err) {
        console.error("❌ Failed to fetch earthquake data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ height: "100vh", width: "100%" }}>
      <MapContainer
        center={[20, 0]}
        zoom={2}
        style={{ height: "100%", width: "100%" }}
        scrollWheelZoom={true}
      >
        {/* 🗺 OpenStreetMap tiles */}
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors'
        />

        {/* 📍 Plot earthquake markers */}
        {!loading &&
          earthquakes.map((eq) => {
            const [lon, lat] = eq.coordinates;
            return (
              <Marker key={eq.id} position={[lat, lon]}>
                <Popup>
                  <div style={{ minWidth: "180px" }}>
                    <strong>{eq.place}</strong>
                    <br />
                    <span>
                      Magnitude: <b>{eq.mag}</b>
                    </span>
                    <br />
                    <span>{eq.time}</span>
                  </div>
                </Popup>
              </Marker>
            );
          })}
      </MapContainer>

      {/* Simple overlay message */}
      {loading && (
        <div
          style={{
            position: "absolute",
            top: "10px",
            left: "50%",
            transform: "translateX(-50%)",
            background: "rgba(255,255,255,0.9)",
            padding: "8px 16px",
            borderRadius: "8px",
            fontWeight: "500",
            boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
          }}
        >
          Loading earthquake data...
        </div>
      )}
    </div>
  );
}
