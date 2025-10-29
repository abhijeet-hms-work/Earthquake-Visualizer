# Earthquake Visualizer

A real-time interactive web app that visualizes global earthquake activity using data from the USGS Earthquake API.
Built with React and Leaflet, it shows earthquake locations, magnitudes, and times on an interactive world map.

## 📖 Project Description

The Earthquake Visualizer fetches live earthquake data from the USGS GeoJSON feed and displays each event as a color-coded marker on a global map.
Markers are colored based on the magnitude to help you quickly identify minor and major quakes.

Users can:

- Pan and zoom across the world
- Click markers to view detailed information
- Filter or explore real-time earthquake patterns

## ✨ Features

✅ Real-time data fetching from the USGS API  
✅ Interactive world map using React-Leaflet  
✅ Color-coded markers by magnitude:

- 🟢 Green for magnitude < 3
- 🟠 Orange for magnitude 3–5
- 🔴 Red for magnitude > 5  
  ✅ Clickable popups showing location, magnitude, and time  
  ✅ Hover tooltips for quick info  
  ✅ Loading and error handling with retry option  
  ✅ Responsive design (works on mobile & desktop)  
  ✅ Footer with data source credit

## 🧰 Tech Stack

| Frontend | React (Vite or CRA) |
| Map Library | Leaflet + React-Leaflet |
| Styling | Plain CSS |
| Data Source | USGS Earthquake GeoJSON API |
| Deployment | CodeSandbox / Netlify |

## 🚀 How to Run Locally

### 1️⃣ Clone the repository

```bash
git clone https://github.com/yourusername/earthquake-visualizer.git
cd earthquake-visualizer
```

### 2️⃣ Install dependencies

```bash
npm install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

The app will start at http://localhost:5173 (for Vite)  
Or http://localhost:3000 (for Create React App)

## 🚀 Deployment Options

### ▶️ Option 1: Run on CodeSandbox

1. Go to https://codesandbox.io/
2. Click "Create Sandbox" → "Import from GitHub"
3. Paste your GitHub repo URL
4. It will auto-install dependencies and run your app instantly!

🧩 **Tip**: Make sure your API URL is accessible (https://earthquake.usgs.gov/...)

## 🙏 Acknowledgments

- Data: USGS Earthquake Hazards Program
- Maps: OpenStreetMap Contributors
- Icons: Leaflet default icons

## 💡 Future Improvements

- Add magnitude range filters
- Add marker clustering for dense regions
- Support dark/light map themes
- Show live data refresh every 5 minutes
