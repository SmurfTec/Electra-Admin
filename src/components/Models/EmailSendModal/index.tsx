import React, { useState, useRef, useEffect } from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import { InputTxt } from '../../../atoms';
import { CustomButton } from '../../../atoms';
import { forgotPassword } from '../../../store/Slices/UserSlice';
import Countdown from 'react-countdown';

export const EmailSendModal = ({
  classes,
  visible,
  setVisible,
  title = 'Change Password',
  onClick,
  SendEmail,
  verifytxt = '',
  setEmailModel,
}: any) => {
  const [Code, setCode] = useState('');
  const [resetKey, setResetKey] = useState(0);

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
  const sendVerificationMail = async () => {
    try {
      const send = await forgotPassword(Code);
      if (send) {
        setVisible(false);
        setEmailModel(true);
      }
    } catch (e) {}
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
            <p className="text-[12px] text-black font-extrabold mx-auto">
              Enter an email you want to change password of.{' '}
            </p>
            <p className="text-[12px] text-black font-extrabold mx-auto">
              A confirmation mail will be sent on your email.
            </p>
          </div>
          <InputTxt
            inputClasses="!text-center !text-[#3C82D6] !text-[20px]"
            placeholder=" Enter email"
            Title={Code}
            onChange={(e: any) => setCode(e.target.value)}
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <div className="flex text-center mx-auto"></div>
          <CustomButton
            onClick={() => sendVerificationMail()}
            txt={'SEND'}
            classes={`!w-[126px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]  `}
          />
        </div>
      </CustomDialog>
    </>
  );
};
