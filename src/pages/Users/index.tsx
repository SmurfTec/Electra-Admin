import React from 'react'
import { DashCard } from '../../components'
import IMAGES from '../../assets/Images'
export const Users = () => {
  return (
    <div className='ml-[36px]'>
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
    </div>
  )
}
