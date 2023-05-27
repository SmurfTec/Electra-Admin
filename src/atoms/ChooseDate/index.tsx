import React from 'react'

export const ChooseDate = () => {
  return (
    <div className='bg-[#3C82D6] h-[39px] flex gap-2 items-center rounded p-2 overflow-hidden cursor-pointer'>
        <i className='pi pi-calendar' style={{color:"white"}}></i>
        <p className='text-[white]'>
            Choose Date
        </p>
    </div>
  )
}
