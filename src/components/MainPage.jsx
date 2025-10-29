import React, { useContext, useEffect } from "react";
import { EarthquakeContext } from "../context/EarthquakeProvider";
import useEarthquakes from "../hooks/useEarthquakes";
import MapView from "./MapView";
import Sidebar from "./Sidebar";

export default function MainPage() {
  const { data, loading, error, reload } = useEarthquakes({
    pollIntervalMs: 0,
  });
  const { dispatch } = useContext(EarthquakeContext);

  useEffect(() => {
    dispatch({ type: "SET_LOADING", payload: loading });
  }, [loading, dispatch]);

  useEffect(() => {
    if (data) dispatch({ type: "SET_QUAKES", payload: data });
  }, [data, dispatch]);

  return (
    <div
      className="app-container"
      style={{
        display: "grid",
        gridTemplateColumns: "360px 1fr",
        height: "100vh",
      }}
    >
      <Sidebar reload={reload} />
      <MapView />
    </div>
  );
}
