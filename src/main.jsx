import React from "react";
import ReactDOM from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App";
import { EarthquakeProvider } from "./context/EarthquakeProvider";

// Set up React root
const root = ReactDOM.createRoot(document.getElementById("root"));

// Render the app
root.render(
  <EarthquakeProvider>
    <App />
  </EarthquakeProvider>
);
