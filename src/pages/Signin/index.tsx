import React, { useEffect, useState } from "react";
import IMAGES from "../../assets/Images";
import { InputTxt, InputPassword, CustomButton } from "../../atoms";
import { Link, useNavigate } from "react-router-dom";
import { EmailVerificationModel, ChangePasswordModel2,EmailSendModal } from "../../components";
import { VerifyUserCode } from "../../store/Slices/UserSlice";
import { useDispatch } from "react-redux";
import { Login } from "../../store/Slices/AuthSlice";
import useCookies from "react-cookie/cjs/useCookies";
type LoginData = {
  email: string;
  password: string;
};
export const Signin = () => {

  const dispatch = useDispatch();
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [EmailErr, setEmailErr] = useState(false);
  const [EmailSent, setEmailSent] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [EmailModel, setEmailModel] = useState(false);
  const [PassModel, setPassModel] = useState(false);
  const[Code,setCode]=useState("")

  const navigate = useNavigate();
  const Login1 =async (event: any) => {
    const data:LoginData={
      email:Email,
      password:Password
    }
  
    if (Email.length == 0 || Password.length == 0) {
      if (Email.length == 0) {
        setEmailErr(true);
      }
      if (Password.length == 0) {
        setPasswordErr(true);
      }
    } 
   
    else {

      const loginCall = await dispatch(Login(data) as any);
     
    
       if(loginCall.payload?.response?.data?.status===401){
        console.log("HEREE")
       
          setEmailErr(true);
        
          setPasswordErr(true);
        
      }
       else if(loginCall?.payload?.user){
        localStorage.setItem("Route", "/Dashboard");
      localStorage.setItem("user", JSON.stringify(loginCall?.payload.user));
        navigate("/Dashboard");
      }
    }
  };
  useEffect(() => {
    localStorage.removeItem("user");
  }, []); 
  const VerifyCode = async (code: any, txt: any) => {
    let r = await VerifyUserCode(code)
    console.log(r,"r")
  }
  return (
    <div className="min-h-[100vh] w-[100vw] flex flex-col items-center pt-[90px]">
      <EmailSendModal visible={EmailSent} setVisible={setEmailSent}setEmailModel={setEmailModel}/>
      <EmailVerificationModel Code={Code}setCode={setCode} visible={EmailModel} setVisible={setEmailModel} setVisible2={setPassModel} />
      <ChangePasswordModel2 Code={Code} visible={PassModel} setVisible={setPassModel} />
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
        iconLeft={true}
        LeftIcon={IMAGES.Email}
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      {/* {EmailErr && (
        <div className="flex flex-col justify-start  w-full max-w-[390px] mt-[10px]">
          <div className="flex gap-2 justify-start text-left items-center">
            <div className="w-[15px] h-[15px] text-white bg-red rounded-[50%] flex justify-center items-center text-[10px]">
              i
            </div>
            <p className="text-[14px] text-[#FF0000] font-[400]">
              The e-mail you’ve entered is incorrect!
            </p>
          </div>
          <p className="text-[14px] text-[#B4B4B4] font-[400] mt-[6px]">
            Forgot email?{" "}
            <span
              className="text-[#06448C] cursor-pointer"
              onClick={() => setEmailModel(true)}
            >
              Click Here
            </span>{" "}
            to reset it.
          </p>
        </div>
      )} */}
      <InputPassword
        placeholder="Enter Password"
        MainClasses="mt-[15px]"
        img={IMAGES.password}
        value={Password}
        onChange={(e: any) => setPassword(e.target.value)}
      />
      {PasswordErr && (
        <div className="flex flex-col justify-start  w-full max-w-[390px] mt-[10px]">
          <div className="flex gap-2 justify-start text-left items-center">
            <div className="w-[15px] h-[15px] text-white bg-red rounded-[50%] flex justify-center items-center text-[10px]">
              i
            </div>
            <p className="text-[14px] text-[#FF0000] font-[400]">
              The password you’ve entered is incorrect!
            </p>
          </div>
          <p className="text-[14px] text-[#B4B4B4] font-[400] mt-[6px]">
            Forgot Password?{" "}
            <span
              onClick={() => setEmailSent(true)}
              className="text-[#06448C] cursor-pointer "
            >
              Click Here
            </span>{" "}
            to reset it.
          </p>
        </div>
      )}
  {!PasswordErr || EmailErr &&   <div className="flex justify-end text-right  mt-[10px] w-[400px]">
        <p 
              onClick={() => setEmailSent(true)}
        
        className=" cursor-pointer text-[14px] text-right font-[500] text-midgray">
          Forgot Password?
        </p>
      </div>}
      <CustomButton txt="Login" classes="mt-[41px]" onClick={Login1} />
{/* 
      <div className="flex mt-[10px] items-center gap-5 text-gray">
        <hr className="w-[159px] border-[#A4A4A4]" /> or{" "}
        <hr className="w-[159px] border-[#A4A4A4]" />
      </div> */}
      {/* <div className="flex gap-6 mt-[35px]">
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
      </div> */}
      {/* <p className="text-[22px] mt-[150px] text-center font-[500] text-midgray">
        Dont have an account?{" "}
        <Link className="text-blue font-[700]" to="/">
          Signup
        </Link>
      </p> */}
    </div>
  );
};
