import React,{useState,useRef} from 'react'
import { CustomDialog } from '../../../atoms/global.style'
import { InputTxt } from '../../../atoms'
import { CustomButton } from '../../../atoms'

export const BankAccountPinModel = ({classes,visible,setVisible,onClick}:any) => {
    const[Code,setCode]=useState("")
    const inputs:any = useRef([]);

    const handleChange = (index:any, e:any) => {
      const value = e.target.value;
      if (value.length === 1 && index < inputs.current.length - 1) {
        inputs.current[index + 1].focus();
      }
    };
  
    const handleBackspace = (index:any, e:any) => {
      if (e.key === 'Backspace' && index > 0 && e.target.value.length === 0) {
        inputs.current[index - 1].focus();
      }
    };
  
  return (
   <>
    <CustomDialog className={`${classes} bg-[#FFFFFF] w-[543px] h-[358px] flex  justify-center align-middle items-center `} visible={visible} >
    <i className='pi pi-times absolute right-4 top-4 cursor-pointer' onClick={()=>setVisible(false)}></i>
    <div className='dialog-header'>
       <p className='text-center text-[20px] font-[700] text-black uppercase '>Adding Bank Account </p>
       </div>
       <hr className='w-full border border-inputBorder'/>
       <div className='dialogbody flex flex-col gap-4'>
       <div className='flex flex-col'>
       <p className='text-[12px] font-[600] mx-auto'>Enter Your Last Bank Account Pin</p>
       
       </div>
        <div className='flex gap-3 text-center mx-auto mt-[31px]'>
        <InputTxt
     type="text"
     maxLength="1"
     pattern="[0-9]"
     required
     ref={(el:any) => (inputs.current[3] = el)}
     onChange={(e:any) => handleChange(3, e)}
     onKeyDown={(e:any) => handleBackspace(3, e)}
     placeholder="-"
       inputClasses="!text-[20px] !w-full"  Title={Code} MainClasses='!w-[50px] !pl-[10px] !pr-[0px]  !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
      <InputTxt
     type="text"
     maxLength="1"
     pattern="[0-9]"
     required
     placeholder="-"
     ref={(el:any) => (inputs.current[3] = el)}
     onChange={(e:any) => handleChange(3, e)}
     onKeyDown={(e:any) => handleBackspace(3, e)}
       inputClasses="!text-[20px] !w-full"  Title={Code} MainClasses='!w-[50px] !pl-[10px] !pr-[0px]  !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
      <InputTxt
     type="text"
     maxLength="1"
     pattern="[0-9]"
     required
     placeholder="-"
     ref={(el:any) => (inputs.current[3] = el)}
     onChange={(e:any) => handleChange(3, e)}
     onKeyDown={(e:any) => handleBackspace(3, e)}
       inputClasses="!text-[20px] !w-full"  Title={Code} MainClasses='!w-[50px] !pl-[10px] !pr-[0px]  !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
      <InputTxt
     type="text"
     maxLength="1"
     pattern="[0-9]"
     required
     placeholder="-"
     ref={(el:any) => (inputs.current[3] = el)}
     onChange={(e:any) => handleChange(3, e)}
     onKeyDown={(e:any) => handleBackspace(3, e)}
       inputClasses="!text-[20px] !w-full"  Title={Code} MainClasses='!w-[50px] !pl-[10px] !pr-[0px]  !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
     <InputTxt
     type="text"
     maxLength="1"
     pattern="[0-9]"
     required
     placeholder="-"
     ref={(el:any) => (inputs.current[3] = el)}
     onChange={(e:any) => handleChange(3, e)}
     onKeyDown={(e:any) => handleBackspace(3, e)}
       inputClasses="!text-[20px] !w-full"  Title={Code} MainClasses='!w-[50px] !pl-[10px] !pr-[0px]  !h-[54px] !border !rounded-[10px] !bg-[#FFFFFF] m-auto'/>
     
       </div>
       <CustomButton onClick={onClick} txt={"VERIFY"} classes={`!w-[126px] !h-[50px] !mx-auto !mt-[25px] !rounded-[10px]  `}/> 
        </div>
        </CustomDialog>
   </>
  ) 
}
