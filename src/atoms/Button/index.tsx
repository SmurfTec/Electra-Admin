import React from 'react'

export const CustomButton = ({txt,classes,value,valueclasses,...props}:any) => {
  return (
     <div {...props} className={`w-[397px] h-[72px] overflow-hidden flex items-center justify-center bg-black text-[white] text-[16px] font-[500] rounded-[17px] cursor-pointer ${classes}`}>
      
      {txt}
      {value && <div className={`w-[23px] h-[23px] flex justify-center items-center text-[14px] rounded-[50px]  ${valueclasses}`}>
        {value}
        </div>}
      </div>
  )
}

