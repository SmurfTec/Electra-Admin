import React, { useEffect, useState } from 'react';
import IMAGES from '../../assets/Images';
import { CustomSwitch } from '../../atoms';
import { Header } from '../../components';
import { SVGIcon } from '../../components/SVG';
import {
  SendEmail,
  UpdateUser,
  VerifyUserCode,
} from '../../store/Slices/UserSlice';

import {
  AuthValueModel,
  BankAccountModel,
  BankAccountPinModel,
  ChangePasswordModel,
  EmailVerificationModel,
  SuccessModel,
} from '../../components';
export const Settings = () => {
  const [userdata, setuserdata] = useState<any>();

  const [initial1, setinitial1] = useState(true);
  const [initial2, setinitial2] = useState(true);
  const [initial3, setinitial3] = useState(true);
  const [twoFactorAuth, settwoFactorAuth] = useState(
    userdata?.profile?.is_two_step_verification_enabled || false
  );
  const [Notifications, setNotifications] = useState(
    userdata?.profile?.receive_notifications || false
  );
  const [MaintainaceMode, setMaintainaceMode] = useState(
    userdata?.profile?.maintenance_mode || false
  );
  const [EmailModel, setEmailModel] = useState(false);
  const [PassModel, setPassModel] = useState(false);
  const [ChangePassModel, setChangePassModel] = useState(false);
  const [successModel, setsuccessModel] = useState(false);
  const [authmodel, setauthmodel] = useState(false);
  const [successtxt, setsuccesstxt] = useState(
    'Your password has been changed'
  );
  const [phonemodel, setphonemodel] = useState(false);
  const [changephonemodel, setchangephonemodel] = useState(false);
  const [bankmodel, setbankmodel] = useState(false);
  const [addbank, setaddbank] = useState(false);
  const [BankAccountPin, setBankAccountPin] = useState(false);
  const [password] = useState();
  const handlePass = () => {
    setPassModel(false);
    setChangePassModel(true);
  };
  const handleUpdatePass = () => {
    setChangePassModel(false);
    setsuccessModel(true);
  };
  const handleEmail = () => {
    setEmailModel(false);
    setauthmodel(true);
  };
  const handlePhone = () => {
    setphonemodel(false);
    setchangephonemodel(true);
  };
  const handleAddBank = () => {
    setaddbank(false);
    setBankAccountPin(true);
  };
  const EmailSend = async () => {
    const r = await SendEmail();
  };
  const VerifyCode = async (code: any, txt: any) => {
    if (txt == 'verifyEmail') {
      const r = await VerifyUserCode(code);
      if (r.status !== 400 && r.status !== undefined) {
        setauthmodel(true);
      }
    } else if (txt == 'verifyPhone') {
      const response = await VerifyUserCode(code);
      if (response.status != 400 && response.status !== undefined) {
        setchangephonemodel(true);
      }
    } else if ((txt = 'verifyPass')) {
      const response = await VerifyUserCode(code);
      if (response.status != 400 && response.status !== undefined) {
        setChangePassModel(true);
        setPassModel(false);
      }
    }
  };
  const updateUserData = async (successtxt: any, databody: any) => {
    try {
      const body = databody;
      const response = await UpdateUser(body);
      if (!(response.status == 400)) {
        setauthmodel(false);
        setEmailModel(false);
        setphonemodel(false);
        setchangephonemodel(false);
        setuserdata(response.user);
        localStorage.setItem('user', JSON.stringify(response.user));
        setsuccesstxt(successtxt);
        setsuccessModel(true);
      }
    } catch (err) {}
  };

  useEffect(() => {
    if (initial1) {
      setinitial1(false);
    } else {
      const body = {
        receive_notifications: Notifications,
      };
      updateUserData('Notifications updated successfully', body);
    }
  }, [Notifications]);
  useEffect(() => {
    if (initial3) {
      setinitial3(false);
    } else {
      const body = {
        maintenance_mode: MaintainaceMode,
      };
      updateUserData('Maintainace Mode updated successfully', body);
    }
  }, [MaintainaceMode]);
  useEffect(() => {
    if (initial2) {
      setinitial2(false);
    } else {
      const body = {
        is_two_step_verification_enabled: twoFactorAuth,
      };
      updateUserData('Verfication updated successfully', body);
    }
  }, [twoFactorAuth]);
  useEffect(() => {
    if (localStorage.getItem('user')) {
      const data: string | null = localStorage.getItem('user');
      if (data) {
        const parsedData = JSON.parse(data);

        setuserdata(parsedData);
      }
    }
  }, []);
  return (
    <div>
      <BankAccountModel
        visible={bankmodel}
        setVisible={setbankmodel}
        onClick={() => {
          setbankmodel(false);
          setsuccessModel(true);
          setsuccesstxt('Banking Information Added Successfully');
        }}
      />
      <BankAccountPinModel
        visible={BankAccountPin}
        setVisible={setBankAccountPin}
        onClick={() => {
          setBankAccountPin(false);
        }}
      />
      <EmailVerificationModel
        visible={EmailModel}
        setVisible={setEmailModel}
        title="CHANGE EMAIL"
        onClick={(code: any, verify: any) => VerifyCode(code, verify)}
        SendEmail={EmailSend}
        verifytxt="verifyEmail"
      />
      <EmailVerificationModel
        visible={addbank}
        setVisible={setaddbank}
        title="Adding Bank Account"
        onClick={handleAddBank}
      />
      <EmailVerificationModel
        visible={phonemodel}
        setVisible={setphonemodel}
        title="CHANGE PHONE NUMBER"
        SendEmail={EmailSend}
        verifytxt="verifyPhone"
        onClick={(code: any, verify: any) => VerifyCode(code, verify)}
      />
      <AuthValueModel
        visible={authmodel}
        setVisible={setauthmodel}
        title="CHANGE EMAIL"
        onClick={(Code: any) => {
          setauthmodel(false);
          updateUserData('Email Updated Successfully', { email: Code });
        }}
      />
      <AuthValueModel
        visible={changephonemodel}
        setVisible={setchangephonemodel}
        title="CHANGE PHONE NUMBER"
        onClick={(Code: any) => {
          setchangephonemodel(false);
          updateUserData('Phone Updated Successfully', { mobile_no: Code });
        }}
        body="Enter your new phone number"
        placeholder="Phone Number"
      />
      <EmailVerificationModel
        visible={PassModel}
        setVisible={setPassModel}
        title="CHANGE PASSWORD"
        onClick={(code: any, verify: any) => VerifyCode(code, verify)}
        verifytxt={'verifyPass'}
      />
      <ChangePasswordModel
        visible={ChangePassModel}
        setVisible={setChangePassModel}
        title="CHANGE PASSWORD"
        onClick={handleUpdatePass}
        showSuccessModel={false}
      />
      <SuccessModel
        visible={successModel}
        setVisible={setsuccessModel}
        txt={successtxt}
      />
      <Header typeSearch={true} UserBox={true} />
      <div className="mt-[49px]">
        <p className="text-[16px] font-[700] text-black">Security </p>
        <hr className="w-[99%] mt-[11px] border-line-border" />
        <div className="flex justify-between w-[94%] mt-[20px] ml-[10px]">
          <div className="flex flex-col gap-3">
            <div className="flex gap-2">
              <SVGIcon src={IMAGES.Email} filled={false} />

              <p className="text-[12px] text-gray">EMAIL</p>
            </div>
            <p className="text-[16px] font-[600]">{userdata?.email}</p>
          </div>
          <div
            className="w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              setEmailModel(true);
              EmailSend();
            }}
          >
            <img src={IMAGES.Edit} />
          </div>
        </div>
        <div className="flex justify-between w-[94%] mt-[29px] ml-[10px]">
          <div className="flex flex-col">
            <div className="flex gap-2 items-center">
              <SVGIcon src={IMAGES.Password} filled={false} />
              <p className="text-[12px] mt-[2px] text-gray"> PASSWORD</p>
            </div>
            <div className="flex items-center gap-1 mt-[10px]">
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
              <p className="w-[6px] h-[6px] rounded bg-black font-[600]"></p>
            </div>
          </div>
          <div
            className="w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              setPassModel(true);
              EmailSend();
            }}
          >
            <img src={IMAGES.Edit} />
          </div>
        </div>
        <div className="flex justify-between w-[94%] mt-[29px] ml-[10px]">
          <div className="flex flex-col gap-2">
            <div className="flex gap-2 items-center">
              <SVGIcon src={IMAGES.Phone} filled={false} />
              <p className="text-[12px] text-gray">PHONE NO</p>
            </div>
            <p className="text-[16px] font-[600]">
              {userdata?.profile?.mobile_no}
            </p>
          </div>
          <div
            className="w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer"
            onClick={() => {
              setphonemodel(true);
              EmailSend();
            }}
          >
            <img src={IMAGES.Edit} />
          </div>
        </div>
      </div>
      <div className="mt-[63px]">
        <p className="text-[16px] font-[700] text-black">Payment Method </p>
        <hr className="w-[99%] mt-[11px] border-line-border" />
        <div className="flex justify-between w-[94%] mt-[20px] ml-[10px]">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <SVGIcon src={IMAGES.Bank} filled={false} />
              <p className="text-[12px] text-gray">Bank Details (IBAN)</p>
            </div>
            <div className="flex gap-2 items-center">
              <img src={IMAGES.BankHome} />
              <p className="text-[16px] font-[600]">PKA3425425252525525</p>
            </div>
          </div>
          <div className="flex gap-2">
            <div className="w-[33px] bg-[#FF0000] h-[33px] text-white text-[20px] rounded-[50px] flex justify-center items-center">
              <hr className="w-[20px] border-[1px]" />
            </div>
            <div
              className="w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer"
              onClick={() => setbankmodel(true)}
            >
              <img src={IMAGES.Edit} />
            </div>
          </div>
        </div>
      </div>
      <div className="mt-[63px]">
        <p className="text-[16px] font-[700] text-black">Notification </p>
        <hr className="w-[99%] mt-[11px] border-line-border" />
        <div className="flex justify-between w-[94%] mt-[20px] ml-[10px]">
          <div className="flex items-center gap-2">
            <img src={IMAGES.Bell} className="w-[20px] h-[20px]" />
            <p className="text-[16px] font-[600]">
              Turn on all notifications related to your website.
            </p>
          </div>
          <div className="">
            <CustomSwitch
              checked={Notifications}
              setChecked={setNotifications}
            />
          </div>
        </div>
      </div>
      <div className="mt-[63px]">
        <p className="text-[16px] font-[700] text-black">
          2 Factor Authentication{' '}
        </p>
        <hr className="w-[99%] mt-[11px] border-line-border" />
        <div className="flex justify-between w-[94%] mt-[20px] ml-[10px]">
          <div className="flex items-center gap-2">
            <img src={IMAGES.Shield} className="w-[20px] h-[20px]" />
            <p className="text-[16px] font-[600]">
              Enable two factor authentication for keeping your account secure.
            </p>
          </div>
          <div className="">
            <CustomSwitch
              checked={twoFactorAuth}
              setChecked={settwoFactorAuth}
            />
          </div>
        </div>
      </div>
      <div className="mt-[63px]">
        <p className="text-[16px] font-[700] text-black">Maintenance Mode </p>
        <hr className="w-[99%] mt-[11px] border-line-border" />
        <div className="flex justify-between w-[94%] mt-[20px] ml-[10px]">
          <div className="flex items-center gap-2">
            <img src={IMAGES.Maintenance} className="w-[20px] h-[20px]" />
            <p className="text-[16px] font-[600]">
              Enable maintenance mode in case of any development going on.{' '}
            </p>
          </div>
          <div className="">
            <CustomSwitch
              checked={MaintainaceMode}
              setChecked={setMaintainaceMode}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
