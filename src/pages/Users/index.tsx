import React from 'react'
import { DashCard } from '../../components'
import IMAGES from '../../assets/Images'
import { CustomTableComponent,CustomButton } from '../../atoms'
import styled from 'styled-components'

export const Users = () => {
  return (
    <div className=''>
      <div className='flex flex-wrap gap-6'>
      <DashCard
          title={"Total Users"}
          totalNumber={"4500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"User Registered In March"}
          totalNumber={"350"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"User Registered This Year"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
      </div>
      <div className='mt-[40px] relative'>
        <CustomTableComponent/>
       

       
      </div>
      {/* <div className='flex justify-center mt-3 w-full '>
      <CustomButton txt={'View More'}  classes='mt-3 bg-[#FFFFFF] h-[50px] text-[black] '/>
      </div> */}
    </div>
  )
}
