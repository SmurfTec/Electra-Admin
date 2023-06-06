import { Header } from "../../../components";
import { InputTxt,CustomButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
export const Addnewbanner = () => {
  return (
    <div>
      <Header typeSearch={true} placeholder="Search" UserBox={true} />
      <div>
        <p className="font-bold text-[20px] ml-3">Adding New Notice Banner</p>
        <div className="border w-[35%] p-[14px] rounded-[4px] ml-3 my-3 text-[16px] font-medium">
          Due to maintenance website will be down for 1 day
        </div>
        <p className="ml-3 text-[#212121] mt-3 font-medium">
          Choose Text Color
        </p>
        <div className="flex ml-3 mt-3">
          <div className="bg-[#3C82D6] h-[34px] w-[34px]"></div>
          <div className="bg-[#000000] h-[34px] w-[34px]"></div>
          <div className="bg-[#212121] h-[34px] w-[34px]"></div>
          <div className="bg-[#FF0000] h-[34px] w-[34px]"></div>{" "}
          <div className="bg-[#E4E4E4] h-[34px] w-[34px]"></div>
          <div className="bg-[#EFEFEF] h-[34px] w-[34px]"></div>
          <div className="bg-[#3C82D6] h-[34px] w-[34px] flex  items-center justify-center">
            <img className=""  src={IMAGES.Paint}/>
          </div>

          <InputTxt
            placeholder={"# Hex code"}
            MainClasses={" h-[34px] w-[150px] ml-3 rounded-[2px]"}
          />
        </div>
        <p className="ml-3 text-[#212121] mt-3 font-medium">
          Choose Background Color
        </p>
        <div className="flex ml-3 mt-3">
          <div className="bg-[#3C82D6] h-[34px] w-[34px]"></div>
          <div className="bg-[#000000] h-[34px] w-[34px]"></div>
          <div className="bg-[#212121] h-[34px] w-[34px]"></div>
          <div className="bg-[#FF0000] h-[34px] w-[34px]"></div>{" "}
          <div className="bg-[#E4E4E4] h-[34px] w-[34px]"></div>
          <div className="bg-[#EFEFEF] h-[34px] w-[34px]"></div>
          <div className="bg-[#3C82D6] h-[34px] w-[34px] flex  items-center justify-center">
            <img className=""  src={IMAGES.Paint}/>
          </div>
          <InputTxt
            placeholder={"# Hex code"}
            MainClasses={" h-[34px] w-[150px] ml-3 rounded-[2px]"}
          />
        </div>
        <p className="mt-3 ml-3">Preview</p>
        <div className="bg-[black] h-[43px] w-[40%] flex items-center justify-between px-3 cursor-pointer mt-3 ml-3">
          <p className="text-[white] w-full text-center">
            Due to maintenance website will be down for 1 day
          </p>
        </div>
        <div className="flex gap-3 mt-7 ml-3">
          <CustomButton
            txt={"Cancel"}
            classes={
              "!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[10px]"
            }
          />
          <CustomButton
           
            txt={"Update"}
            classes={" !w-[179px] !rounded-[10px] !h-[50px]"}
          />
        </div>
      </div>
    </div>
  );
};
