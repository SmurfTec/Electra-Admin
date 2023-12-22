import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton, CustomDropdown, InputTxt } from '../../../atoms';
import { Confirmationmodal2, Header, SuccessModel } from '../../../components';
import { CreateVariantData } from '../../../store/Slices/VariantSlice';
export const AddNewVariant = () => {
  const [successVisible, setsuccessVisible] = useState(false);
  const navigate = useNavigate();
  const [Variant, setVariant] = useState('');
  const [Addvisible, setAddVisible] = useState(false);
  const [Editvisible, setEditVisible] = useState(false);
  const [valuesArr, setvaluesArr] = useState<any>([]);
  const [Addvalue, setAddValue] = useState('');
  const [originalEditValue, setOriginalEditValue] = useState('');
  const [EditValue, setEditValue] = useState('');
  const [dataTypeValue, setdataTypeValue] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [options] = useState(['String', 'Number']);

  const handleFunction = (value: any) => {
    if (value.length > 0) {
      if (!valuesArr.includes(value)) {
        setvaluesArr([...valuesArr, value]);
        setAddVisible(false);
        setAddValue('');
      } else {
        setAddVisible(false);
      }
    }
  };
  const EditColor = (item: any, index: any) => {
    setEditValue(item);
    setOriginalEditValue(item);
    setEditVisible(true);
  };
  const handleEditFunction = (value: any) => {
    const index = valuesArr.indexOf(originalEditValue);
    valuesArr[index] = value;
    setvaluesArr(valuesArr);
    setEditVisible(false);
    setOriginalEditValue('');
  };
  const DeleteColor = (index: any) => {
    const newArray = valuesArr
      .slice(0, index)
      .concat(valuesArr.slice(index + 1));
    setvaluesArr(newArray);
  };
  const CreateVariant = async (value: any) => {
    if (!Variant) return setError('Specify variant name');
    if (!dataTypeValue) return setError('Specify type of variant');
    try {
      const body = {
        title: Variant,
        datatype: dataTypeValue,
        values: valuesArr,
      };
      const response = await CreateVariantData(body);
      if (response?.id) {
        setsuccessVisible(true);
        setTimeout(() => {
          navigate('/category');
        }, 2000);
        setvaluesArr([]);
        setVariant('');
      }
    } catch (err) {
      //
    }
  };
  return (
    <div>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt="Variant Created Successfully"
      />
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Add New Variant"
        semiTitle="Add New Category to list item relatively."
        UserBox={true}
      />
      <div className="mt-[35px]">
        <InputTxt
          placeholder="Enter Value"
          MainClasses="!bg-[#FCFCFC] border !border-inputBorder !h-[59px]"
          value={Variant}
          onChange={(e: any) => setVariant(e.target.value)}
        />
        <CustomDropdown
          value={dataTypeValue}
          setvalue={(e: any) => setdataTypeValue(e.value)}
          options={options}
          placeholderColor={'#A4A4A4'}
          placeholder="Select Data Type"
          mainclasses={
            'mt-4 w-[286px] !h-[59px] !bg-[#FCFCFC] border !border-inputBorder'
          }
        />
      </div>
      <div className="mt-[27px]">
        <p className="text-[20px] font-[600] text-black">Values</p>
        <div className="mt-[32px] flex gap-3 flex-wrap w-[33.75rem]">
          {valuesArr.map((item: any, index: any) => {
            return (
              <CustomButton
                key={index}
                txt={item}
                classes="!w-auto !px-[14px] !h-[42px] !rounded-[7px] !bg-custome-button-grey !text-black !font-[600]"
                editIcon={
                  <img
                    src={IMAGES.Edit}
                    className="ml-[5px]"
                    onClick={() => EditColor(item, index)}
                  />
                }
                deleteIcon={
                  <img
                    src={IMAGES.Cross}
                    className=""
                    onClick={() => DeleteColor(index)}
                  />
                }
              />
            );
          })}
        </div>
        <CustomButton
          txt="+Add Values"
          classes="!w-[140px] !h-[42px] !rounded-[7px]  !text-white !mt-[13px] mb-[20px]"
          onClick={() => setAddVisible(true)}
        />
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
            onClick={(value: any) => navigate('/Category')}
            txt="Cancel"
            classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"
          />
          <CustomButton
            onClick={(value: any) => CreateVariant(value)}
            txt="Create Variant"
            classes="!w-[179px] !h-[50px] !rounded-[10px] "
          />
        </div>
      </div>
      <Confirmationmodal2
        addValue={true}
        Value={EditValue}
        setValue={setEditValue}
        PopupHeader={'Edit Value'}
        visible={Editvisible}
        setVisible={setEditVisible}
        cnfrmbtnText={'Edit value'}
        cnclebtnText={'Cancel'}
        text={'Are you sure you want to ban this user'}
        handleFunction={(value: any) => handleEditFunction(value)}
      />
      <Confirmationmodal2
        addValue={true}
        Value={Addvalue}
        setValue={setAddValue}
        handleFunction={(value: any) => handleFunction(value)}
        PopupHeader={'Add Value'}
        visible={Addvisible}
        setVisible={setAddVisible}
        cnfrmbtnText={'Add value'}
        cnclebtnText={'Cancel'}
        text={'Are you sure you want to delete this variant'}
      />
    </div>
  );
};
