import React,{useState} from 'react'
import styled from "styled-components"
import { InputText } from "primereact/inputtext";
import IMAGES from '../../assets/Images';
const CustomInputTxt=styled(InputText)`
    outline: none;
    background-color: transparent !important;
    width: 90%;
`
export const InputPassword = ({width,img,eyeIcon,MainClasses,...restProps}:any) => {
    const[showPass,setShowPass]=useState(false)
  return (
    <div className={`flex items-center justify-between bg-lightgray  rounded-[8px] w-[397px] h-[72px] overflow-hidden pl-[21px] pr-[22px] ${MainClasses}`}>
    <div className='flex items-center gap-3'>
    {img && <img src={img} alt="icon-img"/>}  
      <CustomInputTxt type={showPass ?'text':"password"} {...restProps} />
    </div>
    <img className='cursor-pointer' src={eyeIcon?eyeIcon:IMAGES.eye} onClick={()=>setShowPass(!showPass)}/>
  </div>
  )
}

 