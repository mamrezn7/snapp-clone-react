import React, { useEffect } from "react";
import { BiMessage } from "react-icons/bi";
import { IoCall } from "react-icons/io5";
import { useMap } from "react-leaflet";
import { service_type } from "../../constants/service-types";
import { formatterService } from "../../services/formatter";

const TaxiInfo = ({ selectedService, serviceCost }) => {
  const map = useMap();

  useEffect(() => {
    map.zoomOut();
  }, []);

  return (
    <div className="flex flex-col">
      <span className="text-xs"> سفیر در مسیر آمدن به سمت شما میباشد.</span>
      <span className="text-sm">پراید سفید</span>
      <div className="flex flex-row justify-around items-center pb-6">
        <img
          src="/snapp-clone-react/images/shirazi.jpg"
          alt=""
          className="rounded-full w-16"
        />
        <div className="flex flex-col gap-2">
          <span className="text-base text-gray-800">
            محمدرضا حاجی امین شیرازی
          </span>
          <div className="flex flex-row gap-1">
            <a
              className="flex justify-center items-center px-2 h-10 rounded-full bg-gray-300 text-black"
              href="mailto:mrz_shirazi@yahoo.com"
            >
              <BiMessage />
              <span className="px-2 text-black">ارسال پیام به سفیر</span>
            </a>
            <a
              className="flex justify-center items-center w-10 h-10 rounded-full bg-gray-300"
              href="tel:+989128704719"
            >
              <IoCall />
            </a>
          </div>
        </div>
      </div>
      <div className="flex justify-between text-lg mb-2 ">
        <div>
          هزیه سفر: {formatterService.formatWithSeparator(serviceCost)} تومان
        </div>
        <div className="text-primary font-bold italic">
          {selectedService === service_type.eco ? "اسنپ! " : "اسنپ! اکو پلاس "}
        </div>
      </div>
    </div>
  );
};

export default TaxiInfo;
