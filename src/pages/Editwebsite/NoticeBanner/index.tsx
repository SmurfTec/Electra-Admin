import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { CustomButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
export const Noticebanner = () => {
    const navigate=useNavigate()
  return (
    <div>
      <Header typeSearch={true} placeholder="Search" UserBox={true} />
      <p className="font-bold my-3">Notice Banners</p>
      <div className="flex gap-3">
        <CustomButton
          classes={"!bg-[#3C82D6] !h-[42px] !w-[122px] !rounded-[9px]"}
          txt={"+ Add New"}
        />
        <CustomButton
          classes={
            "!bg-[#EFEFEF] !h-[42px] !w-[162px] !rounded-[9px] !text-[black]"
          }
          txt={"Hide All On Website"}
        />
      </div>
      <div className="mt-2 rounded">
        <div
        onClick={()=>{
            navigate("/Addbanner")
        }}
        className="bg-[black] h-[43px] w-[40%] flex items-center justify-between px-3 cursor-pointer">
            <p className="text-white">
            Due to maintenance website will be down for 1 day
            </p>
            <div className="flex gap-3">
                <img src={IMAGES.Editwhite}/>
                <img src={IMAGES.Redbin}/>
            </div>
        </div>
        <div className="bg-[#3A6394] h-[43px] mt-3 w-[40%] flex items-center justify-between px-3">
            <p className="text-white">
            Eid coupon is out now use the coupon to get discount.
            </p>
            <div className="flex gap-3">
                <img src={IMAGES.Editwhite}/>
                <img src={IMAGES.Redbin}/>
            </div>
        </div>
      </div>
    </div>
  );
};
