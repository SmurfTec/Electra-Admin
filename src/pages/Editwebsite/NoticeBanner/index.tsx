import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components";
import { CustomButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { useGetNoticBanner } from "../../../custom-hooks";
type Banner = {
  id: number;
  title: string;
  color: string;
  background: string;
  created_on: string;
  updated_on: string;
};

type DataBanner = {
  results?: number;
  banners?: Banner[];
};
export const Noticebanner = () => {
  const navigate = useNavigate();
  const { data, bannerLoading }: DataBanner | any = useGetNoticBanner();
  useEffect(() => {
    if (!bannerLoading) {
      console.log(data);
    }
  }, []);
  return (
    <div>
      <Header typeSearch={true} placeholder="Search" UserBox={true} />
      <p className="font-bold my-3">Notice Banners</p>
      <div className="flex gap-3">
        <CustomButton
          classes={"!bg-[#3C82D6] !h-[42px] !w-[122px] !rounded-[9px]"}
          txt={"+ Add New"}
          onClick={() => {
            navigate("/Addbanner");
          }}
        />
        <CustomButton
          classes={
            "!bg-[#EFEFEF] !h-[42px] !w-[162px] !rounded-[9px] !text-[black]"
          }
          txt={"Hide All On Website"}
        />
      </div>
      <div className="mt-2 rounded">
        {!bannerLoading&&data.banners.map((item: Banner, index: number) => {
          return (
            <div
              key={index}
               onClick={()=>{
                navigate(`/EditNewBanner/${item.id}`)
               }}
              style={{
                backgroundColor:item.background
              }}
              className={`!bg-[${item.background}] my-2 h-[43px] w-[40%] flex items-center justify-between px-3 cursor-pointer`}
            >
              <p
              style={{
                color:item.color
              }}
              className={`text-[${item.color}]`}>
               {item.title}
              </p>
              <div className="flex gap-3">
                <img src={IMAGES.Editwhite} />
                <img src={IMAGES.Redbin} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
