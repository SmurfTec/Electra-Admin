import {useState,useEffect,useRef} from 'react'
import IMAGES from "../../../assets/Images";
import { CustomButton } from "../../../atoms";
import { CustomDialog } from "../../../atoms/global.style";
import ReactToPrint from 'react-to-print';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { Paginatior } from '../..';
import { ProgressSpinner } from 'primereact/progressspinner';
export const Receiptmodal = ({ visible, setVisible,currentItem }: any) => {
const[item,setItem]=useState<any>({})
const Receiptref=useRef<any>()
const[Load,setLoad]=useState(false)
const DownloadPdf=()=>{
  setLoad(true)
  const capture:any=Receiptref.current
  capture.style.overflow = 'hidden';
  html2canvas(capture).then((canvas:any)=>{
    capture.style.overflow = 'auto';
    const imgdata=canvas.toDataURL('image/png')
    const doc= new jsPDF('p','mm','a4')
    const receiptWidth = doc.internal.pageSize.getWidth() - 100; // Adjust width for margins
    const receiptHeight = (receiptWidth * canvas.height) / canvas.width; // Preserve aspect ratio
    console.log(receiptHeight,receiptWidth)
    // Add the image to the PDF
    doc.addImage(imgdata, 'PNG', 10, 10, receiptWidth, receiptHeight);
    doc.save('receipt.pdf')
    setLoad(false)
  })
 
}

useEffect(()=>{
  if(currentItem){
    setItem(currentItem[0])
  }

},[currentItem])
useEffect(()=>{
console.log(item)
},[item])

  return (
    <CustomDialog

      className={`bg-[#FFFFFF] w-[583px]  flex  justify-center align-middle items-center `}
      visible={visible}
      rounded={`0px`}
    >
      {/* ref={Receiptref} */}
      <div ref={Receiptref}   className='receipt px-8'    style={{height:"890px !important",overflow: "hidden"}}>

      <div  className="flex items-center  justify-between  py-5 border-b border-custom overflow-hidden">
        <p className="ali">Receipt For Order</p>

        <i
          className="pi pi-times absolute right-4 top-6 cursor-pointer"
          onClick={() => setVisible(false)}
        ></i>
      </div>
      <div className="flex gap-3 py-4 ">
        <div className="bg-[#F5F5F5] h-[75px] w-[93px] flex justify-center items-center">
          <img className="h-12" src={IMAGES.Iphone22} />
        </div>
        <div>
          <p className="font-bold text-[20px] text-[#111111]">
           {item["Item Name"]}
          </p>
          <div className="flex mt-2 gap-5">
          {item?.receipt?.specs.map((item:any)=>{
            return(
              <p className="border  font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              {item}
            </p>
            )
          })}
            {/* <p className="border  font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              128 GB
            </p>
            <p className="border font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              Black
            </p>
            <p className="border  font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              At&T
            </p> */}
          </div>
        </div>
      </div>
      <div className="flex  flex-wrap  gap-8">
        <div>
          <p>BUYERS NAME</p>
          <p className="text-[#000000] pt-3  font-bold">{item?.Buyer}</p>
        </div>
        <div>
          <p>PHONE NO</p>
          <p className="text-[#000000] pt-3  font-bold"> {item?.receipt?.phone}</p>
        </div>
        <div>
          <p>EMAIL</p>
          <p className="text-[#000000] pt-3 font-bold">{item?.buyer?.email}</p>
        </div>
        <div>
          <p>SHIPPING ADDRESS</p>
          <p className="text-[#000000]  font-bold pt-3">
            {item?.receipt?.address}
          </p>
        </div>
      </div>
      <div className="flex mt-4  gap-8">
        <div>
          <p>TRACKING ID</p>
          <p className="text-[#000000] pt-3 font-bold">{item?.trackingid}</p>
        </div>
        <div>
          <p>ORDER NO</p>
          <p className="text-[#000000] pt-3  font-bold">{item["Order No"]}</p>
        </div>
      </div>
      {item?.receipt_fees?.length>0 ?
      item?.receipt_fees?.map((item:any)=>{
        return(
          <>
          <div className=" flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">{item?.title}</p>
        <p className="font-bold text-[#000000] text-[20px]">${item?.fees}</p>
      </div>
          </>
        )
      }):
<>
<div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Shipping Fee</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Market Place Fee</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Processing Fee</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Sales Tax</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Protection Plan</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Discount</p>
        <p className="font-bold text-[#000000] text-[20px]">$0</p>
      </div>
</>
      }
      
      <div className="flex items-center justify-between  mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Purchase Price</p>
        <p className="font-bold text-[#3C82D6] text-[20px]">${item?.saleprice}</p>
      </div>
      
        </div>
        {/* <ReactToPrint
        trigger={() => <CustomButton
          iconLeft={<img src={IMAGES.downloadreceipt}/>}
          classes='!w-auto !max-w-[220px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px] mx-8 mt-3'
          txt="Download Receipt"
          />}
        content={() => Receiptref.current}
        /> */}
        <CustomButton
        onClick={DownloadPdf}
          iconLeft={<img src={IMAGES.downloadreceipt}/>}
          classes='!w-auto !max-w-[220px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px] mx-8 mt-3'
          txt="Download Receipt"
          editIcon={Load && 
            <div className=" flex justify-start items-center overflow-y-hidden">
            <ProgressSpinner  style={{overflow:"hidden",width:"20px",height:"20px"}} />
            </div>
          }
          />
    </CustomDialog>
  );
};
