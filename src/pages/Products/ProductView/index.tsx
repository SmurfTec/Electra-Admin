import React from "react";
import IMAGES from "../../../assets/Images";
import { RoundedButton, CustomButton } from "../../../atoms";
import { DashCard, Variants } from "../../../components";
import "./index.css";
export const ProductView = () => {
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
        "!bg-[#FCFCFC] !w-[188px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
    {
      txt: "T-Mobile",
      classes:
        "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
    },
  ];
  return (
    <div>
      <div className="flex gap-11">
        <div>
          <img src={IMAGES.IphoneView} />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-[36px] font-extrabold">IPHONE 14 PRO MAX</p>
            <RoundedButton icon={IMAGES.Pen} classes={"bg-[#212121]"} />
            <RoundedButton icon={IMAGES.Bin} classes={"bg-[#FF0000]"} />
          </div>
          <div className="mt-3">
            <p className="bg-[#FCFCFC] text-center rounded-2xl w-[295px] h-[37px] flex items-center justify-center">
              View Technical Specifications
            </p>
            <CustomButton
              txt={"Description"}
              classes={
                "!bg-[#FCE39C] !w-[98px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
              }
            />
            <div className="mt-5">
              <ul className="list-tick">
                <li>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                </li>
                <li>Lorem ipsum dolor sit amet,</li>
                <li>Mauris id lacus gravida erat rutrum facilisis.</li>
                <li>Sed et quam pretium, laoreet metus sed,</li>
              </ul>
            </div>
            <div className="flex gap-8">
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Category"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">phone</p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Brand"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">Apple</p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Addedon"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[2px] !text-[black] !p-4 !rounded-[7px] !mt-5 !text-[15px] "
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">
                  20 Aug, 2022
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Listings"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">24</p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"ModelNo"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">4FG334</p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Availability"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <label className="switch">
                  <input type="checkbox" className="toggle-input" />
                  <span className="slider"></span>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* PRODUCT  VARIATNNSSSSS */}
      <div>
        <h1 className="text-[24px] font-bold my-3">Product Variants</h1>
        <Variants data={VariantsArray} />
        <Variants data={VariantsArray2} />
        <Variants data={VariantsArray3} />
      </div>
      <div>
        <h1 className="text-[24px] font-bold my-3">Statistics</h1>
        <div className="flex gap-3">
          <DashCard
            title={"Products Sold"}
            totalNumber={"3500"}
            myImg={IMAGES.box}
            imgColor={"bg-yellow-dash"}
            textDash={"bg-custom-blue"}
            textColor={"#3C82D6"}
            arrowImg={IMAGES.uparrow}
          />
          <DashCard
            title={"Products Sold"}
            totalNumber={"3500"}
            myImg={IMAGES.Tag}
            imgColor={"bg-yellow-dash"}
            textDash={"bg-custom-blue"}
            textColor={"#3C82D6"}
            arrowImg={IMAGES.uparrow}
          />
          <DashCard
            title={"Price Premium"}
            totalNumber={"$500"}
            myImg={IMAGES.dollar}
            imgColor={"bg-[#8CB869]"}
            textDash={"bg-custom-blue"}
            textColor={"#3C82D6"}
            arrowImg={IMAGES.uparrow}
          />
          <DashCard
            title={"No Of Sales"}
            totalNumber={"3500"}
            myImg={IMAGES.WhiteBox}
            imgColor={"bg-[#3E3E3E]"}
            textDash={"bg-custom-red"}
            textColor={"#FF0000"}
            arrowImg={IMAGES.downarrow}
            active={true}
          />
        </div>
      </div>
    </div>
  );
};
