import React from 'react'
import {Switch} from "../global.style"
export const CustomSwitch = ({checked,setChecked}:any) => {
  return (
   <Switch checked={checked}  onChange={(e:any) => setChecked(e.value)}/>
  )
}
