import React, { useState, useRef, useEffect } from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import { InputTxt } from '../../../atoms';
import url from '../../../config/index';
import {
  CustomButton,
  CustomDropdown,
  CustomCalendar,
  CustomInputTextArea,
} from '../../../atoms';

export const BankAccountModel = ({
  classes,
  visible,
  setVisible,
  onClick,
}: any) => {
  const [values, setValues] = useState({
    bank: '',
    account_holder_name: '',
    account_no: '',
    routing_digits: '',
    iban: '',
    swift_code: '',
    account_type: 'savings',
    bank_address:''
  });
  const [successVisible, setsuccessVisible] = useState(false);
  const [buttonDisable, setbuttonDisable] = useState(false);
  const AddBank=async()=>{
   try{
    let body={
      bank: values.bank,
      account_holder_name: values.account_holder_name,
      account_no: Number(values.account_no),
      routing_digits: Number(values.routing_digits),
      iban: values.iban,
      swift_code: Number(values.swift_code),
      account_type: values.account_type,
    }
    let r=await url.patch('/users/me',body)
    if(r){
      onClick()
    }
    
    
   }catch(error){

   }
  }
  useEffect(() => {
    // (values.Bank.length>0)&&
    // if (
    //   values.AccountHolder.length > 0 &&
    //   values.AccountNumber.length > 0 &&
    //   values.RoutingNumber.length > 0 &&
    //   values.IBAN.length > 0 &&
    //   values.SwiftCode.length > 0 &&
    //   values.BankAddress.length > 0
    // ) {
    //   setbuttonDisable(false);
    // } else {
    //   setbuttonDisable(true);
    // }
    if(
      (values.bank.length>0)&&
      (values.account_holder_name.length>0)&&
      (values.account_no.length>0)&&
      (values.routing_digits.length>0 )&&
      (values.iban.length>0 ) &&
      (values.swift_code.length>0 )
      ){
      setbuttonDisable(false)
    }else{
      setbuttonDisable(true)
    }
   
  }, [values]);
  return (
    <CustomDialog className={'w-[853px] h-[737px]'} visible={visible}>
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={() => setVisible(false)}
      ></i>
      <div className="dialog-header">
        <p className="text-center text-[20px] font-[700] text-black ">
          Bank Account Information
        </p>
      </div>
      <hr className="w-full border border-inputBorder" />
      <div className="dialogbody flex flex-col gap-4 px-[49px]">
        <div className="flex gap-3">
          {/* <CustomDropdown
            placeholderColor="#A4A4A4"
            placeholder="Select Bank"
            mainclasses={
              '!w-[370px] !h-[54px] !border !border-black !rounded-[10px] !bg-[#FFFFFF] m-auto'
            }
          /> */}
          <InputTxt
            placeholder="Bank Name"
            Title={values.bank}
            onChange={(e: any) =>
              setValues({ ...values, bank: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <InputTxt
            placeholder="Account Holder Name"
            Title={values.account_holder_name}
            onChange={(e: any) =>
              setValues({ ...values, account_holder_name: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
        </div>
        <div className="flex gap-3">
          <InputTxt
            placeholder="Account Number (# Digits)"
            Title={values.account_no}
            onChange={(e: any) =>
              setValues({ ...values, account_no: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <InputTxt
            placeholder="Routing Number (9 Digits)"
            Title={values.routing_digits}
            onChange={(e: any) =>
              setValues({ ...values, routing_digits: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
        </div>
        <div className="flex gap-3">
          <InputTxt
            placeholder="IBAN (13 Digits+Characters)"
            Title={values.iban}
            onChange={(e: any) =>
              setValues({ ...values, iban: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
          <InputTxt
            placeholder="Swift Code (3 Digits)"
            Title={values.swift_code}
            onChange={(e: any) =>
              setValues({ ...values, swift_code: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
          />
        </div>
        <div>
          <CustomInputTextArea
            value={values.bank_address}
            setValue={(e: any) =>
              setValues({ ...values, bank_address: e.target.value })
            }
            styles={{ border: '1px solid #111111' }}
            classes={' !w-full !h-[100px]'}
            placeholder="Enter Bank Address"
          />
        </div>
        <div className="flex flex-col justify-start gap-5 mt-[20px]">
          <p className="font-[600] text-[16px] text-[#212121]">
            Select Account Type
          </p>
          <div className="flex gap-3">
            <CustomButton
              txt="Current"
              onClick={() => {setValues({...values,account_type:'current'})}}
              classes={`!w-[118px] !h-[50px] ${values.account_type!=='current' && '!bg-[#E2E2E2] !text-black'}  !rounded-[10px]  !text-[16px]`}
            />
            <CustomButton
              txt="Saving"
              onClick={() => {setValues({...values,account_type:'savings'})}}
              classes={`!w-[118px] !h-[50px] ${values.account_type!=='savings' && '!bg-[#E2E2E2] !text-black'}  !rounded-[10px]  !text-[16px]`}
            />
          </div>
        </div>
        <div className="flex justify-center gap-3 mt-[49px] ">
          <CustomButton
            txt="Cancel"
            classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
          />
          <CustomButton
            txt="Add Account"
            onClick={() => {
              if (!buttonDisable) {
                AddBank()
              }
            }}
            classes={`!w-[179px] !h-[50px] ${
              buttonDisable == false ? '!bg-[#212121]' : '!bg-[#A4A4A4]'
            }  !rounded-[10px] !text-white !text-[16px]`}
          />
        </div>
      </div>
    </CustomDialog>
  );
};
