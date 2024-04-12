import React, { useCallback, useEffect, useState } from "react";
import Routing from "./routing";
import { TileLayer, useMap } from "react-leaflet";
import { app_steps } from "../../constants/enums/app-steps";
import Searching from "../searching";
import BottomSheet from "./bottom-sheet";

function Map() {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [wayPoints, setWayPoints] = useState([]);
  const [appState, setAppState] = useState(app_steps.rerquest_map);
  const [distance, setDistance] = useState(0);

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
    setAppState(app_steps.rerquest_map);
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
          src="/snapp-clone-react/images/marker-icon.png"
          alt=""
          className="absolute left-1/2 top-1/2"
          style={{ zIndex: "1000" }}
        />
      )}
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Routing wayPoints={wayPoints} setDistance={setDistance} />
      <BottomSheet
        selectStartPoint={selectStartPoint}
        selectEndPoint={selectEndPoint}
        cancelRequest={cancelRequest}
        appState={appState}
        setAppState={setAppState}
        wayPoints={wayPoints}
        position={position}
        requestTaxi={requestTaxi}
        distance={distance}
      />
      {appState === app_steps.searching && (
        <Searching onStepChange={setAppState} />
      )}
    </React.Fragment>
  );
}

export default Map;
