import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton, CustomDropdown, InputTxt } from '../../../atoms';
import {
  Confirmationmodal,
  Confirmationmodal2,
  Header,
  SuccessModel,
} from '../../../components';
import {
  CreateVariantData,
  getAllVariants,
  getSingleVariant,
  updateVariantData,
} from '../../../store/Slices/VariantSlice';
export const EditVariant = () => {
  const Params = useParams();
  const { id } = Params;
  const [fetching, setFetching] = useState(true);

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
  const [options, setoptions] = useState(['String', 'Number']);

  useEffect(() => {
    const fetchData = async () => {
      if (!id) return;
      setFetching(true);
      try {
        const response = await getSingleVariant(id);
        setVariant(response?.data?.title);
        setdataTypeValue(response?.data?.datatype);
        setvaluesArr(response.data.values);
      } catch (error) {
        console.error(error);
      } finally {
        setFetching(false);
      }
    };
    fetchData();
  }, [id]);

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
  const updateVariant = async (value: any) => {
    if (!id) return;
    try {
      const body = {
        title: Variant,
        datatype: dataTypeValue,
        values: valuesArr,
      };
      const response = await updateVariantData(id, body);
      if (response?.id) {
        setsuccessVisible(true);
        setvaluesArr([]);
        setVariant('');
        navigate('/category');
      }
    } catch (err) {
      //
    }
  };

  console.log('dataTypeValue', dataTypeValue);
  return (
    <div>
      <SuccessModel
        visible={successVisible}
        setVisible={setsuccessVisible}
        txt="Variant updated Successfully"
      />
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Edit Variant"
        semiTitle="Edit Variant to list item relatively."
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
          classes="!w-[140px] !h-[42px] !rounded-[7px]  !text-white !mt-[13px]"
          onClick={() => setAddVisible(true)}
        />
        <div className="flex gap-3 flex-wrap mt-[50px]">
          <CustomButton
            onClick={(value: any) => navigate('/Category')}
            txt="Cancel"
            classes="!w-[179px] !h-[50px] !rounded-[10px] !bg-custome-button-grey !text-black"
          />
          <CustomButton
            onClick={(value: any) => updateVariant(value)}
            txt="Update Variant"
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
