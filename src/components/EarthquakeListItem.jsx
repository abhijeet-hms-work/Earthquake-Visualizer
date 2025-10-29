import React, { useContext } from "react";
import { EarthquakeContext } from "../context/EarthquakeProvider";

export default function EarthquakeListItem({ quake }) {
  const { dispatch } = useContext(EarthquakeContext);
  const { mag, place, time } = quake.properties;

  return (
    <div
      onClick={() => dispatch({ type: "SET_SELECTED", payload: quake.id })}
      style={{ padding: 8, borderBottom: "1px solid #eee", cursor: "pointer" }}
    >
      <div>
        <strong>{mag ?? "—"}</strong> — {place}
      </div>
      <div style={{ fontSize: 12, color: "#666" }}>
        {new Date(time).toLocaleString()}
      </div>
    </div>
  );
}
