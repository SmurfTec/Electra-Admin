import React from 'react'
import {Switch} from "../global.style"
export const CustomSwitch = ({checked,setChecked,marginTop='-6px'}:any) => {
  return (
   <Switch marginTop={marginTop} checked={checked}  onChange={(e:any) => setChecked(e.value)}/>
  )
}
