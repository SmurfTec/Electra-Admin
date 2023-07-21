import { useState } from "react";
import { Header } from "../../../components";
import { InputTxt, CustomButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { HexColorPicker } from "react-colorful";
import { createNoticeBanner } from "../../../store/Slices/WebsiteSlice";
import { useNavigate } from "react-router-dom";
export const Addnewbanner = () => {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    color: "",
    background: "",
    is_active:true
  });
  const [error, setError] = useState("");
  const [color, setColor] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState(false);
  const handleChange = (name: any, value?: any) => {
    setData({
      ...data,
      [name]: value,
    });
  };
  const addNoticeBanner = async () => {
    try {
      if (data.title === "" || data.color === "" || data.background === "") {
        setError("Fill title,color and background");
      } else {
        const add = await createNoticeBanner(data);
        console.log(add, "ADDD");
        if (add) {
          navigate("/Noticebanner");
        }
      }
    } catch (e) {}
  };

  return (
    <div>
      <Header typeSearch={true} placeholder="Search" UserBox={true} />
      <div>
        <p className="font-bold text-[20px] ml-3">Adding New Notice Banner</p>
        {/* <div className="">
          Due to maintenance website will be down for 1 day
        </div> */}
        <InputTxt
          onChange={(e: any) => handleChange("title", e.target.value)}
          placeholder={"Enter Title"}
          MainClasses={
            "!border !h-[20px] !bg-white !w-[55%] !p-[14px] !rounded-[4px] !ml-3 !my-3 !text-[16px] !font-medium"
          }
        />
        <p className="ml-3 text-[#212121] mt-3 font-medium">
          Choose Text Color
        </p>
        <div className="flex ml-3 mt-3">
          <div
            onClick={() => {
              handleChange("color", "#3C82D6");
            }}
            className="bg-[#3C82D6] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("color", "#000000");
            }}
            className="bg-[#000000] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("color", "#212121");
            }}
            className="bg-[#212121] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("color", "#FF0000");
            }}
            className="bg-[#FF0000] h-[34px] w-[34px]"
          ></div>{" "}
          <div
            onClick={() => {
              handleChange("color", "#E4E4E4");
            }}
            className="bg-[#E4E4E4] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("color", "#EFEFEF");
            }}
            className="bg-[#EFEFEF] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              setColor(!color);
            }}
            className="bg-[#3C82D6] h-[34px] w-[34px] flex  items-center justify-center"
          >
            <img className="" src={IMAGES.Paint} />
          </div>
          {color && (
            <HexColorPicker
              color={data.color}
              onChange={(e: any) => handleChange("color", e)}
            />
          )}
          <InputTxt
            value={data.color}
            placeholder={"# Hex code"}
            MainClasses={" h-[34px] w-[150px] ml-3 rounded-[2px]"}
            onChange={(e: any) => handleChange("color", e.target.value)}
          />
        </div>
        <p className="ml-3 text-[#212121] mt-3 font-medium">
          Choose Background Color
        </p>
        <div className="flex ml-3 mt-3">
          <div
            onClick={() => {
              handleChange("background", "#3C82D6");
            }}
            className="bg-[#3C82D6] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("background", "#000000");
            }}
            className="bg-[#000000] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("background", "#212121");
            }}
            className="bg-[#212121] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("background", "#FF0000");
            }}
            className="bg-[#FF0000] h-[34px] w-[34px]"
          ></div>{" "}
          <div
            onClick={() => {
              handleChange("background", "#E4E4E4");
            }}
            className="bg-[#E4E4E4] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              handleChange("background", "#EFEFEF");
            }}
            className="bg-[#EFEFEF] h-[34px] w-[34px]"
          ></div>
          <div
            onClick={() => {
              setBackgroundColor(!backgroundColor);
            }}
            className="bg-[#3C82D6] h-[34px] w-[34px] flex  items-center justify-center"
          >
            <img className="" src={IMAGES.Paint} />
          </div>
          {backgroundColor && (
            <HexColorPicker
              color={data.background}
              onChange={(e: any) => handleChange("background", e)}
            />
          )}
          <InputTxt
            value={data.background}
            placeholder={"# Hex code"}
            MainClasses={" h-[34px] w-[150px] ml-3 rounded-[2px]"}
            onChange={(e: any) => handleChange("background", e.target.value)}
          />
        </div>
        <p className="mt-3 ml-3">Preview</p>
        <div
        style={{
          backgroundColor:data.background?data.background:"white"
        }}
        className=" h-[43px] w-[40%] flex items-center justify-between px-3 cursor-pointer mt-3 ml-3">
          <p 
          style={{
            color:data.color?data.color:"black",
           
          }}
          className="text-[white] w-full text-center">
          {data.title?data.title:""}
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
            onClick={addNoticeBanner}
            txt={"Add"}
            classes={" !w-[179px] !rounded-[10px] !h-[50px]"}
          />
        </div>
      </div>
      {error && (
        <p className="text-[red] ml-10 mt-10 text-[15px]">
          Data not filled properly
        </p>
      )}
    </div>
  );
};
