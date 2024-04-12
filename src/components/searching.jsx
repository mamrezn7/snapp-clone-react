import React from "react";
import { CustomButton, PrimaryButton } from "./shared/button";
import CountUp from "react-countup";
import { app_steps } from "../constants/enums/app-steps";

const Searching = ({ onStepChange }) => {
  return (
    <div
      className="h-dvh w-screen flex flex-col bg-white absolute"
      style={{ zIndex: "2000" }}
    >
      <div className="flex flex-col flex-1 justify-center items-center">
        {" "}
        در حال جستجوی سفیر...
        <div>
          درخواست شما به <CountUp end={24} duration={360} /> سفیر ارسال شد.
        </div>
      </div>
      <div className="flex flex-row gap-3 p-6">
        <CustomButton
          className="bg-rose-600 py-3 px-6 hover:bg-red-700 text-white"
          onClick={() => {
            onStepChange(app_steps.rerquest_map);
          }}
        >
          لغو
        </CustomButton>
        <PrimaryButton
          onClick={() => {
            onStepChange(app_steps.on_the_way);
          }}
        >
          عجله دارم!
        </PrimaryButton>
      </div>
    </div>
  );
};

export default Searching;
