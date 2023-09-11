import React from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import IMAGES from '../../../assets/Images';
export const SuccessModel = ({ classes, visible, setVisible, txt }: any) => {
  return (
    <CustomDialog
      className={`${classes} bg-[#FFFFFF] w-[543px] h-[333px] flex  justify-center align-middle items-center `}
      visible={visible}
    >
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={() => setVisible(false)}
      ></i>
      <div className=" flex justify-center items-center flex-col gap-10 w-full h-full">
        <img src={IMAGES.GreenTick} />
        <div className="flex flex-col gap-1 justify-center text-center ">
          <p className="text-[20px] font-[800] text-black">SUCCESS!</p>
          <p className="text-[12px] font-[800] text-black">{txt}</p>
        </div>
      </div>
    </CustomDialog>
  );
};
