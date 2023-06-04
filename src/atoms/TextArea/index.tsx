import React from 'react'
import { CustomTextArea } from '../global.style'
export const CustomInputTextArea = ({value,setValue,rows=5,cols=30,placeholder,classes}:any) => {
  return (
   
    <CustomTextArea className={classes} placeholder={placeholder} autoResize value={value} onChange={(e:any) => setValue(e.target.value)} rows={rows} cols={cols} />
  )
}

 