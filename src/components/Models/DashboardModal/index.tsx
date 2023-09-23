import React from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import { CustomButton, CustomCalendar } from '../../../atoms';
export const DashboardModal = ({
  PopupHeader,
  classes,
  setVisible,
  visible,
  text,
  cnfrmbtnText,
  cnclebtnText,
  addValue,
  Feemodif,
  placeholderclasses,
}: any) => {
  const [values, setValues] = React.useState({
    date: '',
    To: '',
  });
  return (
    <CustomDialog
      className={`${classes} bg-[#FFFFFF] w-[543px] h-[248px] flex  justify-center align-middle items-center overflow-hidden `}
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
        <div className="flex justify-center gap-3 items-center  h-20">
          <CustomCalendar
            value={values.date}
            setDate={(e: any) => setValues({ ...values, date: e.value })}
            classes="!w-[204px] !h-[54px]  !rounded-[10px] !bg-[#FFFFFF]  !placeholder-[#00000]"
            placeholder="From"
            MainClasses="!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]"
          />
          <CustomCalendar
            value={values.date}
            setDate={(e: any) => setValues({ ...values, date: e.value })}
            classes="!w-[204px] !h-[54px]  !rounded-[10px] !bg-[#FFFFFF]"
            placeholder="To"
            MainClasses="!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]"
          />
        </div>
        <div className="flex mt-5 justify-center gap-4">
          {/* <CustomButton
          txt={cnclebtnText}
          classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
        /> */}
          <CustomButton
            txt={cnfrmbtnText}
            classes={`!w-[179px] !h-[50px] bg-[#212121] !rounded-[10px] !text-white !text-[16px]`}
          />
        </div>
      </div>
    </CustomDialog>
  );
};
