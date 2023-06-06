import React,{useState,useRef} from 'react'
import { CustomDialog } from '../../../atoms/global.style'
import { InputTxt } from '../../../atoms'
import { CustomButton } from '../../../atoms'
import Countdown from 'react-countdown';

export const AuthValueModel = ({classes,visible,setVisible,title="Email Verification",onClick,body="Enter your new email",placeholder="Email"}:any) => {
    const[Code,setCode]=useState("")
  return (
    <>
    <CustomDialog className={`${classes} bg-[#FFFFFF] w-[543px] h-[358px] flex  justify-center align-middle items-center `} visible={visible} >
    <i className='pi pi-times absolute right-4 top-4 cursor-pointer' onClick={()=>setVisible(false)}></i>
    <div className='dialog-header'>
       <p className='text-center text-[20px] font-[700] text-black uppercase '>{title} </p>
       </div>
       <hr className='w-full border border-inputBorder'/>
       <div className='dialogbody flex flex-col gap-4'>
       <div className='flex flex-col !mb-[20px]'>
       <p className='text-[12px] font-[600] mx-auto'>{body}</p>
       
       </div>
       <InputTxt inputClasses="!text-center !text-[#3C82D6]  !text-[20px]" placeholder={placeholder} Title={Code} onChange={(e:any)=>setCode(e.target.value)} MainClasses='!w-[370px] !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
       
       <CustomButton onClick={onClick} txt={"Confirm"} classes={`!w-[126px] !mt-[35px] !bg-[#3C82D6] !h-[50px] !mx-auto !mt-[0px] !rounded-[10px]  `}/> 
        </div>
        </CustomDialog>
   </>
  )
}

 