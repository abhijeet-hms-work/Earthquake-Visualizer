import React, { useContext } from "react";
import { EarthquakeContext } from "../context/EarthquakeProvider";
import EarthquakeListItem from "./EarthquakeListItem";

export default function Sidebar({ reload }) {
  const { state } = useContext(EarthquakeContext);
  const { quakes, loading, filters } = state;

  const filtered = quakes.filter(
    (f) => (f.properties.mag || 0) >= (filters.minMag || 0)
  );

  return (
    <aside
      style={{ padding: 12, borderRight: "1px solid #ddd", overflowY: "auto" }}
    >
      <h2>Earthquakes (24h)</h2>
      <button onClick={reload}>Refresh</button>
      <div>Showing: {filtered.length}</div>
      {loading && <div>Loading...</div>}
      {!loading &&
        filtered.map((q) => <EarthquakeListItem key={q.id} quake={q} />)}
    </aside>
  );
}
