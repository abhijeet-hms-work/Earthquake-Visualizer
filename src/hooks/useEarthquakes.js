// src/hooks/useEarthquakes.js
import { useEffect, useState } from "react";
import { fetchAllDay } from "../api/usgs";

export default function useEarthquakes({ pollIntervalMs = 0 } = {}) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const load = async () => {
    setLoading(true);
    setError(null);
    try {
      const geo = await fetchAllDay();
      setData(geo.features || []);
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    if (pollIntervalMs > 0) {
      const id = setInterval(load, pollIntervalMs);
      return () => clearInterval(id);
    }
  }, [pollIntervalMs]);

  return { data, loading, error, reload: load };
}
