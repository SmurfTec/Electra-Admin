import React from 'react'
import { DashCard } from '../../../components'
import IMAGES from '../../../assets/Images'
export const UserProfile = () => {
  return (
    <div className=''>
        <div className='flex gap-5'>
            <div className=' w-[500px] h-[275px] border border-custom-border rounded-[10px] flex flex-col pt-[11px] pl-[17px] pr-[17px]'>
                <div className='flex justify-between'>
                    <div className='flex flex-col gap-2'>
                        <h1 className='text-[24px] font-[600] text-[#212121]'>John Carter</h1>
                        <p className='text-[14px] font-[400] text-[#969696]'>annejacob2@ummoh.com</p>
                    </div>
                </div>
                <div className='flex justify-between mt-[46px]'>
                    <div className='flex flex-col'>
                        <h1 className='text-[14px] font-[500] text-[#969696]'>Joined On</h1>
                        <p className='text-[14px] font-[400] text-[#212121]'>20 aug,2022</p>
                    </div>
                </div>
                <hr className='w-full mt-[19px] border border-custom-border'/>
                <div className='flex justify-between mt-[19px]'>
                    <div className='flex flex-col'>
                        <h1 className='text-[14px] font-[500] text-[#969696]'>Phone No</h1>
                        <p className='text-[14px] font-[400] text-[#212121]'>+53563636366336</p>
                    </div>
                </div>
            </div>
            <div className='flex flex-wrap gap-6'>
            <DashCard
          title={"Total Volume"}
          totalNumber={"4500"}
          myImg={IMAGES.Volume}
          imgColor={"bg-custom-grey"}
          textDash={"bg-yellow-dash px-2 py-1 w-[6rem] "}
          txt="20 aug,2022"
          subtxt="Last Sale"
          textColor={"#3C82D6"}
         
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"Completed Sales"}
          totalNumber={"4500"}
          myImg={IMAGES.Sales}
          imgColor={"bg-custom-blue"}
          textDash={"bg-custom-red w-[67px] "}
          textColor={"#FF0000"}
          arrowImg={IMAGES.downarrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
        <DashCard
          title={"Rejected Sales"}
          totalNumber={"4500"}
          myImg={IMAGES.RegectedSale}
          imgColor={"bg-[#F8B84E]"}
          textDash={"bg-custom-red w-[67px] "}
          textColor={"#FF0000"}
          arrowImg={IMAGES.downarrow}
          outerclasses="w-[284px] h-[140px]"
          
        />
            </div>
        </div>
    </div>
  )
}

 