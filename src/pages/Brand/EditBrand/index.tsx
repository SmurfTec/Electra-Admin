import React, { useState, useEffect } from 'react';
import { Header } from '../../../components';
import { InputTxt, CustomButton, CustomDropdown2 } from '../../../atoms';
import { ProgressSpinner } from 'primereact/progressspinner';
import { EditBrandByID, GetBrandID } from '../../../store/Slices/BrandSlice';
import { useParams } from 'react-router-dom';

import { useNavigate } from 'react-router-dom';
import { SuccessModel } from '../../../components';
import { UploadPicture } from '../../../atoms';
import { getCategories } from '../../../store/Slices/Categories';
export const EditBrand = () => {
  const params = useParams();
  const id = params.id ?? '0';
  const [successVisible, setsuccessVisible] = useState(false);
  const [Name, setName] = useState('');
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [image, setImage] = useState<any>();
  const [category, setCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [loader, setLoader] = useState(true);
  const getData = async () => {
    try {
      setLoader(true);
      let brand = await GetBrandID(id);
      if (brand) {
     
        setCategory(brand?.data?.category?.id);
        setImage(brand?.data?.image);
        setName(brand?.data?.title);
        setLoader(false);
      }

    } catch (e) {
      console.log(e, 'ERRROR');
    }
  };
  useEffect(() => {
    getData();
  }, []);
  const getAllCategories = async () => {
    try {
      let dataCat = await getCategories();
      dataCat = dataCat.categories.map((item: any, index: any) => {
        let newObj = {
          value: item.id,
          label: item.name,
        };
        return newObj;
      });

      setCategories(dataCat);
    } catch (e) {}
  };
  const Create = async () => {
    try {
      const newBody = new FormData();
      newBody.append('title', Name);
      newBody.append('category', category);

      newBody.append('image', image);

      let response = await EditBrandByID(id, newBody);

      if (response.message === 'Request failed with status code 400') {
        setError(response.response?.data?.message[0]);
      } else {
        setsuccessVisible(true);
        setName('');
        setError('');
      }
    } catch (err) {}
  };
 
  useEffect(() => {
    getAllCategories();
  }, []);
  return (
    <div>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt="Brand Created Successfully"
        onClick={() => navigate('/Brand')}
      />
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Edit Brand"
        semiTitle="Add New Brand For Product Identity."
        UserBox={true}
      />
      {!loader ? (
        <>
          {' '}
          <div className="mt-[35px]">
            <InputTxt
              placeholder="Enter Brand Name"
              MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
              value={Name}
              onChange={(e: any) => setName(e.target.value)}
            />
          </div>
          <CustomDropdown2
            setValue={(value: any) => {
              setCategory(value);
            }}
            value={category}
            placeholder="Category"
            options={categories}
            mainclasses={'mt-10  !w-[35%]'}
          />
          <div className="mt-[27px]">
            <div className="border border-[#F7F7F8] h-[auto] w-[30%] mt-3">
              <p className="border-b border-[#F7F7F8]  font-semibold text-[20px] p-3">
                Upload icon/image
              </p>
              <div className="p-3">
                <UploadPicture
                  fetchImages={true}
                  multipleImages={false}
                  setImage={setImage}
                  images={image}
                />
              </div>
            </div>
            <p className="text-red pdsdft-2">{error}</p>
            <div className="flex gap-3 flex-wrap mt-[50px]">
              <CustomButton
                onClick={(value: any) => navigate('/Brand')}
                txt="Cancel"
                classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"
              />
              <CustomButton
                txt="Create Brand"
                classes="!w-[179px] !h-[50px] !rounded-[10px] "
                onClick={Create}
              />
            </div>
          </div>
        </>
      )
    :
    (
      <div className="w-full h-full flex justify-start mt-32 items-center overflow-y-hidden">
        <ProgressSpinner style={{ overflow: 'hidden' }} />
      </div>
    )}
    </div>
  );
};
