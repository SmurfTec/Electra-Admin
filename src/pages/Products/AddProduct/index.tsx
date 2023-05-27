import { Header, Variants } from "../../../components";
import {
  InputTxt,
  CustomDropdown,
  CustomButton,
  UploadPicture,
  FetchButton,
} from "../../../atoms";
export const AddProduct = () => {
  const VariantsArray = [
    {
      txt: "Capacity",
      classes:
        "!bg-[#FCE39C] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "64 GB",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "128 GB",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5 ",
    },
    {
      txt: "256 GB",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "512 GB",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
  ];
  const VariantsArray2 = [
    {
      txt: "Colors",
      classes: "!bg-[#3C82D6] !w-[148px]  !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "Blue",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "Black",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5 ",
    },
    {
      txt: "White",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "Purple",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
  ];
  const VariantsArray3 = [
    {
      txt: "Carriers",
      classes: " !w-[148px]  !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "At & T",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "Verizon",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5 ",
    },
    {
      txt: "Factory Unlocked",
      classes:
        "!bg-[#FCFCFC] !w-[162px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "T-Mobile",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
  ];
  return (
    <div>
      <Header
        chooseDate={false}
        title="Add new Product"
        semiTitle="Add new products for availability on website"
      />
      <InputTxt
        placeholder="Enter Phone model"
        MainClasses="mt-[40px] !w-[80%]"
      />
      <div className="flex gap-4">
        <CustomDropdown placeholder="Phone" mainclasses={"mt-10 "} />
        <InputTxt
          placeholder="Brand"
          MainClasses="mt-[40px] !border !border-custom "
        />
        <InputTxt
          placeholder="Model"
          MainClasses="mt-[40px] !border !border-custom"
        />
      </div>
      <textarea className=" bg-lightgray border border-custom mt-4 rounded-[8px] w-[75%] h-[142px] overflow-hidden pl-[21px] pr-[22px] focus:outline-none" />
      <div>
        <CustomButton
          txt={"Variants"}
          classes={
            "!w-[100px] !h-[40px] !mt-6 !mb-4 !rounded-[12px] !bg-[#EFEFEF] !text-[black]"
          }
        />
        <div className="flex">
          <Variants data={VariantsArray} />
          <CustomButton
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
        <div className="flex">
          <Variants data={VariantsArray2} />
          <CustomButton
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
        <div className="flex">
          <Variants data={VariantsArray3} />
          <CustomButton
            txt={"+Add text"}
            classes={"!w-[148px] !mt-5 !rounded-[9px]  "}
          />
        </div>
      </div>
      <div>
        <CustomButton
          txt={"Pictures"}
          classes={
            "!w-[100px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black]"
          }
        />
        <UploadPicture />
        <CustomButton
          txt={"Technical Specifications"}
          classes={
            "!w-[220px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black] !px-2 "
          }
        />
        <div className="flex gap-3 mt-5">
          <FetchButton txt={"Fetch from Database"} />
          <FetchButton txt={"Enter Manually"} />
        </div>
        <CustomButton
          txt={"Search Item"}
          classes={
            "!w-[220px] !h-[55px] !mt-6 !rounded-[12px] !bg-[#3C82D6] !text-[white] !px-2 "
          }
          icon={true}
        />
        <div>
          <p className="bg-lightgray p-4 w-[60%] rounded mt-5 border border-custom">
            Technical Specifiactions for <b>iphone 14 pro max</b> was selected
            via 3rd party. Click on search to replace
          </p>
        </div>
        <div className="mb-5">
          <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
            Technical Specifications
          </p>

          <div className="border border-custom  w-[60%] pb-4">
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">RELEASE DATE</p>
              <p className="font-medium"> 20 aug, 2022</p>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">BLUETOOTH</p>
              <p className="font-medium"> 5.0 </p>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">BATTERY</p>
              <p className="font-medium"> Up to 28 hours of video playback </p>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">STORAGE</p>
              <p className="font-medium"> 128 GB - 256GB - 512 GB </p>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">CAMERA</p>
              <p className="font-medium">
                {" "}
                Triple 12MP Ultra Wide, Wide, and Telephoto cameras with Night
                mode, Deep Fusion, and ProRes video recording
              </p>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4">cONNECTIVITY</p>
              <li className="font-medium"> 5G capable </li>
              <li className="font-medium"> Wi-Fi 6 (802.11ax) with MIMO</li>
              <li className="font-medium"> Bluetooth 5.0 </li>
            </div>
            <div className="ml-5">
              <p className="text-[#656565] text-[12px] mt-4"> SCREEN </p>
              <p className="font-medium">
                {" "}
                6.1-inch and 6.7-inch Super Retina XDR display{" "}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
