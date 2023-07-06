import React, { useEffect, useState } from "react";
import { Header, Variants, Carouselcard } from "../../../components";
import { Sidebar } from "primereact/sidebar";
import {
  RoundedButton,
  CustomButton,
  CustomTableComponent,
  InputTxt,
  Miniselect,
} from "../../../atoms";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import IMAGES from "../../../assets/Images";
import styled from "styled-components";
import "./index.css";
import { useListingById } from "../../../custom-hooks";
import { BaseURL } from "../../../config";
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
  const params = useParams();
  let { id } = params;
  const Listings = useListingById(id);
  const [listingg, setListing] = useState<any>();
  const [images, setImages] = useState([]);
  const [VariantsArray, setVariantArray] = useState([]);

  useEffect(() => {
    if (Listings) {
      console.log(Listings.listing)
      setListing(Listings);
      setImages(Listings.listing.images);
      const variaantts = Listings?.listing?.listing_variants?.map(
        (item: any, index: any) => {
          const { variant, values, value, background_color } = item;
          console.log(values,"ITEM")
          const options = values?.map((value1: any) => ({
            txt: value1,
            classes:
              value === value1
                ? "!bg-[#FCFCFC] !w-[148px] ml-2 !border !border-[#3C82D6] !text-[black] !p-4 !rounded-[9px] !mt-5"
                : "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
          }));
          return {
            variant: {
              txt: variant,
              classes: `!bg-[${background_color}]  !w-[148px]  !text-[white] !p-4 !rounded-[9px] !mt-5`,
            },
            values: options??[],
          };
        }
      );
      console.log(variaantts)
      setVariantArray(variaantts);
    }
  }, [Listings]);

  const data = [
    {
      "Listed by": listingg?.listing?.user[0]?.firstname,
      Ask: `$ ${listingg?.listing.ask}`,
      "Lowest Offer": listingg?.listing.lowest_offer ?? "-",
      "Highest Offer": listingg?.listing.highest_offer ?? "-",
      Status: listingg?.listing.is_active ? "Unsold" : "Sold",
      "Sale Price": listingg?.listing.saleprice ?? "-",
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
       
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4">
          Has your item ever been repaired before?
        </p>
        <p className="text-[15px] leading-6 border-b border-custom pb-6 px-4">
          {listingg?.listing?.explain_repair ?? "-"}
        </p>
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4">
          What best describes overall condition of your item?
        </p>
        <p className="px-4">{listingg?.listing?.condition_details}</p>
        <p className="font-bold text-[20px] text-[#000000] mt-4 px-4">
          Tell us more about your item?
        </p>
        <p className="text-[#656565] px-4">{listingg?.listing?.more_info}</p>
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

        {listingg?.listing?.technical_specifications.map(
          (item: any, index: any) => {
            return (
              <>
                <p
                  className="font-bold text-[20px] text-[#000000] mt-6 px-4 "
                  key={index}
                >
                  {item.title}
                </p>
                <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
                  {item.value}
                </p>
              </>
            );
          }
        )}
      </CustomSidebar>
      <div>
        <div className="flex">
          <div className="flex gap-5 ">
            {/* <img src={IMAGES.IphoneView} /> */}
            <Carouselcard
              Images={
                images &&
                images.map((item: any, index: any) => {
                  return {
                    itemImageSrc: `${BaseURL}/${item.filename}`,
                    thumbnailImageSrc: `${BaseURL}/${item.filename}`,
                    alt: "Description for Image 1",
                    title: "Title 1",
                  };
                })
              }
            />
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-[36px] font-extrabold">
                  {listingg?.listing.product.title}
                </p>

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
                    setSelect(2);
                  }}
                  className={`${
                    select === 2
                      ? "bg-black text-white "
                      : "bg-white text-black "
                  } cursor-pointer text-center rounded-2xl w-[255px] h-[37px] flex items-center justify-center`}
                >
                  View Technical Specifications
                </p>
                <p
                  onClick={() => {
                    setSelect(1);
                  }}
                  className={`${
                    select === 1
                      ? "bg-black text-white "
                      : "bg-white text-black "
                  } cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}
                >
                  Detail from seller
                </p>
              </div>
              <div>
                <CustomButton
                  txt={"description"}
                  classes={
                    "!bg-[#FCE39C]  !w-[97px] !h-[50px] !text-[black] !p-2 !rounded-[7px] !mt-5"
                  }
                />
                <div className="mt-5">
                  <p>{listingg?.listing?.more_info}</p>
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
                      {listingg?.listing?.category}
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
                      {listingg?.listing?.brand}
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
          {VariantsArray.map((item: any, index) => {
            return (
              <div className="flex" key={index}>
                <CustomButton
                  key={index}
                  txt={item.variant.txt}
                  classes={item.variant.classes}
                />
                <Variants data={item.values} />
              </div>
            );
          })}
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
