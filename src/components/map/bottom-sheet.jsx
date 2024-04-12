import React, { useState } from "react";
import { app_steps } from "../../constants/enums/app-steps";
import { CustomButton, PrimaryButton } from "../shared/button";
import { service_type } from "../../constants/service-types";
import CountUp from "react-countup";
import TaxiInfo from "../taxi/taxi-info";

const BottomSheet = ({
  selectStartPoint,
  selectEndPoint,
  cancelRequest,
  appState,
  wayPoints,
  position,
  requestTaxi,
}) => {
  const [selectedService, setselectedService] = useState(service_type.eco);

  return (
    <div
      className="absolute bottom-0 w-full grid bg-white rounded-xl py-6"
      style={{ zIndex: "1000" }}
    >
      {appState === app_steps.rerquest_map ? (
        <React.Fragment>
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
                  onClick={cancelRequest}
                >
                  لغو
                </CustomButton>
                <PrimaryButton onClick={requestTaxi}>
                  درخواست خودرو
                </PrimaryButton>
              </div>
            </div>
          )}
        </React.Fragment>
      ) : appState === app_steps.on_the_way ? (
        <div className="px-6">
          <TaxiInfo />
          <CustomButton
            className="border-red-600 border-2 py-3 w-full"
            onClick={() => {
              cancelRequest();
            }}
          >
            لغو درخواست
          </CustomButton>
        </div>
      ) : null}
    </div>
  );
};

export default BottomSheet;
