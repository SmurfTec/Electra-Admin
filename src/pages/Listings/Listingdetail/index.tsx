import React from "react"
import { Header } from "../../../components";
import { RoundedButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
export const Listingdetail = () => {
  const [select,setSelect]=React.useState(0)
  return (
    <div>
      <Header title="Viewing List item Detail" UserBox={true} />
      <div>
        <div className="flex">
          <div className="flex gap-5 ">
            <img src={IMAGES.IphoneView} />
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-[36px] font-extrabold">IPHONE 14 PRO MAX</p>

                <RoundedButton icon={IMAGES.Bin} classes={"bg-[#FF0000]"} />
              </div>
              <div className="flex mt-3">
                <p 
                onClick={()=>{
                  setSelect(0)
                }}
                className={`${select===0?"bg-black text-white ":"bg-white text-black "} cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}>
                  Used
                </p>
                <p 
                 onClick={()=>{
                  setSelect(1)
                }}
                 className={`${select===1?"bg-black text-white ":"bg-white text-black "} cursor-pointer text-center rounded-2xl w-[255px] h-[37px] flex items-center justify-center`}>
                  View Technical Specifications
                </p>
                <p 
                 onClick={()=>{
                  setSelect(2)
                }}
                 className={`${select===2?"bg-black text-white ":"bg-white text-black "} cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}>
                  Detail from seller
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
