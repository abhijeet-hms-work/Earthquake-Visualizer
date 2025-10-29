// src/context/EarthquakeProvider.jsx
import React, { createContext, useReducer } from "react";

const initialState = {
  quakes: [],
  loading: false,
  error: null,
  selectedId: null,
  filters: { minMag: 0 },
};

function reducer(state, action) {
  switch (action.type) {
    case "SET_QUAKES":
      return { ...state, quakes: action.payload };
    case "SET_LOADING":
      return { ...state, loading: action.payload };
    case "SET_ERROR":
      return { ...state, error: action.payload };
    case "SET_SELECTED":
      return { ...state, selectedId: action.payload };
    case "SET_FILTERS":
      return { ...state, filters: { ...state.filters, ...action.payload } };
    default:
      return state;
  }
}

export const EarthquakeContext = createContext();

export function EarthquakeProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <EarthquakeContext.Provider value={{ state, dispatch }}>
      {children}
    </EarthquakeContext.Provider>
  );
}
