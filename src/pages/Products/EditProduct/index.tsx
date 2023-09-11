import React, { useState, useEffect } from 'react';
import { getProductById } from '../../../store/Slices/ProductSlice';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import { Header, Variants, Confirmationmodal } from '../../../components';
import {
  InputTxt,
  CustomDropdown2,
  CustomButton,
  UploadPicture,
  FetchButton,
} from '../../../atoms';
import { useNavigate } from 'react-router-dom';
import { useVariantDetail, useProductDetail } from '../../../custom-hooks';
import url from '../../../config/index';
import { EditProductAPI } from '../../../store/Slices/ProductSlice';
import { getBrands } from '../../../store/Slices/BrandSlice';
import { getCategories } from '../../../store/Slices/Categories';
import { Techspec } from '../../../components';
import { CustomCalendar } from '../../../atoms';

export const EditProduct = () => {
  type techSpec = {
    title: string;
    value: string;
  };
  type variantSpec = {
    variant: string;
    value: string;
  };
  type descriptionProp = {
    description: string;
  };
  const params = useParams();
  let { id } = params;
  const { ProductData }: any = useProductDetail(id);
  const [visible, setVisible] = useState(false);
  const [fetchVariants, setFetchVariants] = useState(false);
  const [VariantsArray, setVariantArray] = useState<
    { variant: any; values: any }[]
  >([]);
  const [enterManual, setManual] = useState('Database');

  const [images, setImage] = useState<any>([]);
  const [attachments, setAttachment] = useState<any>([]);
  const [varVal, setVariantValue] = useState('');
  const [techType, setTechType] = useState(1);
  const [brands, setBrands] = useState([]);
  const [category, setCategories] = useState([]);
  const [productData, setProductData] = useState({
    title: '',
    is_active: true,
    category: '',
    brand: '',
    productProperties: {} as descriptionProp,
    productVariants: [] as variantSpec[],
    technicalSpecificationModel: [] as techSpec[],
  });
  const [variant, setVariant] = useState<any>({
    title: '',
    datatype: String,
    values: [],
    id: Number,
  });
  const navigate = useNavigate();
  const VariantsData = useVariantDetail(fetchVariants);
  const getAllBrands = async () => {
    let data = await getBrands();
    let dataCat = await getCategories();
    data = data.brands.map((item: any, index: any) => {
      let newObj = {
        value: item.id,
        label: item.title,
      };
      return newObj;
    });
    setBrands(data);
    console.log(data, 'BRANDSS');
    dataCat = dataCat.categories.map((item: any, index: any) => {
      let newObj = {
        value: item.id,
        label: item.name,
      };
      return newObj;
    });
    setCategories(dataCat);
  };
  useEffect(() => {
    if (ProductData) {
      console.log(ProductData, 'PRoduct');
      let newarr = ProductData.product?.images?.map((item: any, index: any) => {
        return item.id;
      });
      console.log(newarr);
      if (newarr) {
        setImage(newarr);
      }
      setProductData({
        title: ProductData.product?.title,
        is_active: true,
        category: ProductData.product?.category.id,
        brand: ProductData.product?.brand.id,
        productProperties: {
          description: ProductData.product?.product_properties.description,
        } as descriptionProp,
        productVariants:
          ProductData.product.product_variants &&
          (ProductData.product.product_variants?.map(
            (item: any, index: any) => {
              return {
                variant: item.id,
                value: item.value,
              };
            },
          ) as variantSpec[]),
        technicalSpecificationModel:
          ProductData.product.technical_specifications &&
          (ProductData.product.technical_specifications?.map(
            (item: any, index: any) => {
              return {
                title: item.title,
                value: item.value,
              };
            },
          ) as techSpec[]),
      });
    }
  }, [ProductData]);
  useEffect(() => {
    getAllBrands();
  }, []);
  useEffect(() => {
    if (VariantsData?.variants) {
      const mappedData = VariantsData?.variants.map((item: any) => {
        const { title, values, value, id, background_color } = item;

        const options = values.map((value1: any) => {
          const hasMatchingValue =
            ProductData?.product.product_variants &&
            ProductData?.product.product_variants.some(
              (item: any) => item.value === value1,
            );

          return {
            txt: value1,
            classes: hasMatchingValue
              ? '!bg-[#FCFCFC] !w-[148px] ml-2 !border !border-[#3C82D6] !text-[black] !p-4 !rounded-[9px] !mt-5'
              : '!bg-[#FCFCFC] !w-[148px] !text-[black] !p-4 !rounded-[9px] !mt-5',
          };
        });

        return {
          variant: {
            id: id,
            txt: title,
            classes: `!bg-[${background_color}]  !w-[148px]  !text-[white] !p-4 !rounded-[9px] !mt-5`,
          },
          values: options,
        };
      });
      setVariantArray(mappedData);
    }
  }, [VariantsData]);
  const handleFunction = async (value: any) => {
    let prevArray = variant.values;
    let Newpush = [...prevArray, value];
    let sendingData = {
      title: variant.title,
      datatype: 'string',
      values: Newpush,
    };
    const sendVariant = await url.put(`/variants/${variant.id}`, sendingData);
    if (sendVariant) {
      setVisible(!visible);
      VariantsData;
    }
    setFetchVariants(!fetchVariants);
  };
  const handleChange = (setState: any) => (event: any) => {
    setState({
      ...productData,
      [event.target.name]: event.target.value,
    });
  };
  const handleChangeDescription = (value: any) => {
    setProductData({
      ...productData,
      productProperties: {
        description: value,
      },
    });
  };
  const updateTechnicalSpecificationModel = (name: any, value: any) => {
    console.log(value, 'VALUUEE');
    setProductData(prevData => {
      const updatedModel = prevData.technicalSpecificationModel?.map(item => {
        if (item.title === name) {
          return { ...item, value: value };
        }
        return item;
      });

      if (!updatedModel.some(item => item.title === name)) {
        updatedModel.push({ title: name, value: value });
      }

      return { ...prevData, technicalSpecificationModel: updatedModel };
    });
  };
  const updateVariantData = (variant: any, value: any) => {
    let updateVariants: any = productData.productVariants;
    const updatedVariants = updateVariants.findIndex(
      (item: any) => item.value === value,
    );
    if (
      value !== 'capacity' &&
      value !== 'color' &&
      value !== 'carrier' &&
      value !== 'screen'
    ) {
      if (updatedVariants === -1) {
        updateVariants.push({ variant: variant, value: value });
        console.log(updateVariants, 'Variants');
        setProductData(prevData => {
          return { ...prevData, productVariants: updateVariants };
        });
        let newData = VariantsArray.map((item: any) => {
          const updatedValues = item.values.map((valueItem: any) => {
            if (value === valueItem.txt) {
              return {
                txt: valueItem.txt,
                classes:
                  '!bg-[#FCFCFC] !border !border-[#3C82D6] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
              };
            } else {
              return valueItem;
            }
          });

          return {
            variant: item.variant,
            values: updatedValues,
          };
        });
        setVariantArray(newData);
      } else {
        updateVariants = updateVariants.filter(
          (item: any) => item.value !== value,
        );
        setProductData(prevData => {
          return { ...prevData, productVariants: updateVariants };
        });
        let newData = VariantsArray.map((item: any) => {
          const updatedValues = item.values.map((valueItem: any) => {
            if (value === valueItem.txt) {
              return {
                txt: valueItem.txt,
                classes:
                  '!bg-[#FCFCFC]  !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
              };
            } else {
              return valueItem;
            }
          });

          return {
            variant: item.variant,
            values: updatedValues,
          };
        });
        setVariantArray(newData);
      }
    }
  };
  const Addproduct = async () => {
    console.log(productData, 'FINALs');
    console.log(images, 'IMAGe DATA');
    let data = new FormData();
    data.append('title', productData.title);
    data.append('is_active', 'true');
    data.append('brand', productData.brand);
    attachments.forEach((file: any, index: any) => {
      data.append('attachments', file);
    });

    data.append('category', productData.category);
    data.append(
      'productProperties[description]',
      productData.productProperties.description,
    );
    productData.productVariants.length > 0 &&
      productData.productVariants.map((item, index) => {
        data.append(`productVariants[${index}][variant]`, item.variant);
        data.append(`productVariants[${index}][value]`, item.value);
      });
    productData.technicalSpecificationModel.length > 0 &&
      productData.technicalSpecificationModel.map((item, index) => {
        data.append(`technicalSpecificationModel[${index}][title]`, item.title);
        data.append(`technicalSpecificationModel[${index}][value]`, item.value);
      });
    if (images) {
      images.forEach((item: any, index: any) => {
        data.append(`images[${index}]`, item);
      });
    }
    const add = await EditProductAPI(data, id);
    console.log(add, 'DATA Updated');
    if (add?.response?.status === 404) {
      console.log('ISSUE');
    } else {
      navigate('/Products');
    }
  };
  const getTechnicalSpecificationValue = (name: string) => {
    const item = productData.technicalSpecificationModel?.find(
      (spec: any) => spec.title === name,
    );

    return item ? item.value : '';
  };
  return (
    <div>
      <Header
        chooseDate={false}
        title="Edit new Product"
        semiTitle="Add new products for availability on website"
        UserBox={true}
      />
      <InputTxt
        onChange={handleChange(setProductData)}
        placeholder="Enter Phone model"
        MainClasses="mt-[40px] !w-[80%]"
        name={'title'}
        value={productData.title}
      />
      <div className="flex gap-4">
        <CustomDropdown2
          setValue={(value: any) => {
            setProductData({
              ...productData,
              category: value,
            });
          }}
          placeholder="Category"
          options={category}
          mainclasses={'mt-10  !w-[35%]'}
          value={productData.category}
        />
        <CustomDropdown2
          setValue={(value: any) => {
            setProductData({
              ...productData,
              brand: value,
            });
          }}
          placeholder="Brands"
          options={brands}
          mainclasses={'mt-10  !w-[35%]'}
          value={productData.brand}
        />
      </div>
      <textarea
        onChange={e => handleChangeDescription(e.target.value)}
        value={productData.productProperties.description}
        name={'description'}
        className="pt-2 bg-lightgray border border-custom mt-4 rounded-[8px] w-[75%] h-[142px] overflow-hidden pl-[21px] pr-[22px] focus:outline-none"
      />
      <div>
        <CustomButton
          txt={'Variants'}
          classes={
            '!w-[100px] !h-[40px] !mt-6 !mb-4 !rounded-[12px] !bg-[#EFEFEF] !text-[black]'
          }
        />
        {VariantsArray &&
          VariantsArray.map((item: any, index: any) => {
            return (
              <div className="flex gap-2" key={index}>
                <CustomButton
                  key={index}
                  txt={item.variant.txt}
                  classes={item.variant.classes}
                />

                <Variants
                  data={item.values}
                  handleFunction={(e: any) =>
                    updateVariantData(item.variant.id, e)
                  }
                />

                <CustomButton
                  onClick={() => {
                    let newVariant = item.values.map(
                      (item: any, index: any) => {
                        return item.txt;
                      },
                    );
                    setVariant({
                      ...variant,
                      title: item.variant.txt,
                      values: newVariant,
                      id: item.variant.id,
                    });
                    setVisible(!visible);
                  }}
                  txt={'+Add text'}
                  classes={'!w-[148px] !mt-5 !rounded-[9px]  '}
                />
              </div>
            );
          })}
      </div>
      <div>
        <CustomButton
          txt={'Pictures'}
          classes={
            '!w-[100px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black]'
          }
        />
        <UploadPicture
          setImages={(value: any) => {
            setAttachment(value);
          }}
          images={ProductData?.product?.images}
          IMAGEE={attachments}
          multipleImages={true}
          fetchImages={true}
        />
        <CustomButton
          txt={'Technical Specifications'}
          classes={
            '!w-[220px] !h-[40px] !mt-6 !rounded-[12px] !bg-[#EFEFEF] !text-[black] !px-2 '
          }
        />
        <div className="flex gap-3 mt-5">
          <FetchButton
            manual={enterManual}
            value={'Database'}
            setManual={setManual}
            txt={'Fetch from Database'}
          />
          {/* <FetchButton
            manual={enterManual}
            value={"manual"}
            setManual={setManual}
            txt={"Enter Manually"}
          /> */}
        </div>
        <CustomButton
          txt={'Search Item'}
          classes={
            '!w-[220px] !h-[55px] !mt-6 !rounded-[12px] !bg-[#3C82D6] !text-[white] !px-2 '
          }
          icon={true}
        />
        {enterManual === 'Database' && (
          <>
            <div>
              <p className="bg-lightgray p-4 w-[60%] rounded mt-5 border border-custom">
                Technical Specifiactions for <b>iphone 14 pro max</b> was
                selected via 3rd party. Click on search to replace
              </p>
            </div>
            <div className="mb-5">
              <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
                Technical Specifications
              </p>

              <div className="border border-custom  w-[60%] pb-4">
                {productData &&
                  productData.technicalSpecificationModel?.map(
                    (item: any, index: any) => {
                      return (
                        <div key={index} className="ml-5">
                          <p className="text-[#656565] text-[12px] mt-4">
                            {item.title}
                          </p>
                          {item.title !== 'Release Date' ? (
                            <InputTxt
                              name={item.title}
                              onChange={(e: any) =>
                                updateTechnicalSpecificationModel(
                                  e.target.name,
                                  e.target.value,
                                )
                              }
                              value={item.value}
                              placeholder={'eg: 20 aug 2022'}
                              MainClasses={'!h-[28px] !bg-white'}
                            />
                          ) : (
                            <CustomCalendar
                              date={new Date(item?.value)}
                              setDate={(e: any) => {
                                console.log(e, 'EVENT');
                                updateTechnicalSpecificationModel(
                                  e.target.name,
                                  e.target.value,
                                );
                              }}
                            />
                          )}
                        </div>
                      );
                    },
                  )}
              </div>
            </div>
          </>
        )}
        {enterManual === 'manual' && (
          <div>
            <Techspec />
          </div>
        )}
        <div className="flex gap-3 mb-3">
          <CustomButton
            txt={'Cancel'}
            classes={
              '!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]'
            }
          />
          <CustomButton
            onClick={() => Addproduct()}
            txt={'Edit Product'}
            classes={' !w-[179px] !rounded-[12px] !h-[50px]'}
          />
        </div>
      </div>
      <Confirmationmodal
        addValue={true}
        PopupHeader={'Add variant'}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={'Confirm'}
        cnclebtnText={'Cancel'}
        text={'Add name of the variant'}
        handleFunction={handleFunction}
        setValue={setVariantValue}
        Value={varVal}
      />
    </div>
  );
};
