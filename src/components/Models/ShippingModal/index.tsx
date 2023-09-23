import IMAGES from '../../../assets/Images';
import { CustomDialog } from '../../../atoms/global.style';
import { CustomButton } from '../../../atoms';
export const ShippingModal = ({ onHide, visible, setVisible }: any) => {
  return (
    <CustomDialog
      onHide={onHide}
      className={`bg-[#FFFFFF] w-[598px] h-[666px] flex  justify-center align-middle items-center overflow-hidden `}
      visible={visible}
      rounded={'0px'}
    >
      <div className="flex items-center justify-between px-8 py-5 border-b border-custom">
        <p className="ali">Shipping Label</p>

        <i
          className="pi pi-times absolute right-4 top-6 cursor-pointer"
          onClick={() => setVisible(false)}
        ></i>
      </div>
      <div className="border-2 w-[30rem] mt-4 mx-auto h-[29rem]">
        <div className="flex border-b">
          <p className="text-[32px] text-[#000000] pl-2 font-bold border-r h-[8rem] w-[8rem]">
            LOGO
          </p>
          <div className="flex py-2 px-4 gap-2">
            <p className="font-bold text-[#000]">To :</p>
            <p className="text-[#000] font-semibold">
              Name <br />
              Address
            </p>
          </div>
        </div>
        <div className="p-4 text-[#000] border-b ">
          <p>
            <span className="font-bold">From: </span>
            <b>Company Name</b>
            ,City,Zip,State
          </p>
        </div>
        <div className="flex border-b">
          <div className="p-4 w-[50%] border-r">
            <p className="font-bold text-[#000000]">Item Name</p>
            <p className="text-[#000000] font-semibold">Iphone 13 pro max</p>
          </div>
          <div className="p-4 w-[50%] ">
            <p className="font-bold text-[#000000]">Ship Date</p>
            <p className="text-[#000000] font-semibold">Iphone 13 pro max</p>
          </div>
        </div>
        <div className="flex border-b">
          <div className="p-4 w-[50%] border-r">
            <p className="font-bold text-[#000000]">Order No</p>
            <p className="text-[#000000] font-semibold">3422525</p>
          </div>
          <div className="p-4 w-[50%] ">
            <p className="font-bold text-[#000000]">Weight</p>
            <p className="text-[#000000] font-semibold">450 grams</p>
          </div>
        </div>
        <div className="flex justify-between p-4">
          <img src={IMAGES.Umbrella} />
          <img src={IMAGES.Barcode} />
        </div>
      </div>
      <div className="flex mx-10 gap-3 justify-between items-center">
        <div className="flex gap-3">
          <CustomButton
            iconLeft={<img src={IMAGES.downloadreceipt} />}
            classes="!w-auto !max-w-[190px] !mt-7 !px-4 !h-[43px] !text-[13px] !rounded-[8px]  "
            txt="Download Receipt"
          />
          <CustomButton
            iconLeft={<img src={IMAGES.Printer} />}
            classes="!w-auto !max-w-[100px] !mt-7 !px-4 !h-[43px] !text-[13px] !rounded-[8px]  !bg-[#3C82D6] "
            txt="Print"
          />
        </div>
        <div className="flex justify-between items-center gap-1">
          <img src={IMAGES.Receipt} className="mt-7" />
          <p className="text-[#000000] font-bold mt-7">View Receipt</p>
        </div>
      </div>
    </CustomDialog>
  );
};
