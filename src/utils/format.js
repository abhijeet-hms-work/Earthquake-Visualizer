// Format magnitude to one decimal place
export const formatMagnitude = (magnitude) => {
  return Number(magnitude).toFixed(1);
};

// Format date to local string
export const formatDate = (dateString) => {
  return new Date(dateString).toLocaleString();
};

// Format depth to kilometers with unit
export const formatDepth = (depth) => {
  return `${depth.toFixed(1)} km`;
};
