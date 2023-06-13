import React from "react";
import { Header, Variants, Carouselcard } from "../../../components";
import { Sidebar } from "primereact/sidebar";
import {
  RoundedButton,
  CustomButton,
  CustomTableComponent,
  InputTxt,
  Miniselect,
} from "../../../atoms";
import IMAGES from "../../../assets/Images";
import styled from "styled-components";
import "./index.css"
const CustomSidebar = styled(Sidebar)`
  .p-sidebar-header {
    display: none;
  }
  .p-sidebar-content {
    padding: 0;
  }
`;
export const Listingdetail = () => {
  const [select, setSelect] = React.useState(0);
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
  ];
  const data = [
    {
      "Listed by": "John Adam",
      Ask: "$1000",
      "Lowest Offer": "$1000",
      "Highest Offer": "$1000",
      Status: "Sold",
      "Sale Price": "$1000",
    },
  ];
  const columnData = [
    { field: "Listed by", header: "Listed by" },
    { field: "Ask", header: "Ask" },
    { field: "Lowest Offer", header: "Lowest Offer" },
    { field: "Highest Offer", header: "Highest Offer" },
    { field: "Status", header: "Status" },
    { field: "Sale Price", header: "Sale Price" },
  ];
  return (
    <div>
      <Header title="Viewing List item Detail" UserBox={true} />
      <CustomSidebar
        visible={select === 1 ? true : false}
        position="right"
        onHide={() => setSelect(0)}
        className="!w-[40rem]"
      >
        <h2 className="font-bold text-[#000000] p-4 text-[19px] mt-3 px-4 w-full">
          Details from seller
        </h2>
        <div className="border border-custom"></div>
        <InputTxt placeholder="Filter details" MainClasses="mt-[40px] ml-4" />
        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4" >
          What accessories are included?
        </p>
        <div className="flex gap-3  border-b border-custom pb-6 mt-3 px-4">
          <Miniselect txt={"Charger Cable"} />
          <Miniselect txt={"Original Box"} />
        </div>
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4" >
          Has your item ever been repaired before?
        </p>
        <p className="text-[15px] leading-6 border-b border-custom pb-6 px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          tincidunt elit. Nunc euismod odio sit amet lorem lobortis, vel lacinia
          libero tristique. Nunc porttitor arcu accumsan,
        </p>
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4">
          What best describes overall condition of your item?
        </p>
        <ul className="list-tick border-b border-custom">
          <li className="list-element">
            Device has signs of heavy use such as deep scratches, dents, scuffs,
            or excessive scratching
          </li>
          <li className="list-element">
            Device has signs of heavy use such as deep scratches, dents, scuffs,
            or excessive scratching
          </li>
          <li className="list-element">
            Device has signs of heavy use such as deep scratches, dents, scuffs,
            or excessive scratching
          </li>
          <li className="list-element">
            Device has signs of heavy use such as deep scratches, dents, scuffs,
            or excessive scratching
          </li>{" "}
          <li className="list-element">
            Device has signs of heavy use such as deep scratches, dents, scuffs,
            or excessive scratching
          </li>
        </ul>
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4">
          Tell us more about your item?
        </p>
        <p className="text-[#656565] px-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam ac
          tincidunt elit. Nunc euismod odio sit amet lorem lobortis, vel lacinia
          libero tristique. Nunc porttitor arcu accumsan,
        </p>
      </CustomSidebar>
      <CustomSidebar
        visible={select === 2 ? true : false}
        position="right"
        onHide={() => setSelect(0)}
        className="!w-[40rem]"
      >
        <h2 className="font-bold text-[#000000] p-4  text-[19px] mt-2 px-4  pb-2 w-full">
          Technical Specification
        </h2>
        <div className="border border-custom"></div>
        <InputTxt
          placeholder="Filter Specification"
          MainClasses="mt-[40px] ml-4"
        />
        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4 ">MPN</p>
        <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
          535MWRL4355
        </p>
        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4">
          Storage
        </p>
        <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
          128 GB
        </p>

        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4">
          Model No
        </p>
        <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
          43GG
        </p>

        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4">
          Release Date
        </p>
        <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
          20 Aug 2022
        </p>
        <p className="font-bold text-[20px] text-[#000000] mt-6 px-4">RAM</p>
        <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
          8GB
        </p>
      </CustomSidebar>
      <div>
        <div className="flex">
          <div className="flex gap-5 ">
            {/* <img src={IMAGES.IphoneView} /> */}
            <Carouselcard />
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-[36px] font-extrabold">IPHONE 14 PRO MAX</p>

                <RoundedButton icon={IMAGES.Bin} classes={"bg-[#FF0000]"} />
              </div>
              <div className="flex mt-3">
                <p
                  onClick={() => {
                    setSelect(0);
                  }}
                  className={`${
                    select === 0
                      ? "bg-black text-white "
                      : "bg-white text-black "
                  } cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}
                >
                  Used
                </p>
                <p
                  onClick={() => {
                    setSelect(1);
                  }}
                  className={`${
                    select === 1
                      ? "bg-black text-white "
                      : "bg-white text-black "
                  } cursor-pointer text-center rounded-2xl w-[255px] h-[37px] flex items-center justify-center`}
                >
                  View Technical Specifications
                </p>
                <p
                  onClick={() => {
                    setSelect(2);
                  }}
                  className={`${
                    select === 2
                      ? "bg-black text-white "
                      : "bg-white text-black "
                  } cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}
                >
                  Detail from seller
                </p>
              </div>
              <div>
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
                    <p className="font-medium text-[14px] text-[#212121]">
                      phone
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={"Brand"}
                      classes={
                        "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                      }
                    />
                    <p className="font-medium text-[14px] text-[#212121]">
                      Apple
                    </p>
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
                    <p className="font-medium text-[14px] text-[#212121]">
                      4FG334
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* PRODUCT VARAINTSS */}

        <div>
          <h1 className="text-[24px] font-bold my-3">Product Variants</h1>
          <Variants data={VariantsArray} />
          <Variants data={VariantsArray2} />
          <Variants data={VariantsArray3} />
        </div>

        <div className="text-[24px] font-bold my-6 w-[90%]">
          <p className="font-bold">Other Details</p>
          <CustomTableComponent
            showlines={true}
            headerStyle={{
              color: "black",
              background: "#E8E8E8",
              font: "bold",
            }}
            filterData={data}
            columnData={columnData}
          />
        </div>
      </div>
    </div>
  );
};
