import { InputText } from 'primereact/inputtext';
import styled from 'styled-components';
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
  percent,
  ...restProps
}: any) => {
  return (
    <div
      className={`flex items-center bg-lightgray gap-2 rounded-[8px] w-[397px] h-[72px] overflow-hidden pl-[12px] pr-[20px] ${MainClasses}`}
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
      {percent && <p className="pr-[3px]">{` % `}</p>}
    </div>
  );
};
