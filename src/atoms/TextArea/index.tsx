import React from 'react'
import { CustomTextArea } from '../global.style'
export const CustomInputTextArea = ({value,setValue,rows=5,cols=30,placeholder,classes,styles}:any) => {
  return (
   
    <CustomTextArea style={styles?styles:{border:"1px solid #FF0000 !important"}} className={classes} placeholder={placeholder} autoResize value={value} onChange={setValue} rows={rows} cols={cols} />
  )
}

 