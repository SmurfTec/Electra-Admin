import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { CustomButton, InputTxt, UploadPicture } from '../../../atoms';
import { Header, SuccessModel } from '../../../components';
import { CreateCategories } from '../../../store/Slices/Categories';
import { getAllVariants } from '../../../store/Slices/VariantSlice';

const CustomVariatBox = ({
  item,
  selectedVariant,
  setSelectedVariant,
  onClick,
}: any) => {
  return (
    <CustomButton
      onClick={onClick}
      txt={item.title}
      classes={`!w-auto !px-[30px] !py-[12px] !inline-block !h-auto !rounded-[7px] ${
        !selectedVariant.includes(item.id)
          ? '!bg-custome-button-grey !text-black'
          : ''
      } `}
    />
  );
};
export const CreateCategory = () => {
  const [successVisible, setsuccessVisible] = useState(false);
  const [Name, setName] = useState('');
  const [fee, setfee] = useState('');
  const navigate = useNavigate();
  const [Variants, setVariants] = useState([]);
  const [selectedVariant, setSelectedVariant] = useState<any>([]);
  const [error, setError] = useState<string | null>(null);
  const [image, setImages] = useState<any>();
  const getVariant = async () => {
    const response = await getAllVariants();
    setVariants(response.variants);

    const newArr = response?.variants?.map((item: any) => {
      const newObj = {
        ...item,
        active: false,
      };
      return newObj;
    });
    setVariants(newArr);
  };
  useEffect(() => {
    getVariant();
  }, []);

  const Create = async () => {
    if (!Name) return setError('Specify Category name');
    if (selectedVariant.length === 0)
      return setError('Select atleast one variant for category');
    if (!image) return setError('Image is not selected');

    // console.log('Name', Name);
    try {
      const newBody = new FormData();
      newBody.append('name', Name);
      newBody.append('image', image);

      selectedVariant.length > 0 &&
        selectedVariant.map((item: any, index: any) => {
          newBody.append(`variants[${index}]`, item);
        });

      const response = await CreateCategories(newBody);
      if (response?.category) {
        setsuccessVisible(true);
        setName('');
        setfee('');
        getVariant();
        setImages([]);
      }
      navigate('/Category');
    } catch (err) {
      //
    }
  };

  return (
    <div>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt="Category Created Successfully"
      />
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Add New Category"
        semiTitle="Add New Category to list item relatively."
        UserBox={true}
      />
      <div className="mt-[35px]">
        <InputTxt
          placeholder="Enter Category Name"
          MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
          value={Name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </div>
      <div className="mt-[27px]">
        <p className="text-[20px] font-[600] text-black">Variants</p>
        <div className="mt-[32px] flex gap-3 flex-wrap w-[32.6rem]">
          {Variants.map((item: any, index: any) => {
            return (
              <CustomButton
                onClick={() => {
                  if (!selectedVariant.includes(item.id)) {
                    selectedVariant.push(item.id);

                    setSelectedVariant(selectedVariant);
                    const newarr: any = Variants?.map((item2: any) => {
                      if (item2.id == item.id) {
                        return {
                          ...item2,
                          active: true,
                        };
                      } else {
                        return item2;
                      }
                    });
                    setVariants(newarr);
                  } else {
                    selectedVariant.pop(item.id);
                    setSelectedVariant(selectedVariant);
                    const newarr: any = Variants.map((item2: any) => {
                      if (item2.id == item.id) {
                        return {
                          ...item2,
                          active: false,
                        };
                      } else {
                        return item2;
                      }
                    });
                    setVariants(newarr);
                  }
                }}
                txt={item.title}
                key={index}
                classes={`!w-auto !px-[30px] !py-[12px] !inline-block !h-auto !rounded-[7px] ${
                  !item.active ? '!bg-custome-button-grey !text-black' : ''
                } `}
              />
            );
          })}

          <CustomButton
            onClick={(value: any) => navigate('/AddNewVariant')}
            txt="+Add Variant"
            classes="!w-[140px] !h-[42px] !rounded-[7px] !bg-blue !text-white"
          />
        </div>
        <div className="border border-[#F7F7F8] h-[auto] w-[30%] mt-3">
          <p className="border-b border-[#F7F7F8]  font-semibold text-[20px] p-3">
            Upload icon/image
          </p>
          <div className="p-3">
            <UploadPicture
              fetchImages={false}
              multipleImages={false}
              setImage={setImages}
            />
          </div>
        </div>
        {error && (
          <div className="w-full max-w-[390px] mt-[20px] flex gap-2 justify-start text-left items-center">
            <>
              <div className="w-[15px] h-[15px] text-white bg-red rounded-[50%] flex justify-center items-center text-[10px]">
                i
              </div>
              <p className="text-[14px] text-[#FF0000] font-[400]">{error}</p>
            </>
          </div>
        )}
        <div
          className={`flex gap-3 flex-wrap ${
            error ? 'mt-[19px]' : 'mt-[60px]'
          }`}
        >
          <CustomButton
            onClick={(value: any) => {
              setError('');
              // navigate('/Category');
            }}
            txt="Cancel"
            classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"
          />
          <CustomButton
            txt="Create Category"
            classes="!w-[179px] !h-[50px] !rounded-[10px] "
            onClick={(value: any) => Create()}
          />
        </div>
      </div>
    </div>
  );
};
