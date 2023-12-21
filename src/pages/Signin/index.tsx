import React, { useEffect, useState } from 'react';
import useCookies from 'react-cookie/cjs/useCookies';
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import IMAGES from '../../assets/Images';
import { CustomButton, InputPassword, InputTxt } from '../../atoms';
import { CustomDialog } from '../../atoms/global.style';
import {
  ChangePasswordModel2,
  EmailSendModal,
  EmailVerificationModel,
} from '../../components';
import { Login } from '../../store/Slices/AuthSlice';
import { VerifyUserCode } from '../../store/Slices/UserSlice';
type LoginData = {
  email: string;
  password: string;
};
export const Signin = () => {
  const dispatch = useDispatch();
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [EmailErr, setEmailErr] = useState(false);
  const [EmailSent, setEmailSent] = useState(false);
  const [PasswordErr, setPasswordErr] = useState(false);
  const [EmailModel, setEmailModel] = useState(false);
  const [PassModel, setPassModel] = useState(false);
  const [Code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [forgotEmail, setForgotEmail] = useState('');
  const [successModel, setSuccessModel] = useState(false);

  const navigate = useNavigate();
  const Login1 = async (event: any) => {
    setEmailErr(false);
    setPasswordErr(false);
    const data: LoginData = {
      email: Email,
      password: Password,
    };

    if (Email.length == 0 || Password.length == 0) {
      if (Email.length == 0) {
        setEmailErr(true);
      }
      if (Password.length == 0) {
        setPasswordErr(true);
      }
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(Email))
      return setEmailErr(true);
    else {
      setLoading(true);
      const loginCall = await dispatch(Login(data) as any);
      setLoading(false);
      if (loginCall.payload?.response?.data?.status === 401) {
        // setEmailErr(true);
        setPasswordErr(true);
      } else if (loginCall?.payload?.user) {
        localStorage.setItem('Route', '/Dashboard');
        localStorage.setItem('user', JSON.stringify(loginCall?.payload.user));
        navigate('/Dashboard');
      }
    }
  };
  useEffect(() => {
    localStorage.removeItem('user');
  }, []);

  const handleEmailSend = (email: string) => {
    setForgotEmail(email);
    setEmailSent(false);
    setPassModel(true);
  };
  const handleSuccessToggle = () => setSuccessModel(st => !st);

  return (
    <div className="min-h-[100vh] w-[100vw] flex flex-col items-center pt-[90px]">
      <EmailSendModal
        visible={EmailSent}
        setVisible={setEmailSent}
        handleSubmit={handleEmailSend}
      />
      <ChangePasswordModel2
        email={forgotEmail}
        visible={PassModel}
        setVisible={setPassModel}
        handleSubmit={handleSuccessToggle}
      />
      <RenderSuccessModel
        open={successModel}
        toggleOpen={handleSuccessToggle}
        handleSubmit={handleSuccessToggle}
      />
      <div className="w-[116px] h-[116px] rounded-[50%] bg-lightgray flex justify-center align-middle items-center">
        <img src={IMAGES.Hand} alt="hand-img" className="w-[53px] h-[53px]" />
      </div>
      <h1 className="text-[36px] font-[700] mt-[10px] text-black">
        Hello There
      </h1>
      <p className="text-[16px] text-[#A4A4A4] w-[392px] font-[500] text-center">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis
        diam ante,
      </p>
      <InputTxt
        placeholder="Enter Email"
        MainClasses="mt-[40px]"
        iconLeft={true}
        LeftIcon={IMAGES.Email}
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <InputPassword
        placeholder="Enter Password"
        MainClasses="mt-[15px]"
        img={IMAGES.password}
        value={Password}
        onChange={(e: any) => setPassword(e.target.value)}
        required
      />
      {EmailErr && (
        <div className="w-full max-w-[390px] mt-[10px] flex gap-2 justify-start text-left items-center">
          <div className="w-[15px] h-[15px] text-white bg-red rounded-[50%] flex justify-center items-center text-[10px]">
            i
          </div>
          <p className="text-[14px] text-[#FF0000] font-[400]">
            Email entered is invalid!
          </p>
        </div>
      )}
      {PasswordErr && (
        <div className="flex flex-col justify-start  w-full max-w-[390px] mt-[10px]">
          <div className="flex gap-2 justify-start text-left items-center">
            <div className="w-[15px] h-[15px] text-white bg-red rounded-[50%] flex justify-center items-center text-[10px]">
              i
            </div>
            <p className="text-[14px] text-[#FF0000] font-[400]">
              The password you’ve entered is incorrect!
            </p>
          </div>
          <p className="text-[14px] text-[#B4B4B4] font-[400] mt-[6px]">
            Forgot Password?{' '}
            <span
              onClick={() => setEmailSent(true)}
              className="text-[#06448C] cursor-pointer "
            >
              Click Here
            </span>{' '}
            to reset it.
          </p>
        </div>
      )}

      <div className="flex justify-end text-right  mt-[10px] w-[400px]">
        <p
          onClick={() => setEmailSent(true)}
          className=" cursor-pointer text-[14px] text-right font-[500] text-midgray"
        >
          Forgot Password?
        </p>
      </div>

      <CustomButton
        txt="Login"
        classes="mt-[41px]"
        onClick={Login1}
        isLoading={loading}
      />
    </div>
  );
};

const RenderSuccessModel = ({
  open,
  toggleOpen,
  handleSubmit,
}: {
  open: boolean;
  toggleOpen: () => void;
  handleSubmit: () => void;
}) => {
  return (
    <CustomDialog
      className={` bg-[#FFFFFF] w-[543px] h-[250px] flex  justify-center align-middle items-center `}
      visible={open}
    >
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={toggleOpen}
      ></i>
      <div className="pt-[50px] flex justify-center items-center flex-col gap-4 w-full h-full">
        <img src={IMAGES.PassSuccess} />
        <div className="flex flex-col gap-1 justify-center text-center ">
          <p className="text-[19px] font-[800] text-black overflow-hidden">
            Password Changed Succesfully
          </p>
          <p className="text-[14px] font-[500] text-[#656565] overflow-hidden">
            Click on login to re-enter and continue
          </p>
          <CustomButton
            onClick={handleSubmit}
            txt="Login"
            classes="!w-[90px] !mt-[10px] !h-[40px] border !text-[13px] !text-black !bg-white !mx-auto !rounded-[10px]"
          />
        </div>
      </div>
    </CustomDialog>
  );
};
