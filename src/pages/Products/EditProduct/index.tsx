import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import {
  CustomButton,
  CustomCalendar,
  CustomDropdown2,
  FetchButton,
  InputTxt,
  UploadPicture,
} from '../../../atoms';
import {
  Confirmationmodal,
  Confirmationmodal2,
  Header,
  Techspec,
  Variants,
} from '../../../components';
import url from '../../../config/index';
import { useProductDetail, useVariantDetail } from '../../../custom-hooks';
import { getBrands } from '../../../store/Slices/BrandSlice';
import { getCategories } from '../../../store/Slices/Categories';
import {
  EditProductAPI,
  getProductById,
} from '../../../store/Slices/ProductSlice';

import { Divider } from 'primereact/divider';

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
  type VerificationSpec = {
    title: string;
  };
  const params = useParams();
  const { id } = params;
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
  const [imageIDS, setimageIDS] = useState([]);
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
    ProductVerification: [] as VerificationSpec[],
  });
  const [error, setError] = useState('');

  const [buttonDisable, setbuttonDisable] = useState(true);

  const [EditValue, setEditValue] = useState('');
  const [OriginalEditValue, setOriginalEditValue] = useState('');
  const [EditObj, setEditObj] = useState({ title: '', value: '' });
  const [OriginalEditObj, setOriginalEditObj] = useState({
    title: '',
    value: '',
  });
  const [Addvisible, setAddVisible] = useState(false);
  const [Addvisible2, setAddVisible2] = useState(false);
  const [EditVisible, setEditVisible] = useState(false);
  const [EditVisible2, setEditVisible2] = useState(false);
  const [variant, setVariant] = useState<any>({
    title: '',
    datatype: String,
    values: [],
    id: Number,
  });
  const [AddObjvalue, setAddObjvalue] = useState({
    title: '',
    value: '',
  });
  const [Addvalue, setAddvalue] = useState('');

  const navigate = useNavigate();
  const VariantsData = useVariantDetail(fetchVariants, productData.category);
  const getAllBrands = async () => {
    let data = await getBrands();
    let dataCat = await getCategories();
    data = data.brands.map((item: any, index: any) => {
      const newObj = {
        value: item.id,
        label: item.title,
      };
      return newObj;
    });
    setBrands(data);
    console.log(data, 'BRANDSS');
    dataCat = dataCat.categories.map((item: any, index: any) => {
      const newObj = {
        value: item.id,
        label: item.name,
      };
      return newObj;
    });
    setCategories(dataCat);
  };

  const AddVerification = (value: any) => {
    if (value.length > 0) {
      const exist = productData?.ProductVerification?.some(
        item => item.title == value
      );
      if (!exist) {
        console.log(value);
        setProductData(prevData => ({
          ...prevData,
          ProductVerification:
            prevData?.ProductVerification?.length > 0
              ? [...prevData.ProductVerification, { title: value }]
              : [{ title: value }],
        }));
        setAddVisible(false);
        setAddvalue('');
      } else {
        setAddVisible(false);
      }
    }
  };
  const AddSpecification = (value: any) => {
    console.log(value);
    if (value.title.length > 0) {
      const exist = productData?.ProductVerification?.some(
        item => item.title == value.title
      );
      if (!exist) {
        setProductData(prevData => ({
          ...prevData,
          technicalSpecificationModel:
            prevData?.technicalSpecificationModel?.length > 0
              ? [
                  ...prevData.technicalSpecificationModel,
                  { title: value.title, value: value.value },
                ]
              : [{ title: value.title, value: value.value }],
        }));
        setAddVisible2(false);
        setAddObjvalue({ title: '', value: '' });
      } else {
        setAddVisible2(false);
      }
    }
  };

  useEffect(() => {
    if (ProductData) {
      console.log(ProductData, 'PRoduct');
      setimageIDS(ProductData.product?.images);
      const newarr = ProductData.product?.images?.map(
        (item: any, index: any) => {
          return item.id;
        }
      );
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
          ProductData.product?.product_variants &&
          (ProductData.product?.product_variants?.map(
            (item: any, index: any) => {
              return {
                variant: item.id,
                value: item.value,
              };
            }
          ) as variantSpec[]),
        technicalSpecificationModel:
          ProductData.product.technical_specifications &&
          (ProductData.product.technical_specifications?.map(
            (item: any, index: any) => {
              return item?.id
                ? {
                    id: item.id,
                    title: item.title,
                    value: item.value,
                  }
                : {
                    title: item.title,
                    value: item.value,
                  };
            }
          ) as techSpec[]),
        ProductVerification:
          ProductData.product.product_verification_details &&
          ProductData.product.product_verification_details?.map(
            (item: any, index: any) => {
              return {
                id: item.id,
                title: item.title,
              };
            }
          ),
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
              (item: any) => item.value === value1
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
    const prevArray = variant.values;
    const Newpush = [...prevArray, value];
    const sendingData = {
      title: variant.title,
      datatype: 'string',
      values: Newpush,
    };
    const sendVariant = await url.put(`/variants/${variant.id}`, sendingData);
    if (sendVariant) {
      setVisible(!visible);
      VariantsData;
      setVariantValue('');
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
  const updateTechnicalSpecificationModel = (
    name: any,
    value: any,
    id?: any
  ) => {
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
      (item: any) => item.value === value
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
        const newData = VariantsArray.map((item: any) => {
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
          (item: any) => item.value !== value
        );
        setProductData(prevData => {
          return { ...prevData, productVariants: updateVariants };
        });
        const newData = VariantsArray.map((item: any) => {
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
    console.log(productData.technicalSpecificationModel, 'ATTACHMENT');
    const data = new FormData();
    data.append('title', productData.title);
    data.append('is_active', 'true');
    data.append('brand', productData.brand);
    attachments.forEach((file: any, index: any) => {
      data.append('attachments', file);
    });

    data.append('category', productData.category);
    data.append(
      'productProperties[description]',
      productData.productProperties.description
    );
    productData.productVariants?.length > 0 &&
      productData.productVariants.map((item, index) => {
        data.append(`productVariants[${index}][variant]`, item.variant);
        data.append(`productVariants[${index}][value]`, item.value);
      });
    productData.technicalSpecificationModel?.length > 0 &&
      productData.technicalSpecificationModel.map(
        (
          item: {
            title: string;
            value: string;
            id?: any;
          },
          index
        ) => {
          item?.id &&
            data.append(`technicalSpecificationModel[${index}][id]`, item.id);
          data.append(
            `technicalSpecificationModel[${index}][title]`,
            item.title
          );
          data.append(
            `technicalSpecificationModel[${index}][value]`,
            item.value
          );
        }
      );
    productData.ProductVerification?.length > 0 &&
      productData.ProductVerification?.map(
        (
          item: {
            title: string;
            id?: any;
          },
          index
        ) => {
          item?.id &&
            data.append(
              `productVerificationDetailsModel[${index}][id]`,
              item.id
            );
          data.append(
            `productVerificationDetailsModel[${index}][title]`,
            item.title
          );
        }
      );
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
  const handleUpload = async (value: any) => {
    const newAttach: any = [];
    const prevImage: any = [];
    value.map((item: any, index: any) => {
      if (typeof item === 'object') {
        newAttach.push(item);
      } else {
        prevImage.push(item);
      }
    });
    setAttachment(newAttach);
    if (prevImage.length > 0) {
      const check = imageIDS
        .filter((item: any) => prevImage.includes(item.url))
        .map((item: any) => item.id);
      console.log(check);
      setImage(check);
    }
  };
  const getTechnicalSpecificationValue = (name: string) => {
    const item = productData.technicalSpecificationModel?.find(
      (spec: any) => spec.title === name
    );

    return item ? item.value : '';
  };
  const HandleEditObj = (value: any) => {
    const index = productData.technicalSpecificationModel.findIndex(
      (elem: any) => elem.title == OriginalEditObj.title
    );
    productData.technicalSpecificationModel[index] = {
      title: value.title,
      value: value.value,
    };
    setProductData(productData);
    setEditVisible2(false);
    setOriginalEditObj({ title: '', value: '' });
  };
  const HandleEditValue = (value: any) => {
    const index = productData.ProductVerification.findIndex(
      (elem: any) => elem.title == OriginalEditValue
    );
    productData.ProductVerification[index] = { title: value };
    setProductData(productData);
    setEditVisible(false);
    setOriginalEditValue('');
  };
  useEffect(() => {
    if (
      productData?.ProductVerification?.length > 2 &&
      productData?.title?.length > 0 &&
      productData?.technicalSpecificationModel?.length > 2 &&
      productData?.productVariants?.length > 0
    ) {
      setError('');
      setbuttonDisable(false);
    } else {
      if (productData?.ProductVerification?.length < 2) {
        setError('Must add 3 product verifications');
      } else if (productData?.technicalSpecificationModel?.length < 2) {
        setError('Must add 3 technical Specification');
      } else if (productData?.title?.length === 0) {
        setError('Title cannot be empty');
      }
    }
  }, [productData]);
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
        {error && error === 'Title cannot be empty' && (
          <p className="text-red">{error}</p>
        )}
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
        {productData.category &&
          VariantsArray &&
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
                    const newVariant = item.values.map(
                      (item: any, index: any) => {
                        return item.txt;
                      }
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
            handleUpload(value);
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
        {/* <div className="flex gap-3 mt-5">
          <FetchButton
            manual={enterManual}
            value={'Database'}
            setManual={setManual}
            txt={'Fetch from Database'}
          />
         
        </div>
        <CustomButton
          txt={'Search Item'}
          classes={
            '!w-[220px] !h-[55px] !mt-6 !rounded-[12px] !bg-[#3C82D6] !text-[white] !px-2 '
          }
          icon={true}
        /> */}
        {enterManual === 'Database' && (
          <>
            <div className="mb-5">
              <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
                Specifications
              </p>

              <div className="border border-custom  w-[60%] pb-4">
                {productData &&
                  productData?.technicalSpecificationModel?.map(
                    (item: any, index: any, arr: any) => {
                      console.log(item);
                      return (
                        <>
                          <div key={index} className="mx-5">
                            <p
                              className={`text-[#656565] text-[16px] flex font-bold justify-between ${
                                index === 0 && 'mt-[16px]'
                              }`}
                            >
                              {item.title}
                              <img
                                src={IMAGES.Edit}
                                // className="ml-[10px]"
                                onClick={() => {
                                  setEditObj({
                                    title: item.title,
                                    value: item.value,
                                  });
                                  setOriginalEditObj({
                                    title: item.title,
                                    value: item.value,
                                  });
                                  setEditVisible2(true);
                                }}
                              />
                            </p>
                            <p className="text-[#656565] text-[14px] mt-1">
                              {item.value}
                            </p>
                          </div>
                          {index < arr.length - 1 && (
                            <Divider
                              type="solid"
                              className="h-[1px] mb-['0px !important']"
                            />
                          )}
                        </>
                      );
                    }
                  )}

                <CustomButton
                  onClick={() => {
                    setAddVisible2(true);
                  }}
                  txt={'Add Specifications'}
                  classes={
                    ' !ml-[10px] mt-[20px] !w-[179px] !rounded-[12px] !h-[50px]'
                  }
                />
              </div>
            </div>
            {error && error === 'Must add 3 technical Specification' && (
              <p className="text-red">{error}</p>
            )}
            <div className="mb-5">
              <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
                Product Verification
              </p>

              <div className="border border-custom  w-[60%] pb-4">
                {productData &&
                  productData.ProductVerification?.map(
                    (item: any, index: any, arr: any) => {
                      return (
                        <>
                          <div key={index} className="mx-5">
                            <p
                              className={`text-[#656565] flex justify-between text-[16px] ${
                                index === 0 && 'mt-[16px]'
                              }`}
                            >
                              {item.title}
                              <img
                                src={IMAGES.Edit}
                                className="ml-[15px]"
                                onClick={() => {
                                  setEditValue(item.title);
                                  setOriginalEditValue(item.title);
                                  setEditVisible(true);
                                }}
                              />
                            </p>
                          </div>
                          {index < arr.length - 1 && (
                            <Divider
                              type="solid"
                              className="h-[1px] mb-['0px !important']"
                            />
                          )}
                        </>
                      );
                    }
                  )}
                <CustomButton
                  onClick={() => {
                    setAddVisible(true);
                  }}
                  txt={'Add Verifications'}
                  classes={
                    ' !ml-[10px] mt-[20px] !w-[179px] !rounded-[12px] !h-[50px]'
                  }
                />
              </div>
            </div>
            {error && error === 'Must add 3 product verifications' && (
              <p className="text-red">{error}</p>
            )}
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
            onClick={() => navigate('/Products')}
            classes={
              '!bg-[#E2E2E2] !text-black !w-[179px] !h-[50px] !rounded-[12px]'
            }
          />
          <CustomButton
            onClick={() => {
              if (!buttonDisable) {
                Addproduct();
              }
            }}
            txt={'Edit Product'}
            classes={' !w-[179px] !rounded-[12px] !h-[50px]'}
          />
        </div>
      </div>
      <Confirmationmodal2
        ObjVal={AddObjvalue}
        setObjVal={setAddObjvalue}
        handleFunction2={(value: any) => AddSpecification(value)}
        PopupHeader={'Add Value'}
        visible={Addvisible2}
        setVisible={setAddVisible2}
        cnfrmbtnText={'Add value'}
        placeholderValue="Add Title"
        placeholderValue2="Add Value"
        cnclebtnText={'Cancel'}
        classes={`!h-[378px]`}
      />
      <Confirmationmodal2
        addValue={true}
        Value={Addvalue}
        setValue={setAddvalue}
        handleFunction={(value: any) => AddVerification(value)}
        PopupHeader={'Add Value'}
        visible={Addvisible}
        setVisible={setAddVisible}
        cnfrmbtnText={'Add value'}
        placeholderValue="Add Verification Model"
        cnclebtnText={'Cancel'}
        text={'Are you sure you want to delete this variant'}
      />
      <Confirmationmodal2
        addValue={true}
        Value={EditValue}
        setValue={setEditValue}
        PopupHeader={'Edit Verification'}
        visible={EditVisible}
        setVisible={setEditVisible}
        cnfrmbtnText={'Update'}
        cnclebtnText={'Cancel'}
        handleFunction={(value: any) => HandleEditValue(value)}
        placeholderValue="add verification step"
      />

      <Confirmationmodal2
        ObjVal={EditObj}
        setObjVal={setEditObj}
        PopupHeader={'Edit Specification'}
        visible={EditVisible2}
        setVisible={setEditVisible2}
        cnfrmbtnText={'Update'}
        cnclebtnText={'Cancel'}
        handleFunction2={(value: any) => HandleEditObj(value)}
        classes={`!h-[400px]`}
        placeholderValue="add specification title"
        placeholderValue2="add specification value"
      />

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
