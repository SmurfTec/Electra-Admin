export const CustomButton = ({
  txt,
  classes,
  value,
  valueclasses,
  iconLeft,
  icon,
  editIcon,
  deleteIcon,
  ...props
}: any) => {
  return (
    <div
      {...props}
      name={txt}
      data-value={txt}
      onClick={() => {
        if (props?.onClick) {
          props?.onClick(txt);
        }
      }}
      className={`w-[397px] h-[72px] gap-3 overflow-hidden flex items-center justify-center bg-black text-[white] text-[16px] font-[500] rounded-[17px] cursor-pointer ${classes}`}
    >
      {icon && <i className="pi pi-search  "></i>}
      {iconLeft && iconLeft}
      {txt}
      {value && (
        <div
          className={`w-[23px] h-[23px] flex justify-center items-center text-[14px] rounded-[50px]  ${valueclasses}`}
        >
          {value}
        </div>
      )}
      {editIcon && editIcon}
      {deleteIcon && deleteIcon}
    </div>
  );
};
