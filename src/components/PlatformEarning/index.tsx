import React from 'react'
import IMAGES from '../../assets/Images'
import { OrderStatus } from '../index'
export const PlatformEarning = () => {
  return (
    <div className='bg-[#FCFCFC] mt-3 rounded px-4 pt-4'>
      <div className='flex justify-between'>
        <p className='font-bold text-[16px]'>
          Platform Earning
        </p>
        <div className='flex gap-2'>
          <p className='font-bold text-[16px]'>
            View All
          </p>
          <img src={IMAGES.ViewArrow}/>
        </div>
      </div>
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
      <OrderStatus />
    </div>
  )
}
