import React from 'react';
import { CustomInputCalendar } from '../global.style';

import IMAGES from '../../assets/Images';
export const CustomCalendar = ({
  date,
  setDate,
  classes,
  placeholder,
  inputbackground,
  img,
  name = 'Release Date',
}: any) => {
  const customIcon = <img src={img ? img : IMAGES.Calendar} />;
  return (
    <CustomInputCalendar
      name={name}
      icon={customIcon}
      showIcon
      placeholder={placeholder}
      inputbackground={inputbackground}
      className={classes}
      value={date}
      onChange={setDate}
    />
  );
};
