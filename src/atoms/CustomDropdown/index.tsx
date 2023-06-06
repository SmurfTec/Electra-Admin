import { Dropdown } from "primereact/dropdown";
import styled from "styled-components";
const Drops = styled(Dropdown)`
  outline: none !important;
  box-shadow: none !important;
  background-color: #f6f6f6 ;
  width: 397px;
  height: 72px;
  display: flex;
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 6px;
  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important;
  }
  .p-dropdown-label.p-placeholder {
    display: flex;
    align-items: center;
    color:  ${({ placeholderColor }: any) => (placeholderColor ? placeholderColor : "black")};;
    padding-left: 18px;
  }
`;
export const CustomDropdown = (props: any) => {
  const cities = ["Iphone11", "Iphone12", "Iphone13", "Iphone14"];
  return (
    <Drops
      placeholderColor={props.placeholderColor}
      value={"YOO"}
      className={props.mainclasses}
      placeholder={props.placeholder}
      options={cities}
    />
  );
};
