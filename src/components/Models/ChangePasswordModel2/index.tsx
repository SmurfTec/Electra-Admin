import React, { useEffect, useRef, useState } from 'react';
import Countdown from 'react-countdown';
import { CustomButton, InputPassword, InputTxt } from '../../../atoms';
import { CustomDialog } from '../../../atoms/global.style';
import { ResetPassword, forgotPassword } from '../../../store/Slices/UserSlice';
export const ChangePasswordModel2 = ({
  email,
  visible,
  setVisible,
  handleSubmit,
}: any) => {
  const [currentPass, setcurrentPass] = useState('');
  const [newPass, setnewPass] = useState('');
  const [err, setErr] = useState('');
  const [resetKey, setResetKey] = useState(0);
  const [code, setCode] = useState('');
  const countDown = useRef();

  useEffect(() => {
    return () => {
      setResetKey(0);
      setCode('');
    };
  }, []);

  const ChangeUserPassword = async () => {
    const body = {
      password: currentPass,
      confirmPassword: newPass,
    };

    const response = await ResetPassword(body, code);
    console.log('response', response);
    if (response.status) {
      setVisible(false);
      handleSubmit();
    } else setErr('Unauthorized password was not chnaged');
  };

  const renderer = ({ minutes, seconds, completed }: any) => {
    if (completed) {
      return (
        <p
          className="cursor-pointer text-[#656565] text-[16px] underline"
          onClick={handleResendMail}
        >
          Resend Email
        </p>
      );
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
    } catch (e) {
      console.log('e', e);
    }
  };

  return (
    <>
      <CustomDialog
        className={`bg-[#FFFFFF] w-[543px] h-fit flex  justify-center align-middle items-center `}
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
          <div className="flex flex-col gap-2 mb-2">
            <InputTxt
              inputClasses="!text-center !text-[#3C82D6] !text-[20px]"
              placeholder=" Code"
              Title={code}
              onChange={(e: any) => setCode(e.target.value)}
              MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
            />
            <p className="text-[12px] ml-[5.6rem] font-[500] text-[#656565]">
              Enter code sent to your email
            </p>
            <div className="flex text-center mx-auto">
              <Countdown
                key={resetKey}
                date={Date.now() + 59000}
                autoStart
                renderer={renderer}
                ref={countDown.current}
              />
            </div>
          </div>
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
          {err && <p className="text-red text-center">{err}</p>}
          <CustomButton
            onClick={() => {
              ChangeUserPassword();
            }}
            txt="UPDATE"
            classes="!w-[155px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]"
          />
        </div>
      </CustomDialog>
    </>
  );
};
