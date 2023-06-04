import { CustomButton } from "../../../atoms";
import { Header } from "../../../components";
import IMAGES from "../../../assets/Images";
import { useNavigate } from "react-router-dom";
export const Editwebsite = () => {
  const navigate=useNavigate()
  return (
    <div>
      <Header typeSearch={true} placeholder="Search Page" UserBox={true} />
      <div>
        <p className="font-bold text-[19px]">Pages</p>
        <div className="flex p-2 mt-3 gap-6">
          <CustomButton
          onClick={()=>{
            navigate("/Webandbanner")
          }}
            txt="home"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="Phones"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="Laptops"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="Consoles"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />
        </div>
        <div className="flex p-2 mt-3 gap-6">
          <CustomButton
            txt="Monitors"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="Accessories"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="RAMS"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />{" "}
          <CustomButton
            txt="Notice Banner"
            classes="!justify-between !max-w-[270px] !px-[14px] !h-[42px] !rounded-[7px] !bg-[#FCFCFC] !text-black !font-[600]"
            editIcon={<img src={IMAGES.Edit} className="ml-[5px]" />}
          />
        </div>
      </div>
    </div>
  );
};
