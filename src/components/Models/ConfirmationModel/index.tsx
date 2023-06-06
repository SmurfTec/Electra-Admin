import React from "react";
import { CustomDialog } from "../../../atoms/global.style";
import { CustomButton } from "../../../atoms";
export const Confirmationmodal = ({
  PopupHeader,
  classes,
  setVisible,
  visible,
  text,
  cnfrmbtnText,
  cnclebtnText,
}: any) => {
  return (
    <CustomDialog
      className={`${classes} bg-[#FFFFFF] w-[543px] h-[268px] flex  justify-center align-middle items-center `}
      visible={visible}
    >
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={() => setVisible(false)}
      ></i>
      <div className="dialog-header">
        <p className="text-center text-[20px] font-[700] text-black uppercase border-b border-custom pb-3 ">
          {PopupHeader}
        </p>
        <p className="text-[#212121] mt-5 mx-auto w-[85%] text-center font-semibold">
          {text}
        </p>
        <div className="flex mt-8 justify-center gap-4">
          <CustomButton
            txt={cnclebtnText}
            classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
          />
          <CustomButton
            txt={cnfrmbtnText}
            classes={`!w-[179px] !h-[50px] bg-[#212121] !rounded-[10px] !text-white !text-[16px]`}
          />
        </div>
      </div>
    </CustomDialog>
  );
};
