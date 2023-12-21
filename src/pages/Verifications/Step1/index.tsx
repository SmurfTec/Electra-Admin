import moment from 'moment';
import { Sidebar } from 'primereact/sidebar';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import styled from 'styled-components';
import IMAGES from '../../../assets/Images';
import {
  CustomButton,
  InputTxt,
  Miniselect,
  RoundedButton,
} from '../../../atoms';
import { Carouselcard, Header, Variants } from '../../../components';
import { BaseURL } from '../../../config';
import { getVerficationById } from '../../../store/Slices/VerificationSlice';
import '../../Listings/Listingdetail/index.css';
const CustomSidebar = styled(Sidebar)`
  .p-sidebar-header {
    display: none;
  }
  .p-sidebar-content {
    padding: 0;
  }
`;
export const Step1 = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [select, setSelect] = React.useState(0);
  const [ItemData, setItemData] = useState<any>();
  const [images, setImages] = useState([]);
  const VariantsArray = [
    {
      txt: 'Capacity',
      classes:
        '!bg-[#FCE39C] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
    },
    {
      txt: '64 GB',
      classes:
        '!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
    },
  ];
  const VariantsArray2 = [
    {
      txt: 'Colors',
      classes: '!bg-[#3C82D6] !w-[148px]  !p-4 !rounded-[9px] !mt-5',
    },
    {
      txt: 'Blue',
      classes:
        '!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
    },
  ];
  const VariantsArray3 = [
    {
      txt: 'Carriers',
      classes: ' !w-[148px]  !p-4 !rounded-[9px] !mt-5',
    },
    {
      txt: 'At & T',
      classes:
        '!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
    },
  ];
  const GetVerificationDetail = async () => {
    const response = await getVerficationById(id);
    const ImagesArr = response?.verification.product?.images?.map(
      (item: any, index: any) => {
        const newObj = {
          itemImageSrc: `${BaseURL}${item.filename}`,
          thumbnailImageSrc: `${BaseURL}${item.filename}`,
          alt: `Description for Image ${index}`,
          title: `Title ${index}`,
        };
        return newObj;
      }
    );
    setItemData(response.verification);
    setImages(ImagesArr);
  };
  useEffect(() => {
    GetVerificationDetail();
  }, []);

  console.log('ItemData', ItemData);

  return (
    <div>
      <Header title="Item Verification & Details" UserBox={true} />
      {ItemData?.listing && (
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
          <div className="px-5 py-4">
            <Carouselcard
              outerclasses={`!w-fit mx-auto mt-4`}
              Images={ItemData?.listing?.images?.map(
                (item: any, index: number) => ({
                  itemImageSrc: `${BaseURL}${item.filename}`,
                  thumbnailImageSrc: `${BaseURL}${item.filename}`,
                  alt: `Description for Image ${index}`,
                  title: `Title ${index}`,
                })
              )}
            />
            <div className="flex flex-wrap gap-x-12 gap-y-6 mt-4">
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Ask'}
                  classes={
                    '!bg-[#FCE39C] !w-fit !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.ask ? `$${ItemData?.listing?.ask}` : '-'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Condition'}
                  classes={
                    '!bg-[#FCE39C] !w-fit !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.condition}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Sale Price'}
                  classes={
                    '!bg-[#FCE39C] !w-fit !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.saleprice
                    ? `$${ItemData?.listing?.saleprice}`
                    : '-'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Is Active'}
                  classes={
                    '!bg-[#FCE39C] !w-[98px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.is_active?.toString()}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Is Repaired'}
                  classes={
                    '!bg-[#FCE39C] !w-fit !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.is_repaired_before || '-'}
                </p>
              </div>
              <div className="flex flex-col gap-3">
                <CustomButton
                  txt={'Condition Details'}
                  classes={
                    '!bg-[#FCE39C] !w-fit !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <p className="text-[16px] text-[#000000]">
                  {ItemData?.listing?.condition_details || '-'}
                </p>
              </div>
            </div>
          </div>
        </CustomSidebar>
      )}
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
        {ItemData?.product?.technical_specs ? (
          <>
            {ItemData?.product?.technical_specs?.map((item: any) => {
              return (
                <>
                  <p className="font-bold text-[20px] text-[#000000] mt-6 px-4 ">
                    {item.title}
                  </p>
                  <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
                    {item.title.toLowerCase().includes('date')
                      ? moment(item.value).format('DD,MM,YYYY')
                      : item.value}
                  </p>
                </>
              );
            })}
          </>
        ) : (
          <>
            <p className="font-bold text-[20px] text-[#000000] mt-6 px-4 ">
              MPN
            </p>
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
            <p className="font-bold text-[20px] text-[#000000] mt-6 px-4">
              RAM
            </p>
            <p className="text-[15px] pt-2 text-[#656565] border-b border-custom pb-6 px-4">
              8GB
            </p>
          </>
        )}
      </CustomSidebar>
      <div>
        <div className="flex">
          <div className="flex gap-1 ">
            <Carouselcard outerclasses={`!w-[420px]`} Images={images} />
            <div>
              <div className="flex gap-2 items-center">
                <p className="text-[36px] font-extrabold">
                  {ItemData?.product?.title}
                </p>
              </div>
              <div className="flex mt-3">
                <p
                  onClick={() => {
                    setSelect(0);
                  }}
                  className={`${
                    select === 0
                      ? 'bg-black text-white '
                      : 'bg-white text-black '
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
                      ? 'bg-black text-white '
                      : 'bg-white text-black '
                  } cursor-pointer text-center rounded-2xl w-[255px] h-[37px] flex items-center justify-center`}
                >
                  View Technical Specifications
                </p>
                {ItemData?.listing && (
                  <p
                    onClick={() => {
                      setSelect(1);
                    }}
                    className={`${
                      select === 1
                        ? 'bg-black text-white '
                        : 'bg-white text-black '
                    } cursor-pointer text-center rounded-2xl w-[155px] h-[37px] flex items-center justify-center`}
                  >
                    Detail from seller
                  </p>
                )}
              </div>
              <div>
                <CustomButton
                  txt={'Description'}
                  classes={
                    '!bg-[#FCE39C] !w-[98px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                  }
                />
                <div className="mt-5 max-w-[55rem]">
                  <ul className="list-tick">
                    <li>{ItemData?.product?.description}</li>
                  </ul>
                </div>
                <div className="flex gap-8">
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={'Category'}
                      classes={
                        '!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                      }
                    />
                    <p className="font-medium text-[14px] text-[#212121]">
                      {ItemData?.product?.category}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={'Brand'}
                      classes={
                        '!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                      }
                    />
                    <p className="font-medium text-[14px] text-[#212121]">
                      {ItemData?.product?.brand}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={'Addedon'}
                      classes={
                        '!bg-[#FCE39C] !w-[97px] !h-[2px] !text-[black] !p-4 !rounded-[7px] !mt-5 !text-[15px] '
                      }
                    />
                    <p className="font-medium text-[14px] text-[#212121]">
                      {moment(ItemData?.product?.created_on).format(
                        'DD,MM,YYYY'
                      )}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={'Listings'}
                      classes={
                        '!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
                      }
                    />
                    <p className="font-medium text-[14px] text-[#212121]">
                      {ItemData?.product?.listings}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <CustomButton
                      txt={'ModelNo'}
                      classes={
                        '!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5'
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
        <div className="flex items-start gap-7 mt-8">
          <div>
            <h1 className="text-[24px] font-bold ">Product Variants</h1>
            {ItemData?.product?.variants?.map((item: any, index: any) => {
              const arr = [
                {
                  txt: item.variant,
                  classes: `!w-[148px]  !p-4 !rounded-[9px] !mt-5 !text-[${item.color}] !bg-[${item.background_color}]`,
                },
                {
                  txt: item.value,
                  classes:
                    '!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
                },
              ];
              return (
                <React.Fragment key={index}>
                  <Variants data={arr} />
                </React.Fragment>
              );
            })}
            {/* <Variants data={VariantsArray} />
            <Variants data={VariantsArray2} />
            <Variants data={VariantsArray3} /> */}
          </div>
          <div>
            <h1 className="text-[24px] font-bold ">Seller and Buyer Details</h1>
            <div className="flex gap-4">
              <div className="border-custom rounded border w-[380px]  mt-3">
                <p className="text-[19px] font-semibold p-3">
                  Seller's Details
                </p>
                <div className="border-t  border-custom">
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">NAME</p>
                    <p className="font-semibold">
                      {ItemData?.seller?.firstname +
                        ' ' +
                        ItemData?.seller?.lastname}
                    </p>
                  </div>
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">EMAIL</p>
                    <p className="font-semibold">{ItemData?.seller?.email}</p>
                  </div>
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">PHONE NO</p>
                    <p className="font-semibold">{ItemData?.seller?.phone}</p>
                  </div>
                </div>
              </div>
              <div className="border-custom rounded border w-[380px]  mt-3">
                <p className="text-[19px] font-semibold p-3">Buyer's Details</p>
                <div className="border-t  border-custom">
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">NAME</p>
                    <p className="font-semibold">
                      {ItemData?.buyer?.firstname +
                        ' ' +
                        ItemData?.buyer?.lastname}
                    </p>
                  </div>
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">EMAIL</p>
                    <p className="font-semibold">{ItemData?.buyer?.email}</p>
                  </div>
                  <div className=" p-3 gap-3">
                    <p className="font-semibold">PHONE NO</p>
                    <p className="font-semibold">{ItemData?.buyer?.phone}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/*Reciept  */}
        <div className="mb-4">
          <h1 className="text-[24px] font-bold my-3">Receipt</h1>
          <div className="flex gap-9">
            <div className="border w-[547px] border-custom p-4 rounded">
              <div className="flex items-center justify-between gap-3 border-b border-dotted">
                <p className="font-semibold text-[12px]">Item Price</p>
                <p className="font-semibold text-[20px]">
                  ${ItemData?.receipt?.item_price}
                </p>
              </div>
              {ItemData?.receipt_fees?.length ? (
                <>
                  {ItemData?.receipt_fees?.map((item: any) => {
                    return (
                      <>
                        <div className="flex items-center mt-5 justify-between gap-3 ">
                          <p className="font-semibold text-[12px]">
                            {item?.title}
                          </p>
                          <p className="font-semibold text-[20px]">
                            $ {item?.fees}
                          </p>
                        </div>
                      </>
                    );
                  })}
                </>
              ) : (
                <>
                  <div className="flex items-center mt-5 justify-between gap-3 ">
                    <p className="font-semibold text-[12px]">
                      MarketPlace Fee (7.5%)
                    </p>
                    <p className="font-semibold text-[20px]">$0</p>
                  </div>
                  <div className="flex items-center mt-5 justify-between gap-3 ">
                    <p className="font-semibold text-[12px]">
                      SALES TAX (8.025%)
                    </p>
                    <p className="font-semibold text-[20px]">$0</p>
                  </div>
                  <div className="flex items-center mt-5 justify-between gap-3 ">
                    <p className="font-semibold text-[12px]">SHIPPING FEE</p>
                    <p className="font-semibold text-[20px]">$0</p>
                  </div>
                  <div className="flex items-center mt-5 justify-between gap-3 ">
                    <p className="font-semibold text-[12px]">PLATFORM FEE</p>
                    <p className="font-semibold text-[20px]">$0</p>
                  </div>
                  <div className="flex items-center mt-5 justify-between gap-3 ">
                    <p className="font-semibold text-[12px]">DISCOUNT</p>
                    <p className="font-semibold text-[20px]">%0</p>
                  </div>
                  <div className="flex items-center mt-5 justify-between gap-3 pb-3 border-b border-dotted ">
                    <p className="font-semibold text-[12px]">
                      13 MONTH PROTECTION PLAN
                    </p>
                    <p className="font-semibold text-[20px]">
                      ${ItemData?.receipt_fees[4]?.fees}
                    </p>
                  </div>
                </>
              )}

              <div className="flex items-center mt-5 justify-between gap-3 ">
                <p className="font-semibold text-[12px]">PURCHASE PRICE</p>
                <p className="font-semibold text-[20px] text-[#3C82D6]">
                  ${ItemData?.receipt?.purchase_price}
                </p>
              </div>
            </div>
            <div className="border w-[547px] border-custom p-6 rounded">
              <div className=" gap-4 flex-col">
                <p className="font-semibold text-[12px]">ORDER DATE</p>
                <p className="font-semibold text-[20px]">
                  {moment(ItemData?.created_on).format('DD,MM,YYYY')}
                </p>
              </div>
              <div className=" gap-4 flex-col my-4">
                <p className="font-semibold text-[12px]">TRACKING ID</p>
                <p className="font-semibold text-[20px] text-[#3C82D6]">
                  {ItemData?.order?.trackingid}
                </p>
              </div>
              <div className=" gap-4 flex-col my-4">
                <p className="font-semibold text-[12px]">ORDER NO</p>
                <p className="font-semibold text-[20px]  text-[#3C82D6]">
                  {ItemData?.order?.id}
                </p>
              </div>
              <div className=" gap-5 flex-col my-4">
                <p className="font-semibold text-[12px] mb-3">
                  SHIPPING ADDRESS
                </p>
                <p className="font-semibold text-[15px]">
                  {ItemData?.receipt?.address}
                </p>
              </div>
            </div>
          </div>
        </div>
        {/* Button */}
        {ItemData?.status === 'pending' && (
          <CustomButton
            onClick={() => {
              navigate(`/Verification/ItemVerification/${id}`);
            }}
            iconLeft={<img src={IMAGES.Verified} />}
            classes="!w-auto !mt-[30px] !max-w-[150px] !mb-[33px] !h-[43px] !text-[13px] !rounded-[8px] !bg-[#3C82D6]"
            txt="Verify"
          />
        )}
        {ItemData?.status === 'verified' && (
          <CustomButton
            iconLeft={<img src={IMAGES.Verified} />}
            classes="!w-auto !mt-[30px] !max-w-[150px]  !mb-[33px] !h-[43px] !text-[13px] !rounded-[8px] !bg-[#3CD670]"
            txt="Verified"
          />
        )}
        {ItemData?.status === 'rejected' && (
          <CustomButton
            classes="!w-auto !mt-[30px] !max-w-[150px]  !mb-[33px] !h-[43px] !text-[13px] !text-[black] !rounded-[8px] !bg-custom-pink"
            txt="Rejected"
          />
        )}
      </div>
    </div>
  );
};
