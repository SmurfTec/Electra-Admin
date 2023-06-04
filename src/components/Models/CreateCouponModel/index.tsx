import React, { useState,useEffect } from 'react'
import { CustomDialog } from '../../../atoms/global.style'
import { InputTxt,CustomDropdown,CustomCalendar,CustomButton } from '../../../atoms'
import { SuccessModel } from '..'
export const CreateCouponModel = ({visible,setVisible,classes}:any) => {
    const [values,setValues]=useState({
        Title:'',
        date:'',
        couponCode:'',
        percentage:'',
        UsageLimit:'',

    })
    const [successVisible,setsuccessVisible]=useState(false)
    const [buttonDisable,setbuttonDisable]=useState(true)
    const [Title,setTitle]=useState('')
    const[date,setDate]=useState('')
    useEffect(()=>{
        //&&(values.UsageLimit.length>0)
        if((values.Title.length>0)&&(values.Title.length>0)&&(values.couponCode.length>0)&&(values.percentage.length>0)){
            setbuttonDisable(false) 
        }else{
            setbuttonDisable(true)
        }
    },[values])
  return (
   <>
   <CustomDialog className={classes} visible={visible} >
    <i className='pi pi-times absolute right-4 top-4 cursor-pointer' onClick={()=>setVisible(false)}></i>
       <div className='dialog-header'>
       <p className='text-center text-[20px] font-[700] text-black '>Create Coupon</p>
       </div>
       <hr className='w-full border border-inputBorder'/>
       <div className='dialogbody flex flex-col gap-4'>
        <InputTxt placeholder="Title here" Title={values.Title} onChange={(e:any)=>setValues({...values,Title:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' txt={`${Title.length}/60`}/>
       <div className='flex justify-center gap-3'>
       <CustomCalendar value={values.date} setDate={(e:any)=>setValues({...values,date:e.value})} classes='!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' placeholder="Expiry Date" MainClasses='!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' />
       <InputTxt placeholder="Percentage Off" Title={values.percentage} onChange={(e:any)=>setValues({...values,percentage:e.target.value})} MainClasses='!w-[150px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' />
       </div>
        <div className='flex flex-col gap-2'>
        <InputTxt inputClasses="!text-center" placeholder="Coupon Code" Title={values.couponCode} onChange={(e:any)=>setValues({...values,couponCode:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
        <p className='text-[12px] text-[#656565] text-right mr-[4rem]'>Max 6 Character Code</p>
        </div>
       <CustomDropdown placeholderColor="#A4A4A4" placeholder="Usage Limit" mainclasses={'!w-[370px] !h-[54px] !border !border-black !rounded-[10px] !bg-[#FFFFFF] m-auto'}/>
       <div className='flex justify-center gap-3'>
        <CustomButton txt="Cancel" classes='!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]'/>
        <CustomButton txt="Generate Code" onClick={()=>{
            if(!buttonDisable){
                setVisible(false)
                setTimeout(()=>{
                    setsuccessVisible(true)
                },1000)
            }
        }} classes={`!w-[179px] !h-[50px] ${buttonDisable==false?'!bg-[#212121]':'!bg-[#A4A4A4]'}  !rounded-[10px] !text-white !text-[16px]`}/>
       </div>
       </div>
   </CustomDialog>
   <SuccessModel visible={successVisible} setVisible={setsuccessVisible} txt={"Coupon succesfully Created"}/>
   </>
  )
}
