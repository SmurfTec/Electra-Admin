import React, { useState } from 'react';
import { Checkbox } from 'primereact/checkbox';
import styled from 'styled-components';
const CustomChecked = styled(Checkbox)`
  .p-highlight {
    background-color: black !important;
    border: none;
  }
  .p-checkbox-box {
    border-radius: 11px;
  }
`;
export const Miniselect = (props: any) => {
  const [checked, setChecked] = React.useState(props.checked || false);
  return (
    <div className="flex gap-3">
      {props.radio ? (
        <input
          onClick={() => setChecked(!checked)}
          checked={checked}
          className="rounded-full bg-[#D9D9D9]"
          type="radio"
        />
      ) : (
        <CustomChecked
          onChange={(e: any) => setChecked(!checked)}
          checked={checked}
        ></CustomChecked>
      )}
      <p className="font-semibold">{props.txt}</p>
    </div>
  );
};
