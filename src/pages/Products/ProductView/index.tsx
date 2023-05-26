import React from "react";
import IMAGES from "../../../assets/Images";
import { RoundedButton } from "../../../atoms";
export const ProductView = () => {
  return (
    <div>
      <div className="flex gap-4">
        <div>
          <img src={IMAGES.IphoneView} />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-[36px] font-extrabold">IPHONE 14 PRO MAX</p>
            <RoundedButton icon={IMAGES.Pen} classes={"bg-[#212121]"} />
            <RoundedButton icon={IMAGES.Bin} classes={"bg-[#FF0000]"} />
          </div>
          <div className="mt-3">
            <p className="bg-[#FCFCFC] text-center rounded-2xl w-[295px] h-[37px] flex items-center justify-center">View Technical Specifications</p>
          </div>
        </div>
      </div>
    </div>
  );
};
