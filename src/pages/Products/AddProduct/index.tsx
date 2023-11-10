import { Divider } from 'primereact/divider';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
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
import { useVariantDetail } from '../../../custom-hooks';
import { getBrands } from '../../../store/Slices/BrandSlice';
import { getCategories } from '../../../store/Slices/Categories';
import { CreateProduct } from '../../../store/Slices/ProductSlice';
export const AddProduct = () => {
  type techSpec = {
    title: string;
    value: string;
  };
  type VerificationSpec = {
    title: string;
  };
  type variantSpec = {
    variant: string;
    value: string;
  };
  type descriptionProp = {
    description: string;
  };
  const [visible, setVisible] = useState(false);
  const [fetchVariants, setFetchVariants] = useState(false);
  const [attachments, setAttachment] = useState<any>([]);
  const [enterManual, setManual] = useState('Database');
  const [VariantsArray, setVariantArray] = useState<
    { variant: any; values: any }[]
  >([]);
  const [images, setImage] = useState('');
  const [varVal, setVariantValue] = useState('');
  const [techType, setTechType] = useState(1);
  const [brands, setBrands] = useState([]);
  const [category, setCategories] = useState([]);
  const [Addvisible, setAddVisible] = useState(false);
  const [Addvisible2, setAddVisible2] = useState(false);
  const [Editvisible, setEditVisible] = useState(false);
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
  const [Addvalue, setAddvalue] = useState('');
  const [AddObjvalue, setAddObjvalue] = useState({
    title: '',
    value: '',
  });
  const [variant, setVariant] = useState<any>({
    title: '',
    datatype: String,
    values: [],
    id: Number,
  });

  const [EditObj, setEditObj] = useState({ title: '', value: '' });
  const [OriginalEditObj, setOriginalEditObj] = useState({
    title: '',
    value: '',
  });
  const [EditValue, setEditValue] = useState('');
  const [OriginalEditValue, setOriginalEditValue] = useState('');

  const [EditVisible2, setEditVisible2] = useState(false);

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
    dataCat = dataCat.categories.map((item: any, index: any) => {
      const newObj = {
        value: item.id,
        label: item.name,
      };
      return newObj;
    });
    setCategories(dataCat);
  };

  useEffect(() => {
    getAllBrands();
  }, []);

  useEffect(() => {
    if (VariantsData?.variants) {
      const mappedData = VariantsData?.variants.map((item: any) => {
        const { title, values, value, id, background_color } = item;
        const options = values.map((value1: any) => ({
          txt: value1,
          classes:
            value === value1
              ? '!bg-[#FCFCFC] !w-[148px] ml-2 !border !border-[#3C82D6] !text-[black] !p-4 !rounded-[9px] !mt-5'
              : '!bg-[#FCFCFC] !w-[148px]  !text-[black] !p-4 !rounded-[9px] !mt-5',
        }));

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
  const updateTechnicalSpecificationModel = (name: any, value: any) => {
    setProductData(prevData => {
      const updatedModel = prevData.technicalSpecificationModel.map(item => {
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
    const data = new FormData();
    data.append('title', productData.title);
    data.append('is_active', 'true');
    data.append('brand', productData.brand);
    data.append('category', productData.category);
    data.append(
      'productProperties[description]',
      productData.productProperties.description
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
    productData.ProductVerification.length > 0 &&
      productData.ProductVerification.map((item, index) => {
        data.append(
          `productVerificationDetailsModel[${index}][title]`,
          item.title
        );
      });
    attachments.forEach((file: any, index: any) => {
      data.append('attachments', file);
    });
    const add = await CreateProduct(data);
    if (add) {
      navigate('/Products');
    }
  };
  const AddVerification = (value: any) => {
    if (value.length > 0) {
      const exist = productData.ProductVerification.some(
        item => item.title == value
      );
      if (!exist) {
        setProductData(prevData => ({
          ...prevData,
          ProductVerification: [
            ...prevData.ProductVerification,
            { title: value },
          ],
        }));
        setAddVisible(false);
        setAddvalue('');
      } else {
        setAddVisible(false);
      }
    }
  };
  const AddSpecification = (value: any) => {
    if (value.title.length > 0) {
      const exist = productData.ProductVerification.some(
        item => item.title == value.title
      );
      if (!exist) {
        setProductData(prevData => ({
          ...prevData,
          technicalSpecificationModel: [
            ...prevData.technicalSpecificationModel,
            { title: value.title, value: value.value },
          ],
        }));
        setAddVisible2(false);
        setAddObjvalue({ title: '', value: '' });
      } else {
        setAddVisible2(false);
      }
    }
  };
  useEffect(() => {
    if (
      productData.ProductVerification.length > 2 &&
      productData.title.length > 0 &&
      productData.technicalSpecificationModel.length > 2 &&
      productData.productVariants.length > 0
    ) {
      setError('');
      setbuttonDisable(false);
    } else {
      if (productData.ProductVerification.length < 2) {
        setError('Must add 3 product verifications');
      } else if (productData.technicalSpecificationModel.length < 2) {
        setError('Must add 3 technical Specification');
      } else if (productData.title.length === 0) {
        setError('Title cannot be empty');
      }
    }
  }, [productData]);

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

  return (
    <div>
      <Header
        chooseDate={false}
        title="Add new Product"
        semiTitle="Add new products for availability on website"
        UserBox={true}
      />
      <InputTxt
        onChange={handleChange(setProductData)}
        placeholder="Enter Phone model"
        MainClasses="mt-[40px] !w-[80%]"
        name={'title'}
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
        />
      </div>
      <textarea
        onChange={e => handleChangeDescription(e.target.value)}
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
            setAttachment(value);
          }}
          multipleImages={true}
          IMAGEE={attachments}
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
            {/* <div>
              <p className="bg-lightgray p-4 w-[60%] rounded mt-5 border border-custom">
                Technical Specifiactions for <b>iphone 14 pro max</b> was
                selected via 3rd party. Click on search to replace
              </p>
            </div> */}
            <div className="mb-5">
              <p className="text-[black] font-extrabold bg-lightgray border-b-0 p-4 w-[60%] rounded mt-5 border border-custom">
                Specifications
              </p>

              <div className="border border-custom  w-[60%] pb-4">
                {productData.technicalSpecificationModel.map(
                  (item, index, arr: any) => {
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
                {productData?.ProductVerification.map((item, index, arr) => {
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
                })}
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
              <p className="text-red mb-2">{error}</p>
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
            txt={'Add Product'}
            classes={`${
              buttonDisable ? '!bg-[#E2E2E2] !text-black' : ''
            } !w-[179px] !rounded-[12px] !h-[50px]`}
          />
        </div>
      </div>

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

      <Confirmationmodal2
        addValue={true}
        Value={EditValue}
        setValue={setEditValue}
        PopupHeader={'Edit Verification'}
        visible={Editvisible}
        setVisible={setEditVisible}
        cnfrmbtnText={'Update'}
        cnclebtnText={'Cancel'}
        handleFunction={(value: any) => HandleEditValue(value)}
        placeholderValue="add verification step"
      />

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
