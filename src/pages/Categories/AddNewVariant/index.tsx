import React,{useState} from 'react'
import { Header } from '../../../components'
import { InputTxt ,CustomButton,CustomDropdown} from '../../../atoms'
import IMAGES from '../../../assets/Images'
export const AddNewVariant = () => {
  const[Email,setEmail]=useState('')
  return (
    <div>
    <Header
    headerClasses={'!h-[69px]'}
    titleClass={'!mt-[10px]'}
     title="Add New Variant"
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
   <CustomDropdown
            placeholderColor={"#A4A4A4"}
            placeholder="Select Data Type"
            mainclasses={"mt-4 w-[286px] !h-[59px] !bg-[#FCFCFC] border !border-inputBorder"}
          />
   </div>
   <div className='mt-[27px]'>
     <p className='text-[20px] font-[600] text-black'>Values</p>
     <div className='mt-[32px] flex gap-3 flex-wrap w-[33.75rem]'>
    
     <CustomButton
      txt="Blue"
      classes="!w-auto !px-[14px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black !font-[600]"
      editIcon={<img src={IMAGES.Edit} className='ml-[5px]'/>}
      deleteIcon={<img src={IMAGES.Cross} className=''/>}
        />
   <CustomButton
      txt="Black"
      classes="!w-auto !px-[14px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black !font-[600]"
      editIcon={<img src={IMAGES.Edit} className='ml-[5px]'/>}
      deleteIcon={<img src={IMAGES.Cross} className=''/>}
        />
        <CustomButton
      txt="Golden"
      classes="!w-auto !px-[14px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black !font-[600]"
      editIcon={<img src={IMAGES.Edit} className='ml-[5px]'/>}
      deleteIcon={<img src={IMAGES.Cross} className=''/>}
        />
        <CustomButton
      txt="Purple"
      classes="!w-auto !px-[14px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black !font-[600]"
      editIcon={<img src={IMAGES.Edit} className='ml-[5px]'/>}
      deleteIcon={<img src={IMAGES.Cross} className=''/>}
        />
    
     </div>
     <CustomButton txt="+Add Values" classes="!w-[140px] !h-[42px] !rounded-[7px]  !text-white !mt-[13px]"  />
     <div className='flex gap-3 flex-wrap mt-[50px]'>
     <CustomButton txt="Cancel" classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"  />
     <CustomButton txt="Create Variant" classes="!w-[179px] !h-[50px] !rounded-[10px] "  />
     </div>
   </div>
 </div>
  )
}

 