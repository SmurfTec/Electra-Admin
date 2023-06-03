import React,{useState} from 'react'
import { Header } from '../../../components'
import { InputTxt } from '../../../atoms'
export const Verification = () => {
  const[OrderTrack,setOrderTrack]=useState('')
  return (
    <div>
        <Header
         chooseFilter={true}
         typeSearch={true}
         UserBox={true}
       />
       <div className='flex mt-[37px]'>
       <InputTxt
        placeholder="Enter Order/Tracking Number"
        MainClasses="!bg-[#FCFCFC] pointer  !rounded-[8px] border !border-inputBorder !w-[300px] !h-[59px] "
        iconLeft={true}
       
        value={OrderTrack}
        onChange={(e: any) => setOrderTrack(e.target.value)}
      />
       </div>
    </div>
  )
}
