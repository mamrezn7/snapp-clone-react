import React, { useCallback, useEffect, useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import Routing from "./routing";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { PrimaryButton, CustomButton } from "../shared/button";
import { service_type } from "../../constants/service-types";
import { app_steps } from "../../constants/enums/app-steps";
import Searching from "../searching";
import BottomSheet from "./bottom-sheet";

function Map() {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [wayPoints, setWayPoints] = useState([]);
  const [appState, setAppState] = useState(app_steps.rerquest_map);

  const onMove = useCallback(() => {
    setPosition(map.getCenter());
  }, [map]);

  useEffect(() => {
    map.on("dragend", onMove);
    return () => {
      map.off("dragend", onMove);
    };
  }, [map, onMove]);

  const selectStartPoint = () => {
    setWayPoints([...wayPoints, position]);
  };
  const selectEndPoint = () => {
    setWayPoints([...wayPoints, position]);
  };

  const submitRequest = () => {
    map.flyToBounds(wayPoints, { paddingBottomRight: [0, 300] });
  };
  const cancelRequest = () => {
    setWayPoints([]);
    map.zoomOut();
  };
  const requestTaxi = () => {
    setAppState(app_steps.searching);
  };

  useEffect(() => {
    if (wayPoints.length === 2) {
      submitRequest();
    } else return;
  }, [wayPoints]);

  return (
    <React.Fragment>
      {wayPoints.length < 2 && (
        <img
          src="/images/marker-icon.png"
          alt=""
          className="absolute left-1/2 top-1/2"
          style={{ zIndex: "1000" }}
        />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing wayPoints={wayPoints} />
      <BottomSheet
        selectStartPoint={selectStartPoint}
        selectEndPoint={selectEndPoint}
        cancelRequest={cancelRequest}
        appState={appState}
        setAppState={setAppState}
        wayPoints={wayPoints}
        position={position}
        requestTaxi={requestTaxi}
      />
      {appState === app_steps.searching && (
        <Searching onStepChange={setAppState} />
      )}
    </React.Fragment>
  );
}

export default Map;
