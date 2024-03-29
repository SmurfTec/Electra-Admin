import { CustomDialog } from "../../../atoms/global.style";
import { CustomButton } from "../../../atoms";
import { useState, useEffect } from "react";
export const Confirmationmodal = ({
  PopupHeader,
  classes,
  setVisible,
  visible,
  text,
  cnfrmbtnText,
  cnfrmbtnStyle,
  cnclebtnText,
  addValue,
  Feemodif,
  placeholderclasses,
  handleFunction,
  setOkButton,
  setCancelButton,
  Value = "",
  setValue,
  value,
  placeholderValue,
}: any) => {
  // insert here
  const [error, setError] = useState("");

  return (
    <CustomDialog
      className={`${classes} bg-[#FFFFFF] w-[546px] h-[268px] flex  justify-center align-middle items-center overflow-hidden `}
      visible={visible}
    >
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={() => {
          setError("");
          setVisible(false);
        }}
      ></i>
      <div className="dialog-header">
        <p className="text-center text-[20px] font-[700] text-black uppercase border-b border-custom pb-3 ">
          {PopupHeader}
        </p>
        {!addValue ? (
          <p className="text-[#212121] mt-5 mx-auto w-[85%] text-center font-semibold">
            {text}
          </p>
        ) : (
          <>
            <div className="flex justify-between items-center px-2 border w-[370px] h-[54px] mx-auto mt-8 rounded-[10px]">
              <input
                placeholder="Enter color"
                value={Value}
                onChange={(e) =>{
                  console.log(e.target.value)
                  setValue(e.target.value)}}
                className="px-2 focus:outline-none"
              />
              <div className="bg-[#A4A4A4] flex justify-center items-center text-[white] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
                i
              </div>
            </div>
          </>
        )}
        {Feemodif && (
          <>
            <div className="flex justify-between items-center mt-3 px-2 border w-[200px] h-[54px] mx-auto rounded-[10px]">
              <input
                onChange={(e) => {
                  setError("");
                  setValue(e.target.value);
                }}
                placeholder={placeholderValue}
                className={`px-2 focus:outline-none ${placeholderclasses} `}
              />
              <div className=" flex justify-center items-center text-[black] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
                %
              </div>
            </div>
            {error && (
              <p className="text-red  text-center w-full mx-auto mt-1 text-[12px]">
                {error}
              </p>
            )}
          </>
        )}
        <div className="flex mt-8 justify-center gap-4">
          <CustomButton
            txt={cnclebtnText}
            classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
            onClick={(e: any) => {
              if (setCancelButton) {
                setCancelButton(e);
              } else {
                setError("");
                setVisible(false);
              }
            }}
          />
          <CustomButton
            onClick={() => {
              if (handleFunction) {
                console.log(value);
                if (!value) {
                  console.log("eeewfjbj");
                  setError("Enter a value for fee modifier");
                }
                 if(Value){
                  setError("");
                  handleFunction(Value);
                }
                else {
                  setError("");
                  handleFunction(value);
                }
              }
              if (setOkButton) {
                setOkButton();
              }
            }}
            txt={cnfrmbtnText}
            classes={`!w-[179px] !h-[50px] bg-[#212121] !rounded-[10px] !text-white !text-[16px] ${cnfrmbtnStyle}`}
          />
        </div>
      </div>
    </CustomDialog>
  );
};
