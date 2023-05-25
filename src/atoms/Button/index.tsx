import React from 'react'

export const CustomButtom = ({txt,classes}:any) => {
  return (
     <div className={`w-[397px] h-[72px] flex items-center justify-center bg-black text-[white] text-[16px] font-[500] rounded-[17px] ${classes}`}>{txt}</div>
  )
}

