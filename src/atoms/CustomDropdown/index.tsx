import { Dropdown } from "primereact/dropdown";
import { useState } from "react";
import styled from "styled-components";
interface DropsProps {
  placeholdercolor: string;
  options:[]
  // Add here other props if necessary
}


const Drops = styled(Dropdown)<DropsProps>`
  outline: none !important;
  box-shadow: none !important;
  background-color: #f6f6f6 ;
  width: 397px;
  height: 72px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  align-items: center;
  font-weight: 500;
  font-family: 'Manrope';
  color: #212121;
font-size: 16px;
  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
  .p-dropdown-label.p-placeholder {
    display: flex;
    align-items: center;
    color:  ${({ placeholdercolor }: any) => (placeholdercolor ? placeholdercolor : "black")};;
    padding-left: 18px;
  }
`;
export const CustomDropdown = (props: any) => {
  const [selectedItem, setSelectedItem] = useState([props.value]);
  let Values = props.options
  return (
    <Drops
      placeholdercolor={props.placeholderColor}
      value={selectedItem}
      onChange={(e:any) => {setSelectedItem(e.value);props.setvalue(e)}}
      className={props.mainclasses}
      placeholder={props.placeholder}
      options={props.options}
    />
  );
};
