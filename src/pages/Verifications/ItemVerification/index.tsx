import React, { useEffect, useReducer, useState } from 'react';
import { Header, DashCard } from '../../../components';
import IMAGES from '../../../assets/Images';
import {
  CustomSwitch,
  CustomInputTextArea,
  CustomButton,
  CheckBox,
} from '../../../atoms';

import {
  CircularProgressbarWithChildren,
  buildStyles,
} from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import './style.css';
import { UploadPicture } from '../../../atoms';
import { useParams } from 'react-router-dom';
import {
  getVerficationById,
  UpdateVerfication,
} from '../../../store/Slices/VerificationSlice';
import { useNavigate } from 'react-router-dom';
const reducer = (state: any, action: any) => {
  console.log(action);
  console.log(InitialState);
  switch (action.type) {
    case 'toggleSwitch':
      return {
        ...state,
        [action.property]: !state[action.property],
      };
    // case 'crackswitch':
    //   return { ...state, crackswitch: !state.crackswitch };
    // case 'serialswitch':
    //   return { ...state, serialswitch: !state.serialswitch };
    // case 'batteryswitch':
    //   return { ...state, batteryswitch: !state.batteryswitch };
    // case 'lightswitch':
    //   return { ...state, lightswitch: !state.lightswitch };
    // case 'IMEIswitch':
    //   return { ...state, IMEIswitch: !state.IMEIswitch };
    case 'ItemStandardSwitch':
      return { ...state, ItemStandardSwitch: !state.ItemStandardSwitch };
    case 'SetAll':
      state = action.payload;
      return state;
    default:
      throw new Error();
  }
};
let InitialState: any = {};
export const ItemVerification = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [images, setImages] = useState<any>([]);
  const [itemData, setItemData] = useState<any>([]);
  const [state, dispatch] = useReducer(reducer, InitialState);
  const [checked, setChecked] = useState(false);
  const [Pass, setPass] = useState(true);
  const [percentage, setpercentage] = useState(100);
  const [verificationStats, setverificationStats] = useState<any>();
  const [total, setTotal] = useState(0);
  var newFormData = new FormData();
  const styles = buildStyles({
    textSize: '16px',
    pathTransitionDuration: 0.5,
    pathColor: Pass == true ? `#3C82D6` : '#FF8F6B',
    textColor: '#000000',
    trailColor: '#d6d6d6',
    backgroundColor: '#3e98c7',
  });
  useEffect(() => {
    let percent = 0;
    let t = 0;
    itemData &&
      itemData?.map((item: any, index: number) => {
        console.log(state[item.title], 'MY ITEM');
        if (state[item.title]) {
          percent += 20;
          t += 1;
        }
      });

    if (percent <= 50) {
      setPass(false);
    } else if (percent > 50) {
      setPass(true);
    }

    setTotal(t);
    setpercentage(percent);
  }, [state]);
  const FinishVerification = async () => {
    try {
     itemData&& itemData.map((item: any, index: any) => {
        newFormData.append(
          `order_verification_details[${index}][id]`,
          String(item?.id)
        );
        newFormData.append(
          `order_verification_details[${index}][is_pass]`,
          state[item.title]
        );
      });

     images &&  newFormData.append('images', images);
      console.log(images);
      // if (images.length < 6) {
      //   alert('Please upload atleast 6 Images');
      // } else {
      let response = await UpdateVerfication(id, newFormData);
      if (response) {
        navigate('/Verification');
      }
    } catch (e) {
      console.log(e);
    }

    // }
  };
  const GetVerificationDetail = async () => {
    try {
      let response = await getVerficationById(id);
      console.log(response, 'response');
      setItemData(response.verification);
      setverificationStats(response.verificationStats);
      let initialState = {};
      let percent = 0;
      let t = 0;
      response?.verification?.order?.order_verification_details &&
        response?.verification?.order?.order_verification_details.map(
          (item: any, index: number) => {
            if (item.is_pass) {
              percent += 20;
              t += 1;
              initialState = {
                ...initialState,
                [item.title]: true,
              };
            }
          }
        );
      console.log(initialState);

      dispatch({ type: 'SetAll', payload: initialState });
      console.log(
        response?.verification?.order.order_verification_details,
        'response'
      );
      setItemData(response?.verification?.order?.order_verification_details);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    GetVerificationDetail();
  }, []);

  return (
    <div className="pb-[50px]">
      <Header
        headerClasses={'!h-[69px]'}
        titleClass={'!mt-[10px]'}
        title="Item Verification & Details"
        semiTitle="Tick the the checkboxes if the item has certain feature."
        UserBox={true}
      />
      <div className="px-[10px] mt-[40px]  bg-[#FCE39C] rounded-[6px] text-black py-[4px] text-[14px] font-[500] inline-block">
        User Statistics
      </div>
      <div className="flex flex-wrap gap-3 mt-[33px]">
        <DashCard
          title={'Completed Sales'}
          totalNumber={verificationStats?.completed_sales || 0}
          myImg={IMAGES.Sales}
          imgColor={'bg-custom-blue'}
          showDefaultNumber={false}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={'Rejected Sales'}
          totalNumber={verificationStats?.rejected_sales || 0}
          myImg={IMAGES.RegectedSale}
          imgColor={'bg-[#F8B84E]'}
          showDefaultNumber={false}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={'Total Volume'}
          totalNumber={`$${verificationStats?.total_volume || 0}`}
          myImg={IMAGES.VolumeIcon}
          imgColor={'bg-[#FCE39C]'}
          showDefaultNumber={false}
        />
      </div>
      <div className="px-[10px] mt-[56px]  bg-[#FCE39C] rounded-[6px] text-black py-[4px] text-[14px] font-[500] inline-block">
        Condition
      </div>

      <div className="flex flex-wrap mt-[22px] justify-between items-center w-[98%]">
        <div className=" flex flex-col gap-8">
          {itemData &&
            itemData.map((item: any, index: number) => {
              return (
                <div className="flex gap-3 items-center">
                  <CustomSwitch
                    marginTop={'-5px'}
                    checked={state[item.title]}
                    setChecked={() => {
                      dispatch({ type: 'toggleSwitch', property: item.title });
                    }}
                  />
                  <p className="text-[15px] font-[500] text-black">
                    {item.title}
                  </p>
                </div>
              );
            })}
        </div>
        <div className="w-[380px] h-[320px] border border-inputBorder">
          <p className="pl-[10px] py-[10px] text-black text-[16px] font-[500]">
            Status
          </p>
          <hr className="border border-lightgray w-full" />
          <div className="flex flex-col items-center gap-5 pt-[22px]">
            <div style={{ width: 200, height: 200, overflow: 'hidden' }}>
              <CircularProgressbarWithChildren
                className="progress-bar"
                value={percentage}
                styles={styles}
              >
                <div className="percentage-text">{`${percentage}%`}</div>
                <div className="additional-text">{total}/5</div>
              </CircularProgressbarWithChildren>
            </div>
            <div className="flex gap-7">
              <div className="flex gap-2 items-center">
                <div className="w-[15px] h-[15px] rounded-[5px] bg-[#2E66C2]"></div>
                <p className="text-[15px] text-black">Pass</p>
              </div>
              <div className="flex gap-2 items-center">
                <div className="w-[15px] h-[15px] rounded-[5px] bg-[#FF8F6B]"></div>
                <p className="text-[15px] text-black">Fail</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      {!Pass ? (
        <>
          <div className="max-w-[50%] flex flex-col gap-8">
            <div className="flex justify-between  items-center ">
              <p className="text-[15px] font-[500] text-black">
                Item was not up to standard. Charge the seller 12% fee.
              </p>
              <CustomSwitch
                marginTop={'-5px'}
                checked={state.ItemStandardSwitch}
                setChecked={() => dispatch({ type: 'ItemStandardSwitch' })}
              />
            </div>
            <div>
              <CustomInputTextArea
                placeholder="Enter Reason For Failure"
                cols={69}
              />
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mt-[71px] mb-[50px] flex flex-col">
            <p className="text-[#656565] text-[15px]">
              Upload 6 photos, Front back side and 1 extra
            </p>
            <UploadPicture
              setImages={(value: any) => setImages(value)}
              IMAGEE={images}
              multipleImages={true}
            />
            <p className="text-[#656565] text-[12px]">
              Note : Picture Ratio Must be 1:1{' '}
            </p>
          </div>
        </>
      )}

      <div className="flex gap-3 mt-[35px]">
        <CheckBox checked={checked} setChecked={setChecked} />
        <p className="text-[15px] font-[500]">
          i cerify that the item was properly inspected and verified
        </p>
      </div>
      <CustomButton
        txt="Finish Verification"
        classes="!w-[179px] !h-[38px] !bg-[#3C82D6] !rounded-[6px] !text-[13px] !mt-[24px]"
        onClick={FinishVerification}
      />
    </div>
  );
};
