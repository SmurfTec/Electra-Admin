import React from 'react'
import { CustomInputCalendar } from '../global.style'

import IMAGES from '../../assets/Images'
export const CustomCalendar = ({date,setDate,classes,placeholder,inputbackground,img}:any) => {
    const customIcon = (
        <img src={img ?img: IMAGES.Calendar}/>
      );
  return (
    <CustomInputCalendar icon={customIcon} showIcon placeholder={placeholder} inputbackground={inputbackground} className={classes} value={date} onChange={setDate}/>
  )
}

 