import React from 'react';
import { CustomCheckBox } from '../global.style';
export const CheckBox = ({ checked, setChecked }: any) => {
  return (
    <CustomCheckBox
      onChange={(e: any) => setChecked(e.checked)}
      checked={checked}
    ></CustomCheckBox>
  );
};
