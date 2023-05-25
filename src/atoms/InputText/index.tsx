import React from 'react'
import styled from "styled-components"
import { InputText } from "primereact/inputtext";
const CustomInputTxt=styled(InputText)`
    outline: none;
    background-color: transparent !important;
    width: 90%;
`
export  const InputTxt = ({width,img,MainClasses,...restProps}:any) => {
  return (
    <div className={`flex items-center bg-lightgray gap-3 rounded-[8px] w-[397px] h-[72px] overflow-hidden pl-[21px] pr-[22px] ${MainClasses}`}>
  {img && <img src={img} alt="icon-img"/>}  
    <CustomInputTxt {...restProps} />
</div>
  )
}

