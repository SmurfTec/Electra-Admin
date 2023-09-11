import React, { useState, useEffect } from 'react';
import { Header } from '../../../components';
import { InputTxt, CustomButton } from '../../../atoms';
import IMAGES from '../../../assets/Images';
import { getAllVariants } from '../../../store/Slices/VariantSlice';
import { CreateCategories } from '../../../store/Slices/Categories';
import { CreateNewBrand } from '../../../store/Slices/BrandSlice';
import { useNavigate } from 'react-router-dom';
import { SuccessModel } from '../../../components';
import { UploadPicture } from '../../../atoms';
export const CreateBrand = () => {
  const [successVisible, setsuccessVisible] = useState(false);
  const [Name, setName] = useState('');
  const navigate = useNavigate();

  const [image, setImage] = useState<any>();

  const Create = async () => {
    try {
      const newBody = new FormData();
      newBody.append('title', Name);

      newBody.append('image', image);

      let response = await CreateNewBrand(newBody);
      if (response) {
        setsuccessVisible(true);
        setName('');
      }
    } catch (err) {}
  };
  return (
    <div>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt="Brand Created Successfully"
      />
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Add New Brand"
        semiTitle="Add New Brand For Product Identity."
        UserBox={true}
      />
      <div className="mt-[35px]">
        <InputTxt
          placeholder="Enter Brand Name"
          MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
          value={Name}
          onChange={(e: any) => setName(e.target.value)}
        />
      </div>
      <div className="mt-[27px]">
        <div className="border border-[#F7F7F8] h-[auto] w-[30%] mt-3">
          <p className="border-b border-[#F7F7F8]  font-semibold text-[20px] p-3">
            Upload icon/image
          </p>
          <div className="p-3">
            <UploadPicture
              fetchImages={false}
              multipleImages={false}
              setImage={setImage}
            />
          </div>
        </div>
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
    </div>
  );
};
