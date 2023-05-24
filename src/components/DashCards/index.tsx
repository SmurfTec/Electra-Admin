import React from "react";
import IMAGES from "../../assets/Images";
export const DashCard = (props:any) => {
  return (
    <div className="w-96 h-[136px] bg-[#FCFCFC]">
      <div className="flex justify-between px-2">
        <div className="px-2  pt-1">
          <p>{props.title}</p>
          <h1 className="text-4xl font-bold">{props.totalNumber}</h1>
          <div className={` ${props.textDash}  w-[67px] flex justify-center rounded mt-2 p-1`}>
            <img className="mr-1" src={props.arrowImg} />{" "}
            <p className={`text-[${props.textColor}] font-bold`}> + 4 %</p>
          </div>
        </div>

        <div className={`${props.imgColor}  h-[30px] w-[30px] rounded flex justify-center mt-2`}>
          <img className="p-1" src={props.myImg} />
        </div>
      </div>
    </div>
  );
};
