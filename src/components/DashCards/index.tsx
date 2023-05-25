import React from "react";
import IMAGES from "../../assets/Images";
export const DashCard = (props:any) => {
  return (
    <div className={`${props.outerclasses} w-[300px] h-[136px] bg-[#FCFCFC] rounded-[8px]  `}>
      <div className="flex justify-between pt-[16px] px-[16px] pb-[12px]">
        <div className="px-2  pt-1">
          <p className="text-[13px] font-[600]">{props.title}</p>
          <h1 className="text-[28px] font-[700] mt-[2px]">{props.totalNumber}</h1>
          <div className={` ${props.textDash}  w-[67px] flex justify-center rounded mt-[16px] p-1`}>
            <img className="mr-1" src={props.arrowImg} />{" "}
            <p className={`text-[${props.textColor}] font-bold text-[12px]`}> + 4 %</p>
          </div>
        </div>

        <div className={`${props.imgColor}  h-[30px] w-[30px] rounded flex justify-center mt-2`}>
          <img className="p-2" src={props.myImg}  />
        </div>
      </div>
    </div>
  );
};
