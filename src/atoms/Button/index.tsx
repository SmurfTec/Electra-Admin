import React from 'react'

export const CustomButtom = ({txt,classes,...props}:any) => {
  return (
     <div {...props} className={`w-[397px] cursor-pointer h-[72px] flex items-center justify-center bg-black text-[white] text-[16px] font-[500] rounded-[17px] ${classes}`}>{txt}</div>
  )
}

