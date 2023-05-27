

export const CustomButton = ({txt,classes,value,valueclasses,icon,...props}:any) => {
  return (
     <div {...props} className={`w-[397px] h-[72px] gap-3 overflow-hidden flex items-center justify-center bg-black text-[white] text-[16px] font-[500] rounded-[17px] cursor-pointer ${classes}`}>
      {icon && <i className="pi pi-search  "></i>}
      {txt}
      {value && <div className={`w-[23px] h-[23px] flex justify-center items-center text-[14px] rounded-[50px]  ${valueclasses}`}>
        {value}
        </div>}
      </div>
  )
}

