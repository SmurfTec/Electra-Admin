import React from 'react'
import IMAGES from '../../assets/Images'
export const SideBar = () => {
  return (
    <div className='w-[10%]  bg-[#FCFCFC] h-screen'>
        <img 
         className='p-4'
         src={IMAGES.Logo}/>
    </div>
  )
}
