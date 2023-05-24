import React from "react";
import IMAGES from "../../assets/Images";
export const StaticCard = () => {
  return (
    <div className="bg-[#FCFCFC] h-[182px] w-[402px] rounded px-2">
      <h1 className="font-bold mt-3 ml-3 text-[20px]">Last Month Statistic</h1>
      <div className="flex mt-3">
        <div className=" w-[50%] h-[100px]">
          <div className="flex justify-around">
            <img className=" self-start mt-2" src={IMAGES.bluehamburger} />
            <div>
              <p className="font-semibold">Total Listings</p>
              <p className="text-[28px] font-bold">690</p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <img src={IMAGES.uparrow} />
            <p className="text-[12px] text-[#3C82D6]">
            +4 % more then previous month
            </p>
          </div>
        </div>
        <div className=" w-[50%] h-[100px]">
          <div className="flex justify-around">
            <img className=" self-start mt-2" src={IMAGES.bluebox} />
            <div>
              <p className="font-semibold">Products Sold</p>
              <p className="text-[28px] font-bold">600</p>
            </div>
          </div>
          <div className="flex justify-center mt-5">
            <img src={IMAGES.downarrow} />
            <p className="text-[12px] text-[#FF0000]">
            -4 % more then previous month
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
