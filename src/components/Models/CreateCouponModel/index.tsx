import React, { useState, useEffect } from 'react';
import { CustomDialog } from '../../../atoms/global.style';
import {
  InputTxt,
  CustomDropdown,
  CustomCalendar,
  CustomButton,
} from '../../../atoms';
import { SuccessModel } from '..';
import { CreateCoupon, UpdateCoupon } from '../../../store/Slices/Coupons';
interface ICoupon {
  Title: string;
  date: string | null | Date;
  couponCode: string;
  percentage: string;
  UsageLimit: any;
}
export const CreateCouponModel = ({
  visible,
  setVisible,
  classes,
  setadded,
  headerTitle = '',
  currentItem,
}: any) => {
  const [values, setValues] = useState<ICoupon>({
    Title: '',
    date: '',
    couponCode: '',
    percentage: '',
    UsageLimit: -1,
  });
  const [buttonTitle, setbuttonTitle] = useState('Generate Code');
  const [options, setoptions] = useState([
    { value: 1, label: '1 Time' },
    { value: 2, label: '2 Times' },
    { value: 3, label: '3 Times' },
    { value: 0, label: 'Unlimited' },
  ]);
  const [successVisible, setsuccessVisible] = useState(false);
  const [buttonDisable, setbuttonDisable] = useState(true);
  const [error, setError] = useState('');
  useEffect(() => {
    //&&(values.UsageLimit.length>0)
    if (
      values.Title.length > 0 &&
      values.date &&
      values.couponCode.length > 0 &&
      values.percentage.length > 0 &&
      values.UsageLimit > -1
    ) {
      setbuttonDisable(false);
    } else {
      setbuttonDisable(true);
    }
    console.log(values);
  }, [values]);
  function generateCouponCode() {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let couponCode = '';

    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      couponCode += characters.charAt(randomIndex);
    } // Combine the time and random part
    // Combine the time and random part
    setValues({
      ...values,
      couponCode,
    });
    setbuttonTitle('Create Coupon');
    return couponCode;
  }

  const generateCode = async () => {
    try {
      let newvalues = {
        title: values?.Title,
        code: values?.couponCode,
        discount: Number(values?.percentage),
        expiry: values?.date,
        maxUse: values?.UsageLimit,
      };
      if (headerTitle == 'Create Coupon') {
        let response = await CreateCoupon(newvalues);
        console.log(response)
        if (response?.response?.status === 400) {
          console.log(response);
          setError('Coupon code already exist');
          return false
        } else{
          console.log("HERE")
          setError("");
          setadded(true);
          setsuccessVisible(true);
          return true
        }
         
          
      } else {
        let response = await UpdateCoupon(currentItem.id, newvalues);
        console.log(response);
        if (response?.response?.status === 400) {
          console.log(response);
          setError('Coupon code already exist');
          return false
        } else {
          setError("");
          setadded(true);
          setsuccessVisible(true);
          return true
        }
      }
    } catch (err) {}
  };
  useEffect(() => {
    if (headerTitle == 'Edit Coupon') {
      setValues({
        ...values,
        Title: currentItem?.title || '',
        date: new Date(currentItem?.Expiry),
        couponCode: currentItem?.CouponCode || '',
        percentage: currentItem?.OffPercentage || '',
        UsageLimit: currentItem?.maxUse,
      });
      setbuttonTitle('Update Coupon');
    } else {
      setValues({
        Title: '',
        date: '',
        couponCode: '',
        percentage: '',
        UsageLimit: -1,
      });
      setbuttonTitle('Generate Coupon');
    }
  }, [headerTitle, currentItem]);
  return (
    <>
      <CustomDialog className={classes} visible={visible}>
        <i
          className="pi pi-times absolute right-4 top-4 cursor-pointer"
          onClick={() =>{
            setError("")
            setVisible(false)}}
        ></i>
        <div className="dialog-header">
          <p className="text-center text-[20px] font-[700] text-black ">
            {headerTitle}
          </p>
        </div>
        <hr className="w-full border border-inputBorder" />
        <div className="dialogbody flex flex-col gap-4">
          <InputTxt
            placeholder="Title here"
            value={values?.Title}
            Title={values?.Title}
            onChange={(e: any) =>
              setValues({ ...values, Title: e.target.value })
            }
            MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
            txt={`${values?.Title.length}/60`}
          />
          <div className="flex justify-center gap-3">
            <CustomCalendar
              value={values?.date}
              date={values?.date}
              setDate={(e: any) => setValues({ ...values, date: e.value })}
              classes="!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]"
              placeholder="Expiry Date"
              MainClasses="!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]"
            />
            <InputTxt
              placeholder="Percentage Off"
              value={values?.percentage}
              Title={values?.percentage}
              onChange={(e: any) =>
                setValues({ ...values, percentage: e.target.value })
              }
              MainClasses="!w-[150px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]"
            />
          </div>
          <div className="flex flex-col gap-2">
            <InputTxt
              inputClasses="!text-center"
              value={values?.couponCode}
              placeholder="Coupon Code"
              Title={values.couponCode}
              onChange={(e: any) => {
                setValues({ ...values, couponCode: e.target.value });
                if (e.target.value === '') {
                  setbuttonTitle('Generate Coupon');
                } else {
                  setbuttonTitle('Create Coupon');
                }
              }}
              MainClasses="!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto"
            />

            <p className="text-[12px] text-[#656565] text-right mr-[4rem]">
              Max 6 Character Code
            </p>
            {error && <p className="text-red text-center text-[12px]">{error}</p>}
          </div>
          <CustomDropdown
            options={options}
            value={values?.UsageLimit}
            setvalue={(e: any) => setValues({ ...values, UsageLimit: e.value })}
            placeholderColor="#A4A4A4"
            placeholder="Usage Limit"
            mainclasses={
              '!w-[370px] !h-[54px] !border !border-black !rounded-[10px] !bg-[#FFFFFF] m-auto'
            }
          />
          <div className="flex justify-center gap-3">
            <CustomButton
              txt="Cancel"
              classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
            />
            <CustomButton
              txt={buttonTitle}
              onClick={async() => {
                if (!buttonDisable) {
                 const check= await generateCode();
                
                  if(check){
                    
                    setVisible(false);
                  }
                 
                } else if (buttonTitle !== 'Create Coupon') {
                  generateCouponCode();
                }
              }}
              classes={`!w-[179px] !h-[50px] ${
                buttonDisable == false ? '!bg-[#212121]' : '!bg-[#A4A4A4]'
              }  !rounded-[10px] !text-white !text-[16px]`}
            />
          </div>
        </div>
      </CustomDialog>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt={
          headerTitle == 'Create Coupon'
            ? 'Coupon succesfully Created'
            : 'Coupon succesfully Updated'
        }
      />
    </>
  );
};
