import React from 'react';
import { Switch } from '../global.style';
export const CustomSwitch = ({
  checked,
  setChecked,
  marginTop = '-6px',
  ...props
}: any) => {
  return (
    <Switch
      name={props.value}
      margintop={marginTop}
      checked={checked}
      onChange={e =>
        props.onChange
          ? props.onChange(e.target.value)
          : setChecked(e.target.value)
      }
    />
  );
};
