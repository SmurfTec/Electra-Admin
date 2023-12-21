import React, { useState } from 'react';
import { CustomButton, InputTxt } from '../../../atoms';
import { CustomDialog } from '../../../atoms/global.style';
import { forgotPassword } from '../../../store/Slices/UserSlice';

export const EmailSendModal = ({
  visible,
  setVisible,
  title = 'Change Password',
  handleSubmit,
}: any) => {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');

  const sendVerificationMail = async () => {
    setLoading(true);
    try {
      const send = await forgotPassword(email);
      if (send) {
        handleSubmit(email);
      }
    } catch (e) {
      console.log('e', e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <CustomDialog
        className={`bg-[#FFFFFF] w-[543px] h-[358px] flex  justify-center align-middle items-center `}
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
            Title={email}
            onChange={(e: any) => setEmail(e.target.value)}
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <div className="flex text-center mx-auto"></div>
          <CustomButton
            onClick={() => sendVerificationMail()}
            txt={'SEND'}
            classes={`!w-[126px] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]  `}
            isLoading={loading}
          />
        </div>
      </CustomDialog>
    </>
  );
};
