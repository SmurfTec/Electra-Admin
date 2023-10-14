import { CustomDialog } from '../../../atoms/global.style';
import { CustomButton } from '../../../atoms';
import { useState, useEffect } from 'react';
export const Confirmationmodal2 = ({
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
  handleFunction2,
  setOkButton,
  setCancelButton,
  Value = '',
  ObjVal,
  setObjVal,
  setValue,
  value,
  placeholderValue="Enter Color",
  placeholderValue2="Enter Color",
}: any) => {
  // insert here
  const [error, setError] = useState('');

  return (
    <CustomDialog
      className={`${classes} bg-[#FFFFFF] w-[546px] h-[268px] flex  justify-center align-middle items-center overflow-hidden `}
      visible={visible}
    >
      <i
        className="absolute cursor-pointer pi pi-times right-4 top-4"
        onClick={() => {
          setError('');
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
                placeholder={placeholderValue}
                value={Value}
                onChange={e => setValue(e.target.value)}
                className="px-2 focus:outline-none"
              />
              <div className="bg-[#A4A4A4] flex justify-center items-center text-[white] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
                i
              </div>
            </div>
          </>
        )}
        {ObjVal &&
        <>
         <div className="flex justify-between items-center px-2 border w-[370px] h-[54px] mx-auto mt-8 rounded-[10px]">
              <input
                placeholder={placeholderValue}
                value={ObjVal.title}
                onChange={e => setObjVal({...ObjVal,title:e.target.value})}
                className="px-2 focus:outline-none"
              />
              <div className="bg-[#A4A4A4] flex justify-center items-center text-[white] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
                i
              </div>
            </div>
            <div className="flex justify-between items-center px-2 border w-[370px] h-[54px] mx-auto mt-8 rounded-[10px]">
              <input
                placeholder={placeholderValue2}
                value={ObjVal.value}
                onChange={e => setObjVal({...ObjVal,value:e.target.value})}
                className="px-2 focus:outline-none"
              />
              <div className="bg-[#A4A4A4] flex justify-center items-center text-[white] text-center h-[15px] w-[15px] overflow-hidden rounded-full">
                i
              </div>
            </div>
        </>
        }
        {Feemodif && (
          <>
            <div className="flex justify-between items-center mt-3 px-2 border w-[200px] h-[54px] mx-auto rounded-[10px]">
              <input
                onChange={e => {
                  setError('');
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
        <div className="flex justify-center gap-4 mt-8">
          <CustomButton
            txt={cnclebtnText}
            classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
            onClick={(e: any) => {
              if (setCancelButton) {
                setCancelButton(e);
              } else {
                setError('');
                setVisible(false);
              }
            }}
          />
          <CustomButton
            onClick={() => {
             
              if (handleFunction!==undefined) {
                
                handleFunction(Value);
              }
              if(handleFunction2!==undefined){
               
                handleFunction2(ObjVal);
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
