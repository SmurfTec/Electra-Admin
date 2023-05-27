import { Header, Variants } from "../../../components";
import { InputTxt, CustomDropdown, CustomButton,UploadPicture } from "../../../atoms";
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
        <CustomDropdown placeholder="Phone" mainclasses={"mt-10"} />
        <InputTxt
          placeholder="Brand"
          MainClasses="mt-[40px] !border-2 !border-[#FCFCFC] "
        />
        <InputTxt placeholder="Model" MainClasses="mt-[40px] " />
      </div>
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
      <CustomButton txt={"Pictures"} classes={"!w-[100px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black]"}/>
      <UploadPicture />
      <CustomButton txt={"Technical Specifications"} classes={"!w-[220px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black] !px-2 "}/>
      <CustomButton txt={"Search Item"} classes={"!w-[220px] !h-[55px] !mt-6 !rounded-[12px] !bg-[#3C82D6] !text-[white] !px-2 "}/>

      </div>
    </div>
  );
};
