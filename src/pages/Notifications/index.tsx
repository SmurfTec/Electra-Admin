import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import IMAGES from '../../assets/Images';
import { CustomButton } from '../../atoms';
import { getNotifications } from '../../store/Slices/UserSlice';
import moment from 'moment';
export const Notifications = () => {
  const [data, setdata] = useState<any>([]);
  const GetNotifications = async () => {
    let r = await getNotifications();
    setdata(r);
    console.log(r);
  };
  useEffect(() => {
    GetNotifications();
  }, []);
  return (
    <div>
      <Header UserBox={true} typeSearch={true} />
      <div className="mt-[30px] w-[96%]">
        <div className="flex justify-between mb-[29px]">
          <p className="text-[16px] font-[700] text-black">Notifications</p>
          <p className="text-[16px] font-[700] text-blue">Mark all as read</p>
        </div>
        <div className="flex flex-col gap-5">
          {data.map((item: any) => {
            return (
              <>
                <div className="flex justify-between items-center mt-[] ">
                  <div className="flex items-center gap-3">
                    <img src={IMAGES.smphone} className="w-[46px] h-[46px]" />
                    <div className="flex flex-col gap-3">
                      <p className="font-[16px] text-black">{item.message}</p>
                      <div className="flex gap-3 items-center">
                        <p className="underline text-[14px] text-black font-[500]">
                          View
                        </p>
                        <div className="w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center">
                          {'>'}
                        </div>
                      </div>
                    </div>
                  </div>
                  <p className="text-[#969696] font-[14px]">
                    {moment(item.created_on).format('DD,MM,YYYY')}
                  </p>
                </div>
              </>
            );
          })}
        </div>

        {/* <div className='flex justify-between items-center mt-[30px]'>
                <div className='flex items-center gap-3'>
                    <img src={IMAGES.lguser} className='w-[46px] h-[46px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='font-[16px] text-black'>New User Registered</p>
                        <div className='flex gap-3 items-center'>
                            <p className='underline text-[14px] text-black font-[500]'>View</p>
                            <div className='w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center'>{">"}</div>
                        </div>

                    </div>

                </div>
                <p className='text-[#969696] font-[14px]'>22 Aug,2022</p>
            </div>
            <div className='flex justify-between items-center mt-[30px]'>
                <div className='flex items-center gap-3'>
                    <img src={IMAGES.cart} className='w-[46px] h-[46px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='font-[16px] text-black'>New Order Placed</p>
                        <div className='flex gap-3 items-center'>
                            <p className='underline text-[14px] text-black font-[500]'>View</p>
                            <div className='w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center'>{">"}</div>
                        </div>

                    </div>

                </div>
                <p className='text-[#969696] font-[14px]'>22 Aug,2022</p>
            </div>
          <div className='flex justify-center mt-[70px]'>
          <CustomButton txt="Yesterday" classes="!w-[100px] !rounded-[20px] !h-[40px] !flex !justify-center !items-center !text-[14px] !font-[600]  !border !text-black !bg-white !inline-block  "/>
          </div>
          <div className='flex justify-between items-center mt-[30px] '>
                <div className='flex items-center gap-3'>
                    <img src={IMAGES.smphone} className='w-[46px] h-[46px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='font-[16px] text-black'>New Listings by <span className='text-blue'>Huzayfah Hanif </span></p>
                        <div className='flex gap-3 items-center'>
                            <p className='underline text-[14px] text-black font-[500]'>View</p>
                            <div className='w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center'>{">"}</div>
                        </div>

                    </div>

                </div>
                <p className='text-[#969696] font-[14px]'>22 Aug,2022</p>
            </div>
            <div className='flex justify-between items-center mt-[30px]'>
                <div className='flex items-center gap-3'>
                    <img src={IMAGES.lguser} className='w-[46px] h-[46px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='font-[16px] text-black'>New User Registered</p>
                        <div className='flex gap-3 items-center'>
                            <p className='underline text-[14px] text-black font-[500]'>View</p>
                            <div className='w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center'>{">"}</div>
                        </div>

                    </div>

                </div>
                <p className='text-[#969696] font-[14px]'>22 Aug,2022</p>
            </div>
            <div className='flex justify-between items-center mt-[30px]'>
                <div className='flex items-center gap-3'>
                    <img src={IMAGES.cart} className='w-[46px] h-[46px]'/>
                    <div className='flex flex-col gap-3'>
                        <p className='font-[16px] text-black'>New Order Placed</p>
                        <div className='flex gap-3 items-center'>
                            <p className='underline text-[14px] text-black font-[500]'>View</p>
                            <div className='w-[18px] h-[18px] bg-black text-white text-[12px] rounded-[50px] flex justify-center items-center'>{">"}</div>
                        </div>

                    </div>

                </div>
                <p className='text-[#969696] font-[14px]'>22 Aug,2022</p>
            </div>
          <div className='flex justify-center mt-[70px]'>
          <CustomButton txt="23 Aug,2022" classes="!w-[120px] !rounded-[20px] !h-[40px] !flex !justify-center !items-center !text-[14px] !font-[600]  !border !text-black !bg-white !inline-block  "/>
          </div> */}
      </div>
    </div>
  );
};
