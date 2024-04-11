import React, { useCallback, useEffect, useState } from "react";
import "../../../node_modules/leaflet/dist/leaflet";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine";
import Routing from "./routing";
import { MapContainer, Marker, Popup, TileLayer, useMap } from "react-leaflet";
import "../../../node_modules/leaflet/dist/leaflet.css";
import "../../../node_modules/leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { PrimaryButton, CustomButton } from "../shared/button";
import CountUp from "react-countup";
import { service_type } from "../../constants/service-types";

function Map() {
  const map = useMap();
  const [position, setPosition] = useState(() => map.getCenter());
  const [wayPoints, setWayPoints] = useState([]);
  const [selectedService, setselectedService] = useState(service_type.eco);

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
    // map.flyToBounds(wayPoints, { padding: [0, 300] });
    map.flyToBounds(wayPoints, { paddingBottomRight: [0, 300] });
  };
  const cancelRequest = () => {
    setWayPoints([]);
    map.zoomOut();
  };

  useEffect(() => {
    // wayPoints.length === 2 ? submitRequest() : null;
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
      <div
        className="absolute bottom-0 w-full grid bg-white rounded-xl py-6"
        style={{ zIndex: "1000" }}
      >
        {wayPoints.length === 0 ? (
          <div className="px-6">
            <PrimaryButton onClick={() => selectStartPoint(position)}>
              انتخاب مبدا
            </PrimaryButton>
          </div>
        ) : wayPoints.length === 1 ? (
          <div className="px-6">
            <PrimaryButton onClick={() => selectEndPoint(position)}>
              انتخاب مقصد
            </PrimaryButton>
          </div>
        ) : (
          <div>
            <div
              className={`text-stone-600 font-bold text-base flex flex-row justify-between py-4 px-6 align-middle ${
                selectedService === service_type.eco
                  ? "bg-slate-200"
                  : "bg-white"
              }`}
              onClick={() => setselectedService(service_type.eco)}
            >
              <div>
                <span>اسنپ</span>
              </div>
              <span>
                <CountUp
                  end={10000}
                  duration={3}
                  className="text-3xl text-stone-800"
                />{" "}
                تومان
              </span>
            </div>
            <div
              className={`text-stone-600 font-bold text-base flex flex-row justify-between py-4 px-6 align-middle my-2 ${
                selectedService === service_type.eco_plus
                  ? "bg-slate-200"
                  : "bg-white"
              }`}
              onClick={() => setselectedService(service_type.eco_plus)}
            >
              <div>
                <span>اسنپ</span>
                <br />
                <span className="text-stone-400">اکو پلاس</span>
              </div>
              <span>
                <CountUp
                  end={20000}
                  duration={3}
                  className="text-3xl text-stone-800"
                />{" "}
                تومان
              </span>
            </div>
            <div className="flex flex-row gap-3 px-6">
              <CustomButton
                className="bg-rose-600 py-3 px-6 hover:bg-red-700"
                onClick={() => cancelRequest()}
              >
                لغو
              </CustomButton>
              <PrimaryButton onClick={() => submitRequest()}>
                درخواست خودرو
              </PrimaryButton>
            </div>
          </div>
        )}
      </div>
    </React.Fragment>
  );
}

export default Map;
