import React,{useState} from 'react'
import IMAGES from '../../assets/Images'
import { InputTxt,InputPassword,CustomButtom } from '../../atoms'
export const Signin = () => {
const [Email,setEmail]=useState('')
const [Password,setPassword]=useState('')
  return (
    <div className='min-h-[100vh] w-[100vw] flex flex-col items-center pt-[90px]'>
        <div className='w-[116px] h-[116px] rounded-[50%] bg-lightgray flex justify-center align-middle items-center'>
            <img src={IMAGES.Hand} alt="hand-img" className='w-[53px] h-[53px]'/>
        </div>
        <h1 className='text-[36px] font-[700] mt-[10px] text-black'>Hello There</h1>
        <p className='text-[16px] text-[#A4A4A4] w-[392px] font-[500] text-center'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec facilisis diam ante,</p>
        <InputTxt placeholder="Enter Email" MainClasses="mt-[40px]" img={IMAGES.Email} value={Email} onChange={(e:any)=>setEmail(e.target.value)}/>
        <InputPassword placeholder="Enter Password" MainClasses="mt-[15px]" img={IMAGES.password} value={Password} onChange={(e:any)=>setPassword(e.target.value)}/>
        <CustomButtom txt="Login" classes='mt-[41px]'/>
        <div className='flex mt-[10px] items-center gap-5 text-gray'>
          <hr className='w-[159px] border-[#A4A4A4]'/>  or <hr className='w-[159px] border-[#A4A4A4]'/>
        </div>
    </div>
  )
}

 