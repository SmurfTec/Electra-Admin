import IMAGES from "../../../assets/Images";
import { CustomButton } from "../../../atoms";
import { CustomDialog } from "../../../atoms/global.style";
export const Receiptmodal = ({ visible, setVisible }: any) => {
  return (
    <CustomDialog

      className={`bg-[#FFFFFF] w-[583px]  flex  justify-center align-middle items-center `}
      visible={visible}
      rounded={`0px`}
    >
      <div     style={{height:"890px !important"}}>

      <div className="flex items-center justify-between px-8 py-5 border-b border-custom overflow-hidden">
        <p className="ali">Receipt For Order</p>

        <i
          className="pi pi-times absolute right-4 top-6 cursor-pointer"
          onClick={() => setVisible(false)}
        ></i>
      </div>
      <div className="flex gap-3 py-4 px-8">
        <div className="bg-[#F5F5F5] h-[75px] w-[93px] flex justify-center items-center">
          <img className="h-12" src={IMAGES.Iphone22} />
        </div>
        <div>
          <p className="font-bold text-[20px] text-[#111111]">
            Iphone 14 Pro Max
          </p>
          <div className="flex mt-2 gap-5">
            <p className="border  font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              128 GB
            </p>
            <p className="border font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              Black
            </p>
            <p className="border  font-bold border-[#000000] w-[93px] text-[#000000] text-center rounded-[26px]">
              At&T
            </p>
          </div>
        </div>
      </div>
      <div className="flex  flex-wrap px-8 gap-8">
        <div>
          <p>BUYERS NAME</p>
          <p className="text-[#000000] pt-3  font-bold">Huzayafah Hanif</p>
        </div>
        <div>
          <p>PHONE NO</p>
          <p className="text-[#000000] pt-3  font-bold">2554242542</p>
        </div>
        <div>
          <p>EMAIL</p>
          <p className="text-[#000000] pt-3 font-bold">Huz@gmail.com</p>
        </div>
        <div>
          <p>SHIPPING ADDRESS</p>
          <p className="text-[#000000]  font-bold pt-3">
            Mr John Smith. 132, My Street, Kingston, New York 12401. United
            States Of America
          </p>
        </div>
      </div>
      <div className="flex mt-4 px-8 gap-8">
        <div>
          <p>TRACKING ID</p>
          <p className="text-[#000000] pt-3 font-bold">2554242542</p>
        </div>
        <div>
          <p>ORDER NO</p>
          <p className="text-[#000000] pt-3  font-bold">3456</p>
        </div>
      </div>
      <div className="flex items-center justify-between px-8 mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div>
      <div className="flex items-center justify-between px-8 mt-3 gap-3 mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div>
      <div className="flex items-center justify-between px-8 mt-3 gap-3  mx-3">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div> <div className="flex items-center justify-between px-8 mt-3 gap-3 mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div> <div className="flex items-center justify-between px-8 mt-3 gap-3  mx-3">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div> <div className="flex items-center justify-between px-8 mt-3 gap-3  mx-3">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div> <div className="flex items-center justify-between px-8 mt-3 gap-3  mx-3">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div> <div className="flex items-center justify-between px-8 mt-3 gap-3 mx-3  ">
        <p className="font-bold text-[#000000] text-[16px]">Item Price</p>
        <p className="font-bold text-[#000000] text-[20px]">$437</p>
      </div>
      <div className="flex items-center justify-between px-8 mt-3 gap-3 pt-3  border-t border-dashed mx-3 ">
        <p className="font-bold text-[#000000] text-[16px]">Purchase Price</p>
        <p className="font-bold text-[#3C82D6] text-[20px]">$437</p>
      </div>
      <CustomButton
        iconLeft={<img src={IMAGES.downloadreceipt}/>}
        classes='!w-auto !max-w-[220px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px] mx-8 mt-3'
        txt="Download Receipt"
        />
        </div>
    </CustomDialog>
  );
};
