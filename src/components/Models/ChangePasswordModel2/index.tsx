import React, { useState } from "react";
import { CustomDialog } from "../../../atoms/global.style";
import { InputPassword } from "../../../atoms";
import { CustomButton } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { ResetPassword } from "../../../store/Slices/UserSlice";
export const ChangePasswordModel2 = ({
  classes,
  visible,
  setVisible,
  showSuccessModel = true,
  onClick,
  Code
}: any) => {
  const [currentPass, setcurrentPass] = useState("");
  const [newPass, setnewPass] = useState("");
  const [Success, setSuccess] = useState(false);
  const [err,setErr]=useState("")
  const ChangeUserPassword=async()=>{
    let body={
      "password" :currentPass,
      "confirmPassword" :newPass
    }
    console.log(Code,"CODE")
    
    let response=await ResetPassword(body,Code)
    if(!(response.status==404) || (!(response.status==401))){
      setSuccess(false)
      setErr("Unauthorized password was not chnaged")
    }else{
        console.log("ISSUE with changing password")
    }
  }
  return (
    <>
      <CustomDialog
        className={`${classes} bg-[#FFFFFF] w-[543px] h-[368px] flex  justify-center align-middle items-center `}
        visible={visible}
      >
        <i
          className="pi pi-times absolute right-4 top-4 cursor-pointer"
          onClick={() => setVisible(false)}
        ></i>
        <div className="dialog-header">
          <p className="text-center text-[20px] font-[700] text-black uppercase ">
            Changing Password
          </p>
        </div>
        <hr className="w-full border border-inputBorder" />
        <div className="dialogbody flex flex-col gap-4">
          <InputPassword
            inputClasses="!text-center !text-[#3C82D6] !text-[20px]"
            placeholder="Enter New Password"
            Title={currentPass}
            onChange={(e: any) => setcurrentPass(e.target.value)}
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <div className="flex flex-col gap-2">
            <InputPassword
              inputClasses="!text-center !text-[#3C82D6] !text-[20px]"
              placeholder="Confirm Password"
              Title={newPass}
              onChange={(e: any) => setnewPass(e.target.value)}
              MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
            />
            <p className="text-[12px] ml-[5.6rem] font-[500] text-[#656565]">
              Min password length 6 characters
            </p>
          </div>
          {err && <p className="text-red text-center">
            {err}
            </p>}
          <CustomButton
            onClick={() => {
             ChangeUserPassword();
            }}
            txt="UPDATE"
            classes="!w-[155px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]"
          />
        </div>
      </CustomDialog>
      <CustomDialog
        className={` bg-[#FFFFFF] w-[543px] h-[250px] flex  justify-center align-middle items-center `}
        visible={Success}
      >
        <i
          className="pi pi-times absolute right-4 top-4 cursor-pointer"
          onClick={() => setSuccess(false)}
        ></i>
        <div className="pt-[50px] flex justify-center items-center flex-col gap-4 w-full h-full">
          <img src={IMAGES.PassSuccess} />
          <div className="flex flex-col gap-1 justify-center text-center ">
            <p className="text-[19px] font-[800] text-black overflow-hidden">
              Password Changed Succesfully
            </p>
            <p className="text-[14px] font-[500] text-[#656565] overflow-hidden">
              Click on login to re-enter and continue
            </p>
            <CustomButton
              onClick={() => setSuccess(false)}
              txt="Login"
              classes="!w-[90px] !mt-[10px] !h-[40px] border !text-[13px] !text-black !bg-white !mx-auto !rounded-[10px]"
            />
          </div>
        </div>
      </CustomDialog>
    </>
  );
};
