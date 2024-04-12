import { MapContainer } from "react-leaflet";
import "./App.scss";
import "leaflet/dist/leaflet.css";

import Map from "./components/map/map";
import { createContext, useReducer, useState } from "react";
import { app_steps } from "./constants/enums/app-steps";
import Searching from "./components/searching";

function App() {
  // const initialState = {app_state:app_steps.rerquest_map};

  return (
    <div className="App flex min-h-screen flex-col items-center justify-between">
      <MapContainer
        center={[57.74, 11.94]}
        zoom={13}
        scrollWheelZoom={false}
        className="w-screen h-screen z-10"
        zoomSnap="0.25"
      >
        <Map />
      </MapContainer>
    </div>
  );
}

export default App;
