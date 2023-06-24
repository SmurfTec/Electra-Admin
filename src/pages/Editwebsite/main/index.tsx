import { useEffect, useState } from "react";
import { CustomButton } from "../../../atoms";
import { Header } from "../../../components";
import IMAGES from "../../../assets/Images";
import { useNavigate } from "react-router-dom";
import { useGetWebsite } from "../../../custom-hooks/WebsiteHook";

export const Editwebsite = () => {
  const navigate = useNavigate();
    
  const getWebsite = useGetWebsite();
  const [web,setweb]=useState<any>([])
  useEffect(() => {
    console.log(getWebsite);
    setweb(getWebsite)
  }, [getWebsite]);
  return (
    <div>
      <Header typeSearch={true} placeholder="Search Page" UserBox={true} />
      <div>
        <p className="font-bold text-[19px]">Pages</p>
        <div className="flex p-2 mt-3 gap-6">
          {web?.websites &&
            web?.websites?.map((item: any, index: any) => {
              return (
                <CustomButton
                key={index}
                  onClick={() => {
                    navigate(`/Webandbanner/${item.id}`);
                  }}
                  txt={item.name}
                  classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
                  editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
                />
              );
            })}{" "}
         
        </div>
   
      </div>
    </div>
  );
};
