import IMAGES from "../../../assets/Images";
import { RoundedButton, CustomButton } from "../../../atoms";
import { DashCard, Variants, Header } from "../../../components";
import "./index.css";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { getProductById } from "../../../store/Slices/ProductSlice";
import { useEffect, useState } from "react";
import { useProductDetail, useVariantDetail } from "../../../custom-hooks";
import moment from "moment";
import { BaseURL } from "../../../config";
export const ProductView = () => {
  const params = useParams();
  let { id } = params;
  const navigate = useNavigate();
  const ProductData = useProductDetail(id);

  const [VariantsArray, setVariantArray] = useState([]);

  useEffect(() => {
    getProductById(id);
  }, []);
  useEffect(() => {
    if (ProductData) {
      const mappedData = ProductData?.product?.product_variants
        ? ProductData?.product?.product_variants.map((item: any) => {
            const { variant, values, value,background_color } = item;
            const options = values.map((value1: any) => ({
              txt: value1,
              classes:
                value === value1
                  ? "!bg-[#FCFCFC] !w-[148px] ml-2 !border !border-[#3C82D6] !text-[black] !p-4 !rounded-[9px] !mt-5"
                  : "!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5",
            }));

            return {
              variant: {
                txt: variant,
                classes:
                `!bg-[${background_color}]  !w-[148px]  !text-[white] !p-4 !rounded-[9px] !mt-5`,
              },
              values: options,
              };
          })
        : [];
      setVariantArray(mappedData);
    }
  }, [ProductData]);
  return (
    <div>
      <Header title={"Product Details"} UserBox={true} />
      <div className="flex gap-11">
        <div
          onClick={() => {
            navigate("/AddProduct");
          }}
        >
          <img
            className="h-[390px]"
            src={`${BaseURL}${ProductData?.product?.images[0]?.filename}`}
          />
        </div>
        <div>
          <div className="flex gap-2 items-center">
            <p className="text-[36px] font-extrabold">
              {ProductData?.product?.title}
            </p>
            <RoundedButton icon={IMAGES.Pen} classes={"bg-[#212121]"} />
            <RoundedButton icon={IMAGES.Bin} classes={"bg-[#FF0000]"} />
          </div>
          <div className="mt-3">
            <p className="bg-[#FCFCFC] text-center rounded-2xl w-[295px] h-[37px] flex items-center justify-center">
              View Technical Specifications
            </p>
            <CustomButton
              txt={"description"}
              classes={
                "!bg-[#FCE39C]  !w-[97px] !h-[50px] !text-[black] !p-2 !rounded-[7px] !mt-5"
              }
            />
            <div className="mt-5">
              <p>
                {ProductData?.product.product_properties?.description}
              </p>
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
                  {ProductData?.product?.category.name}
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
                  {ProductData?.product?.brand?.title}
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
                  {moment(ProductData?.product?.created_on).format(
                    "DD-MMM-YYYY"
                  )}
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <CustomButton
                  txt={"Listings"}
                  classes={
                    "!bg-[#FCE39C] !w-[97px] !h-[27px] !text-[black] !p-4 !rounded-[7px] !mt-5"
                  }
                />
                <p className="font-medium text-[14px] text-[#212121]">
                  {" "}
                  {ProductData?.product?.product_properties?.listings}
                </p>
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
                  <input
                    type="checkbox"
                    checked={ProductData?.product.is_active ? true : false}
                    className="toggle-input"
                  />
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
        {VariantsArray.map((item: any, index) => {
          return (
            <div className="flex" key={index}>
              <CustomButton
                key={index}
                txt={item.variant.txt}
                classes={item.variant.classes}
              />
              <Variants data={item.values} />;
            </div>
          );
        })}
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
      <>
        <div className="mb-5">
          <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
            Technical Specifications
          </p>
          <>
            <div className="border border-custom  w-[60%] pb-4" >
              {ProductData?.product?.technical_specifications&&ProductData?.product?.technical_specifications.map(
                (item: any, index: any) => {
                  return (
                    <div className="ml-5" key={index}> 
                      <p className="text-[#656565] text-[12px] mt-4">
                       {item.title}
                      </p>
                      <p>{item.value}</p>
                    </div>
                  );
                }
              )}
            </div>
          </>
        </div>
      </>
    </div>
  );
};
