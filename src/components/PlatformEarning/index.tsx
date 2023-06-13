import React from 'react'
import IMAGES from '../../assets/Images'
import { OrderStatus } from '../index'
import { ViewAll } from '../../atoms'
export const PlatformEarning = () => {
  return (
    <div className='bg-[#FCFCFC] mt-2 rounded px-4 pt-4 h-90'>
      <div className='flex justify-between'>
        <p className='font-bold text-[16px]'>
          Platform Earning
        </p>
        <div className='flex gap-2'>
          <ViewAll />
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
