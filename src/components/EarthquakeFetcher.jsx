import React, { useEffect, useState } from "react";

export default function EarthquakeFetcher() {
  const [earthquakes, setEarthquakes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // USGS 24-hour earthquake data (GeoJSON)
    const url =
      "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson";

    async function fetchEarthquakes() {
      try {
        setLoading(true);
        const response = await fetch(url);

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        // GeoJSON data is inside data.features (array)
        const features = data.features || [];

        // Let's extract the key fields we care about
        const parsed = features.map((f) => ({
          id: f.id,
          place: f.properties.place,
          mag: f.properties.mag,
          time: new Date(f.properties.time).toLocaleString(),
          coordinates: f.geometry.coordinates, // [lon, lat, depth]
        }));

        // Save to state
        setEarthquakes(parsed);

        // Log a sample to verify
        console.log("✅ Sample Earthquake Data:");
        console.log(parsed.slice(0, 5)); // log first 5 items
      } catch (err) {
        console.error("❌ Error fetching earthquake data:", err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchEarthquakes();
  }, []); // run once on mount

  return (
    <div style={{ padding: "1rem" }}>
      <h2>USGS Earthquake Data (Past 24 Hours)</h2>

      {loading && <p>Loading...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!loading && !error && (
        <ul>
          {earthquakes.slice(0, 5).map((eq) => (
            <li key={eq.id}>
              <strong>{eq.place}</strong> — Mag {eq.mag} <br />
              {eq.time}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
