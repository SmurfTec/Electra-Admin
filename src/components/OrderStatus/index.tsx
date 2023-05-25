import React from 'react'

export const OrderStatus = () => {
  return (
    <div className='flex justify-between mt-5'>
        <div className='flex gap-3'>
      <div className='h-[15px] w-[15px] rounded-3xl bg-[#3C82D6] self-center'>
      </div>

      <div className='flex flex-col gap-1'>
            <p className='font-bold text-[18px]'>
                Iphone 14 Pro Max
            </p>
            <p className='text-[#A4A4A4] text-[13px]'>
            20,aug,2022 - 15.00 PM
            </p>
        </div>
        </div>
        <div className='flex flex-col gap-1'>
            <p className='text-[#04CE00] text-[13px] text-center'>
                Completed
            </p>
            <p className='text-[#A4A4A4] text-[13px]'>
                TID: 1424325252
            </p>
        </div>
    </div>
  )
}
