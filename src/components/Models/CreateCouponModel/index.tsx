import React, { useState } from 'react'
import { CustomDialog } from '../../../atoms/global.style'
import { InputTxt,CustomDropdown,CustomCalendar,CustomButton } from '../../../atoms'
export const CreateCouponModel = ({visible,setVisible,classes}:any) => {
    const [Title,setTitle]=useState('')
    const[date,setDate]=useState('')
  return (
   <CustomDialog className={classes} visible={visible} >
    <i className='pi pi-times absolute right-4 top-4 cursor-pointer' onClick={()=>setVisible(false)}></i>
       <div className='dialog-header'>
       <p className='text-center text-[20px] font-[700] text-black '>Create Coupon</p>
       </div>
       <hr className='w-full border border-inputBorder'/>
       <div className='dialogbody flex flex-col gap-4'>
        <InputTxt placeholder="Title here" Title={Title} onChange={(e:any)=>setTitle(e.target.value)} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' txt={`${Title.length}/60`}/>
       <div className='flex justify-center gap-3'>
       <CustomCalendar value={date} setDate={setDate} classes='!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' placeholder="Expiry Date" MainClasses='!w-[204px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' />
       <InputTxt placeholder="Percentage Off" Title={Title} onChange={(e:any)=>setTitle(e.target.value)} MainClasses='!w-[150px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF]' />
       </div>
        <div className='flex flex-col gap-2'>
        <InputTxt placeholder="Coupon Code" Title={Title} onChange={(e:any)=>setTitle(e.target.value)} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
        <p className='text-[12px] text-[#656565] text-right mr-[4rem]'>Max 6 Character Code</p>
        </div>
       <CustomDropdown placeholderColor="#A4A4A4" placeholder="Usage Limit" mainclasses={'!w-[370px] !h-[54px] !border !border-black !rounded-[10px] !bg-[#FFFFFF] m-auto'}/>
       <div className='flex justify-center gap-3'>
        <CustomButton txt="Cancel" classes='!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]'/>
        <CustomButton txt="Generate Code" classes='!w-[179px] !h-[50px] !bg-[#A4A4A4] !rounded-[10px] !text-white !text-[16px]'/>
       </div>
       </div>
   </CustomDialog>
  )
}
