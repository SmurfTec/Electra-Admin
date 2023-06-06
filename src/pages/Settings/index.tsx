import React,{useState} from 'react'
import { Header } from '../../components'
import IMAGES from '../../assets/Images'
import { CustomSwitch } from '../../atoms'
import { SVGIcon } from '../../components/SVG'
import { EmailVerificationModel,ChangePasswordModel,SuccessModel,AuthValueModel } from '../../components'
export const Settings = () => {
    const[EmailModel,setEmailModel]=useState(false)
    const[PassModel,setPassModel]=useState(false)
    const[ChangePassModel,setChangePassModel]=useState(false)
    const[successModel,setsuccessModel]=useState(false)
    const[authmodel,setauthmodel]=useState(false)
    const[successtxt,setsuccesstxt]=useState("Your password has been changed")
    const [phonemodel,setphonemodel]=useState(false)
    const [changephonemodel,setchangephonemodel]=useState(false)
    const handlePass=()=>{
        setPassModel(false)
        setChangePassModel(true)
    }
    const handleUpdatePass=()=>{
        setChangePassModel(false)
        setsuccessModel(true)
    }
    const handleEmail=()=>{
        setEmailModel(false)
        setauthmodel(true)
    }
    const handlePhone=()=>{
        setphonemodel(false)
        setchangephonemodel(true)
    }
    
  return ( 
    <div>
        <EmailVerificationModel 
        visible={EmailModel} 
        setVisible={setEmailModel}
        title="CHANGE EMAIL"
        onClick={handleEmail}
       
        />
        <EmailVerificationModel 
        visible={phonemodel} 
        setVisible={setphonemodel}
        title="CHANGE PHONE NUMBER"
        onClick={handlePhone}
       
        />
        <AuthValueModel 
        visible={authmodel} 
        setVisible={setauthmodel}
        title="CHANGE EMAIL"
        onClick={()=>setauthmodel(false)}
        />
         <AuthValueModel 
        visible={changephonemodel} 
        setVisible={setchangephonemodel}
        title="CHANGE PHONE NUMBER"
        onClick={()=>{setchangephonemodel(false);setsuccesstxt("Your phone number has been changed.");setsuccessModel(true)}}
        body="Enter your new phone number"
        placeholder="Phone Number"
        />
        <EmailVerificationModel 
        visible={PassModel} 
        setVisible={setPassModel}
        title="CHANGE PASSWORD"
        onClick={handlePass}
        />
        <ChangePasswordModel 
        visible={ChangePassModel} 
        setVisible={setChangePassModel}
        title="CHANGE PASSWORD"
        onClick={handleUpdatePass}
        showSuccessModel={false}
        />
        <SuccessModel 
        visible={successModel} 
        setVisible={setsuccessModel}
        txt={successtxt}
        
        />
        <Header
         
        typeSearch={true}
        UserBox={true}
      />
      <div className='mt-[49px]'>
        <p className='text-[16px] font-[700] text-black'>Security </p>
        <hr className='w-[99%] mt-[11px] border-line-border'/>
        <div className='flex justify-between w-[94%] mt-[20px] ml-[10px]'>
            <div className='flex flex-col gap-3'>
                <div className='flex gap-2'>
                    <SVGIcon
                     src={IMAGES.Email}
                     filled={false}
                     
                    />
                  
                    <p className='text-[12px] text-gray'>EMAIL</p>
                </div>
                <p className='text-[16px] font-[600]'>Huzayfahhanif@gmail.com</p>
            </div>
            <div className='w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer' onClick={()=>setEmailModel(true)}>
                <img src={IMAGES.Edit}/>
            </div>
        </div>
        <div className='flex justify-between w-[94%] mt-[29px] ml-[10px]'>
            <div className='flex flex-col'>
                <div className='flex gap-2 items-center'>
                <SVGIcon
                     src={IMAGES.Password}
                     filled={false}
                     
                    />
                    <p className='text-[12px] mt-[2px] text-gray'> PASSWORD</p>
                </div>
                <div className='flex items-center gap-1 mt-[10px]'>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                <p className='w-[6px] h-[6px] rounded bg-black font-[600]'></p>
                </div>
            </div>
            <div className='w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer'  onClick={()=>setPassModel(true)}>
                <img src={IMAGES.Edit}/>
            </div>
        </div>
        <div className='flex justify-between w-[94%] mt-[29px] ml-[10px]'>
            <div className='flex flex-col gap-2'>
                <div className='flex gap-2 items-center'>
                <SVGIcon
                     src={IMAGES.Phone}
                     filled={false}
                     
                    />
                    <p className='text-[12px] text-gray'>PHONE NO</p>
                </div>
                <p className='text-[16px] font-[600]'>355454564646</p>
            </div>
            <div className='w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center cursor-pointer' onClick={()=>setphonemodel(true)}>
                <img src={IMAGES.Edit}/>
            </div>
        </div>
      </div>
      <div className='mt-[63px]'>
      <p className='text-[16px] font-[700] text-black'>Payment Method </p>
        <hr className='w-[99%] mt-[11px] border-line-border'/>
        <div className='flex justify-between w-[94%] mt-[20px] ml-[10px]'>
            <div className='flex flex-col gap-2'>
                <div className='flex items-center gap-2'>
                <SVGIcon
                     src={IMAGES.Bank}
                     filled={false}
                     
                    />
                    <p className='text-[12px] text-gray'>Bank Details (IBAN)</p>
                </div>
                <div className='flex gap-2 items-center'>
                    <img src={IMAGES.BankHome}/>
                <p className='text-[16px] font-[600]'>PKA3425425252525525</p>
                </div>
            </div>
            <div className='flex gap-2'>
            <div className='w-[33px] bg-[#FF0000] h-[33px] text-white text-[20px] rounded-[50px] flex justify-center items-center'>
               <hr className='w-[20px] border-[1px]'/>
            </div>
            <div className='w-[33px] h-[33px] bg-lightgray rounded-[50px] flex justify-center items-center'>
                <img src={IMAGES.Edit}/>
            </div>
            </div>
        </div>
      </div>
      <div className='mt-[63px]'>
      <p className='text-[16px] font-[700] text-black'>Notification </p>
        <hr className='w-[99%] mt-[11px] border-line-border'/>
        <div className='flex justify-between w-[94%] mt-[20px] ml-[10px]'>
            <div className='flex items-center gap-2'>
                <img src={IMAGES.Bell} className='w-[20px] h-[20px]'/>
                <p className='text-[16px] font-[600]'>Turn on all notifications related to your website.</p>
            </div>
            <div className=''>
                <CustomSwitch checked={true}/>
            </div>
        </div>
      </div>
      <div className='mt-[63px]'>
      <p className='text-[16px] font-[700] text-black'>2 Factor Authentication </p>
        <hr className='w-[99%] mt-[11px] border-line-border'/>
        <div className='flex justify-between w-[94%] mt-[20px] ml-[10px]'>
            <div className='flex items-center gap-2'>
            <img src={IMAGES.Shield} className='w-[20px] h-[20px]'/>
                <p className='text-[16px] font-[600]'>Enable two factor authentication for keeping your account secure.</p>
            </div>
            <div className=''>
                <CustomSwitch checked={false}/>
            </div>
        </div>
      </div>
      <div className='mt-[63px]'>
      <p className='text-[16px] font-[700] text-black'>Maintenance Mode </p>
        <hr className='w-[99%] mt-[11px] border-line-border'/>
        <div className='flex justify-between w-[94%] mt-[20px] ml-[10px]'>
            <div className='flex items-center gap-2'>
            <img src={IMAGES.Maintenance} className='w-[20px] h-[20px]'/>
                <p className='text-[16px] font-[600]'>Enable maintenance mode in case of any development going on. </p>
            </div>
            <div className=''>
                <CustomSwitch checked={false}/>
            </div>
        </div>
      </div>
    </div>
  )
}

