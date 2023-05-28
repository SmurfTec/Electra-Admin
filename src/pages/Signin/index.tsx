import React, { useState } from "react";
import IMAGES from "../../assets/Images";
import { InputTxt, InputPassword, CustomButton } from "../../atoms";
import { Link, useNavigate } from "react-router-dom";
export const Signin = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const navigate = useNavigate();
  const Login = (event:any) => {
event.preventDefault();
    let user: any = {
      name: "sherry",
    };
    localStorage.setItem("user", JSON.stringify(user));
    navigate("/Dashboard");
  };
  return (
    <div className="min-h-[100vh] w-[100vw] flex flex-col items-center pt-[90px]">
      <div className="w-[116px] h-[116px] rounded-[50%] bg-lightgray flex justify-center align-middle items-center">
        <img src={IMAGES.Hand} alt="hand-img" className="w-[53px] h-[53px]" />
      </div>
      <h1 className="text-[36px] font-[700] mt-[10px] text-black">
        Hello There
      </h1>
      <p className="text-[16px] text-[#A4A4A4] w-[392px] font-[500] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis
        diam ante,
      </p>
      <InputTxt
        placeholder="Enter Email"
        MainClasses="mt-[40px]"
        img={IMAGES.Email}
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <InputPassword
        placeholder="Enter Password"
        MainClasses="mt-[15px]"
        img={IMAGES.password}
        value={Password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
       <div className="flex justify-end text-right  mt-[10px] w-[400px]">
       <p className=" cursor-pointer text-[14px] text-right font-[500] text-midgray">
      Forgot Password?
       
      </p>
       </div>
      <CustomButton txt="Login" classes="mt-[41px]" onClick={Login} />
     
      <div className="flex mt-[10px] items-center gap-5 text-gray">
        <hr className="w-[159px] border-[#A4A4A4]" /> or{" "}
        <hr className="w-[159px] border-[#A4A4A4]" />
      </div>
      <div className="flex gap-6 mt-[35px]">
        <div className="w-[81px] h-[81px] rounded-[10px] bg-lightgray flex justify-center items-center">
          <img src={IMAGES.Google} />
        </div>
        <div className="w-[81px] h-[81px] rounded-[10px] bg-lightgray flex justify-center items-center">
          <img src={IMAGES.Facebook} />
        </div>
        <div className="w-[81px] h-[81px] rounded-[10px] bg-lightgray flex justify-center items-center">
          <img src={IMAGES.Twitter} />
        </div>
        <div className="w-[81px] h-[81px] rounded-[10px] bg-lightgray flex justify-center items-center">
          <img src={IMAGES.Apple} />
        </div>
      </div>
      <p className="text-[22px] mt-[150px] text-center font-[500] text-midgray">
        Dont have an account?{" "}
        <Link className="text-blue font-[700]" to="/">
          Signup
        </Link>
      </p>
    </div>
  );
};
