import React, { useEffect, useState } from "react";
import { app_steps } from "../../constants/enums/app-steps";
import { CustomButton, PrimaryButton } from "../shared/button";
import { service_type } from "../../constants/service-types";
import CountUp from "react-countup";
import TaxiInfo from "../taxi/taxi-info";
import { formatterService } from "../../services/formatter";

const BottomSheet = ({
  selectStartPoint,
  selectEndPoint,
  cancelRequest,
  appState,
  wayPoints,
  position,
  requestTaxi,
  distance,
}) => {
  const [selectedService, setselectedService] = useState(service_type.eco);
  const [snappCost, setSnappCost] = useState(0);
  const [ecoPlusCost, setEcoPlusCost] = useState(0);

  useEffect(() => {
    setSnappCost(Math.floor(distance / 1000) * 9500 + 20000);
    setEcoPlusCost(
      Math.floor((Math.floor(distance / 1000) * 9500 + 20000) * 1.25)
    );
  }, [distance]);

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
                    end={snappCost}
                    duration={3}
                    formattingFn={formatterService.formatWithSeparator}
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
                    end={ecoPlusCost}
                    duration={3}
                    formattingFn={formatterService.formatWithSeparator}
                    className="text-3xl text-stone-800"
                  />{" "}
                  تومان
                </span>
              </div>
              <div className="flex flex-row gap-3 px-6">
                <CustomButton
                  className="bg-rose-600 py-3 px-6 hover:bg-red-700 text-white"
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
          <TaxiInfo
            selectedService={selectedService}
            serviceCost={
              selectedService === service_type.eco ? snappCost : ecoPlusCost
            }
          />
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
