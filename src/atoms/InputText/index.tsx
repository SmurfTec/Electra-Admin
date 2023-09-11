import styled from 'styled-components';
import { InputText } from 'primereact/inputtext';
const CustomInputTxt = styled(InputText)`
  outline: none !important;
  background-color: transparent !important;
  width: 90%;
  border: none;
  &:focus {
    outline: none !important;
    border: none !important;
    box-shadow: none !important; /* Add this line */
  }
  &::placeholder {
    font-family: 'Manrope';
    font-style: normal;
    font-size: 16px;
    color: ${({ placeholdertxtColor }: any) =>
      placeholdertxtColor && placeholdertxtColor};
  }
`;
export const InputTxt = ({
  width,
  img,
  MainClasses,
  iconRight,
  iconLeft,
  LeftIcon,
  inputClasses,
  txt,
  ...restProps
}: any) => {
  return (
    <div
      className={`flex items-center bg-lightgray gap-3 rounded-[8px] w-[397px] h-[72px] overflow-hidden pl-[21px] pr-[22px] ${MainClasses}`}
    >
      {iconLeft == true && LeftIcon && (
        <img src={LeftIcon} className="cursor-pointer" alt="icon-img" />
      )}
      {iconRight == false && img && <img src={img} alt="icon-img" />}
      <CustomInputTxt {...restProps} className={`${inputClasses}`} />
      {iconRight == true && img && (
        <img
          src={img}
          alt="icon-img"
          className="cursor-pointer"
          onClick={restProps?.IconRightClick}
        />
      )}
      {txt && <p className="text-[12px] text-black font-[700]">{txt}</p>}
    </div>
  );
};
