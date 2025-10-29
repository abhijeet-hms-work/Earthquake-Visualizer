// src/api/usgs.js
import axios from "axios";

const USGS_BASE = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary";

export async function fetchAllDay() {
  // returns the parsed geojson
  const url = `${USGS_BASE}/all_day.geojson`;
  const res = await axios.get(url, { timeout: 10000 });
  return res.data; // geojson: .features is array
}
