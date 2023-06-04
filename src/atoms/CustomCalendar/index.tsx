import React from 'react'
import { CustomInputCalendar } from '../global.style'

import IMAGES from '../../assets/Images'
export const CustomCalendar = ({date,setDate,classes,placeholder}:any) => {
    const customIcon = (
        <img src={IMAGES.Calendar}/>
      );
  return (
    <CustomInputCalendar icon={customIcon} showIcon placeholder={placeholder} className={classes} value={date} onChange={setDate}/>
  )
}

 