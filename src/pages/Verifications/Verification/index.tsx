import React,{useState} from 'react'
import { Header } from '../../../components'
import { InputTxt } from '../../../atoms'
import { CustomButton } from '../../../atoms'
import IMAGES from '../../../assets/Images'
export const Verification = () => {
  const[OrderTrack,setOrderTrack]=useState('')
  return (
    <div>
        <Header
         chooseFilter={true}
         typeSearch={true}
         UserBox={true}
       />
       <div className='flex mt-[37px] gap-3'>
       <InputTxt
        placeholder="Enter Order/Tracking Number"
        MainClasses="!bg-[#FCFCFC] pointer  !rounded-[8px] border !border-inputBorder !w-[300px] !h-[59px] "
        iconLeft={true}
     
        value={OrderTrack}
        onChange={(e: any) => setOrderTrack(e.target.value)}
      />
      <CustomButton
      classes='!w-[63px] !h-[59px] !rounded-[8px]'
      icon={true}
      />
       </div>
       <div className='my-[16px] flex justify-center text-center w-[100%] max-w-[350px] '>
        <p className='text-[15px] font-[500] text-[#656565]'>Or</p>
       </div>
       <CustomButton
      classes='!w-auto !max-w-[374px] !px-[1rem] !h-[59px] !rounded-[8px] !bg-blue'
    
      txt="Scan Bar Code"
      iconLeft={<img src={IMAGES.BarCode}/>}
      />
      <div className='flex justify-between mt-[47px]'>
        <div className='flex flex-col '>
          <p className='text-[20px] text-black font-[600]'>Verification</p>
          <p className='text-[14px] text-[#A4A4A4] font-[400]'>Verify items for proceeding further</p>
        </div>
      </div>
    </div>
  )
}
