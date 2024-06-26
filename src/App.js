import { MapContainer } from "react-leaflet";
import "./App.scss";
import "leaflet/dist/leaflet.css";

import Map from "./components/map/map";
function App() {
  return (
    <div className="App flex min-h-screen flex-col items-center justify-between">
      <MapContainer
        center={[57.74, 11.94]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-dvh z-10"
        zoomSnap="0.25"
      >
        <Map />
      </MapContainer>
    </div>
  );
}

export default App;
