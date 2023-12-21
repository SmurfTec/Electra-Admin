import React, { useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { CustomButton, InputTxt } from '../../../atoms';
import { CustomDialog } from '../../../atoms/global.style';
import { forgotPassword } from '../../../store/Slices/UserSlice';

export const EmailVerificationModel = ({
  visible,
  setVisible,
  title = 'Email Verification',
  SendEmail,
  setVisible2,
  handleSubmit,
  email,
}: any) => {
  const [resetKey, setResetKey] = useState(0);
  const [code, setCode] = useState('');
  const [err, setErr] = useState('');
  const countDown = useRef();
  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      <p
        className="cursor-pointer text-[#656565] text-[16px] underline"
        onClick={handleResendMail}
      >
        Resend Email
      </p>;
    } else {
      return (
        <p className="text-[#656565] text-[16px] underline">
          Resend after {minutes}:{seconds} s
        </p>
      );
    }
  };

  const handleResendMail = async () => {
    try {
      await forgotPassword(email);
      setResetKey(prevKey => prevKey + 1);
    } catch (e) {}
  };

  return (
    <>
      <CustomDialog
        className={` bg-[#FFFFFF] w-[543px] h-[358px] flex  justify-center align-middle items-center `}
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
            Title={code}
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
            />
          </div>
          <CustomButton
            onClick={() => {
              if (code === '') return setErr('Enter code');
              handleSubmit(code);
              // if (Code === '') {
              //   setErr('Enter code');
              // } else {
              //   setVisible(false);
              //   setVisible2(true);
              // }
            }}
            txt={'VERIFY'}
            classes={`!w-[126px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]  `}
          />
        </div>
      </CustomDialog>
    </>
  );
};
