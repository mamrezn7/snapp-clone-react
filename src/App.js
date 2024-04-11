import { MapContainer, TileLayer } from "react-leaflet";
import "./App.scss";
import "leaflet/dist/leaflet.css";

import Map from "./components/map/map";

function App() {
  const position = [51.505, -0.09];

  return (
    <div className="App flex min-h-screen flex-col items-center justify-between">
      <main className="flex min-h-screen flex-col items-center justify-between">
        <MapContainer
          center={[57.74, 11.94]}
          zoom={13}
          scrollWheelZoom={false}
          className="w-screen h-screen z-10"
          zoomSnap="0.25"
        >
          <Map />
        </MapContainer>
      </main>
    </div>
  );
}

export default App;
