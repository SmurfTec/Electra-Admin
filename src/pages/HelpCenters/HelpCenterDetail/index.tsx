import React,{useState,useRef} from 'react'
import { Header } from '../../../components'
import { CustomButton,InputTxt } from '../../../atoms'
import { SVGIcon } from '../../../components/SVG'
import IMAGES from '../../../assets/Images'
import { CustomMenu } from '../../../atoms/global.style'

export const HelpCenterDetail = () => {
  const menuLeft: any = useRef(null);
  const[Reply,setReply]=useState('')
  const ChangeStatus = (event: React.MouseEvent, item: any) => {
    event.preventDefault();
    
     
   
  };
  const items = [
    {
      label: "Mark Solved",

      template: (item: any) => {
        return (
          <div
            onClick={(event) => ChangeStatus(event, item)}
            style={{ backgroundColor: "rgba(60, 130, 214, 0.05) " }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
          >
            <SVGIcon fillcolor={"#3C82D6"} src={IMAGES.pending} /> Mark Solved
          </div>
        );
      },
    },
    {
      label: "Delete",
      template: (item:any) => {
        return (
          <div
            onClick={(event) => ChangeStatus(event, item)}
            style={{ background: "rgba(231, 29, 54, 0.05)" }}
            className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
          >
            <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
          </div>
        );
      },
    },
  ];
  const handleClick=(event:any)=>{
    menuLeft.current.toggle(event);
  }
  return (
   <div>
      <Header chooseFilter={true} typeSearch={true} UserBox={true} />
      <div className='w-[98%] h-auto border border-inputBorder rounded-[7px] mt-[35px] '>
        <div className='flex justify-between pt-[21px] pb-[18px] items-center border-b border-inputBorder px-[39px]'>
          <p className='text-[20px] font-[600]'>Help (ID #1234)</p>
          <div className='flex gap-4 items-center'>
          <CustomButton txt="Pending" classes="!w-auto px-[32px] !h-auto !py-[6px] !rounded-[22px] "  />
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
          <CustomMenu
            popupAlignment="left"
            height={"80px"}
            model={items}
            popup
            ref={menuLeft}
            id="popup_menu_left"
          />
          </div>
        </div>
        <div className='w-[33.5rem] relative flex flex-col gap-12 pt-[24px] pl-[28px] pb-[38px] mt-[22px] ml-[39px] h-auto bg-white rounded-[7px] shadow-md'>
        <div className='flex justify-between items-center w-[20rem]'>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>FIRSTNAME</p>
            <p className='text-[#000000] font-[600] text-[14px]'>Huzayfah</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>LASTNAME</p>
            <p className='text-[#000000] font-[600] text-[14px]'>Huzayfah</p>
          </div>
        </div>
        <div className='flex justify-between items-center w-[20rem]'>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>Email</p>
            <p className='text-[#000000] font-[600] text-[14px]'>huz@gmail.com</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>Phone No</p>
            <p className='text-[#000000] font-[600] text-[14px]'>342422525</p>
          </div>
        </div>
        <div className='flex justify-between items-center w-[20rem]'>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>Order No</p>
            <p className='text-[#000000] font-[600] text-[14px]'>24</p>
          </div>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>Category</p>
            <p className='text-[#000000] font-[600] text-[14px]'>Phone</p>
          </div>
        </div>
        <div className=' w-[25rem] h-auto'>
          <div className='flex flex-col gap-1'>
            <p className='text-black font-[600] text-[12px] uppercase'>Message</p>
            <p className='text-[#000000] font-[600] text-[14px]'>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis 
ipsum sem. Nunc bibendum mi mauris, eget iaculis nisl sagittis ut.
Sed sagittis sollicitudin vulputate.</p>
          </div>
          
        </div>
        <p className='text-[11px] font-[500] absolute bottom-4 right-5 text-[#A4A4A4]'>10.00 PM</p>
        </div>
        <div className='w-[33.5rem] text-[14px] pr-[47px] font-[400] leading-[26px] relative pt-[24px] pl-[28px] pb-[56px] h-auto bg-black text-white mt-[22px] ml-[39px] rounded-[7px]'>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras quis  ipsum
 sem. Nunc bibendum mi mauris, eget iaculis nisl sagittis ut. Sed
sagittis sollicitudin vulputate.
<p className='text-[11px] font-[500] absolute bottom-2 right-5 text-[#A4A4A4]'>10.00 PM</p>
        </div>
        <div className='pt-[114px] pl-[39px] pr-[39px] pb-[39px]'>
        <InputTxt
        placeholder="Type Reply here"
        MainClasses="!bg-[#FFFFFF] pointer !shadow-input-shadow !rounded-[8px] border !border-inputBorder !w-full !h-[91px] !pr-[0px]"
        iconLeft={true}
        LeftIcon={IMAGES.Ring}
        iconRight={true}
        img={IMAGES.Send}
        value={Reply}
        onChange={(e: any) => setReply(e.target.value)}
      />
        </div>
      </div>
     
   </div>
  )
}

 