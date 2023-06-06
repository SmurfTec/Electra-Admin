import React,{useState} from 'react'
import { Header } from '../../../components'
import { InputTxt ,CustomButton} from '../../../atoms'
import IMAGES from '../../../assets/Images'

export const CreateCategory = () => {
  const[Email,setEmail]=useState('')
  return (
    <div>
       <Header
       headerClasses={'!h-[69px]'}
       titleClass={'!mt-[10px]'}
        title="Add New Category"
        semiTitle="Add New Category to list item relatively."
       
        UserBox={true}
      />
      <div className='mt-[35px]'>
      <InputTxt
        placeholder="Phone"
        MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
       
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      <InputTxt
        placeholder="Marketplace Fee"
        MainClasses="mt-[10px] !bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
        iconRight={true}
        img={IMAGES.Percentage}
        value={Email}
        onChange={(e: any) => setEmail(e.target.value)}
      />
      </div>
      <div className='mt-[27px]'>
        <p className='text-[20px] font-[600] text-black'>Variants</p>
        <div className='mt-[32px] flex gap-3 flex-wrap w-[32.6rem]'>
        <CustomButton txt="Color" classes="!w-[92px] !h-[42px] !rounded-[7px] "  />
        <CustomButton txt="Capacity" classes="!w-[119px] !h-[42px] !rounded-[7px] "  />
        <CustomButton txt="Carrier" classes="!w-[104px] !h-[42px] !rounded-[7px] "  />
        <CustomButton txt="Screen Size" classes="!w-[140px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black"  />
        <CustomButton txt="OS" classes="!w-[73px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black"  />
        <CustomButton txt="+Add Variant" classes="!w-[140px] !h-[42px] !rounded-[7px] !bg-blue !text-white"  />
        </div>
        <div className='flex gap-3 flex-wrap mt-[50px]'>
        <CustomButton txt="Cancel" classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"  />
        <CustomButton txt="Create Category" classes="!w-[179px] !h-[50px] !rounded-[10px] "  />
        </div>
      </div>
    </div>
  )
}

