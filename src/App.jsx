import React, { useEffect, useState } from "react";
import WorldMap from "./components/WorldMap";
import "./App.css";

export default function App() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [earthquakes, setEarthquakes] = useState([]);

  // 🧠 Fetch data when component mounts
  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError(null); // reset error before fetching

      try {
        const res = await fetch(
          "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson"
        );

        if (!res.ok) {
          throw new Error(`HTTP error! Status: ${res.status}`);
        }

        const data = await res.json();
        setEarthquakes(data.features);
      } catch (err) {
        console.error("Fetch error:", err);
        setError("⚠️ Unable to load earthquake data. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="app-container">
      {/* ===== Header ===== */}
      <header className="app-header">
        <h1>🌎 Earthquake Visualizer</h1>
      </header>

      {/* ===== Main Content ===== */}
      <main className="map-container">
        {loading && (
          <div className="spinner-container">
            <div className="spinner"></div>
            <p>Loading data...</p>
          </div>
        )}

        {error && (
          <div className="error-container">
            <p>{error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        )}

        {!loading && !error && earthquakes.length > 0 && (
          <WorldMap earthquakes={earthquakes} />
        )}
      </main>

      {/* ===== Footer ===== */}
      <footer className="app-footer">
        Data source:{" "}
        <a
          href="https://earthquake.usgs.gov"
          target="_blank"
          rel="noopener noreferrer"
        >
          USGS Earthquake API
        </a>
      </footer>
    </div>
  );
}
