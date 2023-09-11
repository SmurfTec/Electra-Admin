import React, { useState, useRef, useEffect } from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import { InputTxt } from '../../../atoms';
import { CustomButton } from '../../../atoms';
import Countdown from 'react-countdown';

export const EmailVerificationModel = ({
  classes,
  visible,
  setVisible,
  title = 'Email Verification',
  onClick,
  SendEmail,
  verifytxt = '',
  Code,
  setCode,
  setVisible2,
}: any) => {
  const [resetKey, setResetKey] = useState(0);
  const [err, setErr] = useState('');
  const countDown = useRef();
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      setResetKey(prevKey => prevKey + 1);
      if (SendEmail) {
        SendEmail();
      }
    } else {
      return (
        <p className="text-[#656565] text-[16px] underline">
          Resend after {minutes}:{seconds} s
        </p>
      );
    }
  };

  return (
    <>
      <CustomDialog
        className={`${classes} bg-[#FFFFFF] w-[543px] h-[358px] flex  justify-center align-middle items-center `}
        visible={visible}
      >
        <i
          className="pi pi-times absolute right-4 top-4 cursor-pointer"
          onClick={() => setVisible(false)}
        ></i>
        <div className="dialog-header">
          <p className="text-center text-[20px] font-[700] text-black uppercase ">
            {title}{' '}
          </p>
        </div>
        <hr className="w-full border border-inputBorder" />
        <div className="dialogbody flex flex-col gap-4">
          <div className="flex flex-col">
            <p className="text-[12px] font-[600] mx-auto">
              An email has been sent on huzayfahhanif@gmail.com.
            </p>
            <p className="text-[12px] font-[600] mx-auto">
              For verification please enter code in the from the below
            </p>
          </div>
          <InputTxt
            inputClasses="!text-center !text-[#3C82D6] !text-[20px]"
            placeholder=" Code"
            Title={Code}
            onChange={(e: any) => setCode(e.target.value)}
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          {err && (
            <p className="text-red text-center">Code field must be filled</p>
          )}
          <div className="flex text-center mx-auto">
            <Countdown
              key={resetKey}
              date={Date.now() + 59000}
              autoStart
              renderer={renderer}
              ref={countDown.current}
            ></Countdown>
          </div>
          <CustomButton
            onClick={() => {
              if (Code === '') {
                setErr('Enter code');
              } else {
                setVisible(false);
                setVisible2(true);
              }
            }}
            txt={'VERIFY'}
            classes={`!w-[126px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]  `}
          />
        </div>
      </CustomDialog>
    </>
  );
};
