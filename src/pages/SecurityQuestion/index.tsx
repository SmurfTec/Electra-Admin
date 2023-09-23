import React, { useEffect, useState } from 'react';
import IMAGES from '../../assets/Images';
import { InputTxt, CustomButton, CustomDropdown } from '../../atoms';
import { Link, useNavigate } from 'react-router-dom';
export const SecurityQuestion = () => {
  const [Email, setEmail] = useState('');
  const [Password, setPassword] = useState('');
  const [options] = useState(['What was your childhood nickname?']);
  const navigate = useNavigate();
  const Login = (event: any) => {
    event.preventDefault();
  };

  return (
    <div className="min-h-[100vh] w-[100vw] flex flex-col items-center pt-[90px]">
      <h1 className="text-[36px] font-[700] mt-[10px] text-black">
        Security Question
      </h1>
      <p className="text-[16px] text-[#A4A4A4] mt-[10px] w-[392px] font-[500] text-center ">
        Set a security question for security.
      </p>
      <CustomDropdown
        options={options}
        value={'What was your childhood nickname?'}
        mainclasses="!mt-[30px] !bg-white !w-[39rem]"
        placeholdercolor="#9C9C9C"
        placeholder="Select Security Question"
      />
      <InputTxt
        placeholder="Answer Here"
        MainClasses="mt-[20px] !w-[39rem] !bg-white !border !border-inputBorder"
        img={IMAGES.Email}
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />

      <CustomButton txt="Save" classes="mt-[41px]" onClick={Login} />
    </div>
  );
};
