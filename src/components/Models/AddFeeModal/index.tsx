import { Checkbox } from 'primereact/checkbox';
import { Dropdown } from 'primereact/dropdown';
import { useState } from 'react';
import { CustomButton } from '../../../atoms';
import { CustomDialog } from '../../../atoms/global.style';
import { CreateFees, UpdateFees } from '../../../store/Slices/FeesSlice';
export const AddFeeModal = ({
  toggleVisible,
  visible,
  categories,
  isEdit = false,
  afterOperSuccess,
  initialState = {},
}: any) => {
  // insert here
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [FormData, setFormData] = useState(
    initialState || {
      fees: 0,
      value_type: true,
      category: '',
      type: '',
    }
  );

  const handleInputChange = (e: any) => {
    setError('');
    setFormData((st: any) => ({
      ...st,
      [e.target.name]:
        e.target.name === 'value_type' ? !st.value_type : e.target.value,
    }));
  };

  const handleFormSubmit = async () => {
    if (FormData.fees <= 0) return setError('Enter valid amount');
    if (FormData.value_type && FormData.fees >= 100)
      return setError('Fee in %, should be below 100');
    if (FormData.type === '') return setError('Enter fee modifier title');
    const cat =
      FormData.category && FormData.category !== '' ? FormData.category : null;
    try {
      setLoading(true);
      if (isEdit) {
        const updatedFee = await UpdateFees(FormData.id, {
          ...FormData,
          fees: +FormData.fees,
          value_type: FormData.value_type ? 'percentage' : 'value',
          category:
            FormData.category && FormData.category !== ''
              ? FormData.category
              : null,
        });
        setLoading(false);
        afterOperSuccess(updatedFee, true);
      } else {
        const fee = await CreateFees({
          ...FormData,
          fees: +FormData.fees,
          value_type: FormData.value_type ? 'percentage' : 'value',
          category:
            FormData.category && FormData.category !== ''
              ? FormData.category
              : null,
        });
        setLoading(false);
        afterOperSuccess(fee);
      }
    } catch (er: any) {
      setError(er.message);
    }
  };

  return (
    <CustomDialog
      className={`bg-[#FFFFFF] w-[546px] flex  justify-center align-middle items-center overflow-hidden `}
      visible={visible}
    >
      <i
        className="pi pi-times absolute right-4 top-4 cursor-pointer"
        onClick={() => {
          setError('');
          toggleVisible(false);
        }}
      ></i>
      <div className="dialog-header">
        <p className="text-center text-[20px] font-[700] text-black uppercase border-b border-custom pb-3 ">
          Add New Fee
        </p>
        <div className="w-full px-7 my-7 flex flex-col gap-6">
          <div className="flex justify-between items-center px-2 border w-full h-[47px] mx-auto rounded-[10px]">
            <input
              onChange={handleInputChange}
              placeholder={'Enter Fee Modifier Title'}
              className={`flex-1 px-2 focus:outline-none`}
              value={FormData.type}
              name="type"
              required
            />
          </div>
          <div className="flex justify-between items-center gap-6">
            <div className="flex justify-between items-center px-2 border w-full h-[47px] mx-auto rounded-[10px]">
              <input
                onChange={handleInputChange}
                placeholder={'Enter Fee'}
                type="number"
                className={`flex-1 px-2 focus:outline-none`}
                value={FormData.fees}
                name="fees"
                required
              />
              <div className=" flex justify-center items-center text-[black] text-center h-[15px] w-[15px] overflow-hidden rounded-full font-bold">
                {FormData.value_type ? '%' : '$'}
              </div>
            </div>
            <div className="flex items-center min-w-[110px]">
              <Checkbox
                name="value_type"
                value={FormData.value_type}
                onChange={handleInputChange}
                checked={FormData.value_type}
              />
              <label
                htmlFor="value_type"
                className="ml-3 font-bold text-[18px]"
              >
                Fee In %
              </label>
            </div>
          </div>
          <div className="card flex justify-content-center">
            <Dropdown
              value={FormData.category}
              onChange={e =>
                setFormData((st: any) => ({ ...st, category: e.value }))
              }
              options={categories}
              optionLabel="label"
              placeholder="Choose Category"
              className="w-full md:w-14rem text-black"
            />
          </div>
        </div>
        {error && (
          <p className="text-red text-center w-full mx-auto mt-1 text-[14px]">
            {error}
          </p>
        )}

        <div className="flex mt-8 justify-center gap-4">
          <CustomButton
            txt={'Cancel'}
            classes="!w-[179px] !h-[50px] !bg-[#E2E2E2] !rounded-[10px] !text-black !text-[16px]"
            onClick={toggleVisible}
          />
          <CustomButton
            type="submit"
            txt={isEdit ? 'Update' : 'Create'}
            onClick={!loading && handleFormSubmit}
            classes={`!w-[179px] !h-[50px] bg-[#212121] !rounded-[10px] !text-white !text-[16px]`}
            isLoading={loading}
          />
        </div>
      </div>
    </CustomDialog>
  );
};
