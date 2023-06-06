import React,{useState,useRef,useEffect} from 'react'
import { CustomDialog } from '../../../atoms/global.style'
import { InputTxt } from '../../../atoms'
import { CustomButton,CustomDropdown,CustomCalendar,CustomInputTextArea } from '../../../atoms'

export const BankAccountModel = ({classes,visible,setVisible,onClick}:any) => {
    const [values,setValues]=useState({
        Bank:'',
        AccountHolder:'',
        AccountNumber:'',
        RoutingNumber:'',
        IBAN:'',
        SwiftCode:'',
        BankAddress:''

    })
    const [successVisible,setsuccessVisible]=useState(false)
    const [buttonDisable,setbuttonDisable]=useState(true)
   
    useEffect(()=>{
        // (values.Bank.length>0)&&
        if(
           
            (values.AccountHolder.length>0)&&
            (values.AccountNumber.length>0)&&
            (values.RoutingNumber.length>0)&&
            (values.IBAN.length>0)&&
            (values.SwiftCode.length>0)&&
            (values.BankAddress.length>0)
            ){
            setbuttonDisable(false) 
        }else{
            setbuttonDisable(true)
        }
    },[values])
  return (
    <CustomDialog className={'w-[853px] h-[737px]'} visible={visible} >
    <i className='pi pi-times absolute right-4 top-4 cursor-pointer' onClick={()=>setVisible(false)}></i>
       <div className='dialog-header'>
       <p className='text-center text-[20px] font-[700] text-black '>Bank Account Information</p>
       </div>
       <hr className='w-full border border-inputBorder'/>
       <div className='dialogbody flex flex-col gap-4 px-[49px]'>
        <div className='flex gap-3'>
        <CustomDropdown placeholderColor="#A4A4A4" placeholder="Select Bank" mainclasses={'!w-[370px] !h-[54px] !border !border-black !rounded-[10px] !bg-[#FFFFFF] m-auto'}/>
        <InputTxt placeholder="Account Holder Name" Title={values.AccountHolder} onChange={(e:any)=>setValues({...values,AccountHolder:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
      
        </div>
        <div className='flex gap-3'>
        <InputTxt placeholder="Account Number (# Digits)" Title={values.AccountNumber} onChange={(e:any)=>setValues({...values,AccountNumber:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' />
        <InputTxt placeholder="Routing Number (9 Digits)" Title={values.RoutingNumber} onChange={(e:any)=>setValues({...values,RoutingNumber:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' />
      
        </div>
        <div className='flex gap-3'>
        <InputTxt placeholder="IBAN (13 Digits+Characters)" Title={values.IBAN} onChange={(e:any)=>setValues({...values,IBAN:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' />
        <InputTxt placeholder="Swift Code (3 Digits)" Title={values.SwiftCode} onChange={(e:any)=>setValues({...values,SwiftCode:e.target.value})} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto' />
      
        </div>
        <div>
            <CustomInputTextArea value={values.BankAddress} setValue={(e:any)=>setValues({...values,BankAddress:e.target.value})} styles={{border:'1px solid #111111'}} classes={' !w-full !h-[100px]'} placeholder="Enter Bank Address"/>
        </div>
        <div className='flex flex-col justify-start gap-5 mt-[20px]'>
            <p className='font-[600] text-[16px] text-[#212121]'>Select Account Type</p>
       <div className='flex gap-3'>
       <CustomButton txt="Current" classes='!w-[118px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]'/>
        <CustomButton txt="Saving" onClick={()=>{ }} classes={`!w-[118px] !h-[50px]  !rounded-[10px] !text-white !text-[16px]`}/>
       </div>
       </div>
       <div className='flex justify-center gap-3 mt-[49px] '>
        <CustomButton txt="Cancel" classes='!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]'/>
        <CustomButton txt="Add Account" onClick={()=>{
            if(!buttonDisable){
                setVisible(false)
                setsuccessVisible(true)
               
            }
        }} classes={`!w-[179px] !h-[50px] ${buttonDisable==false?'!bg-[#212121]':'!bg-[#A4A4A4]'}  !rounded-[10px] !text-white !text-[16px]`}/>
       </div>
       </div>
   </CustomDialog>
  )
}
