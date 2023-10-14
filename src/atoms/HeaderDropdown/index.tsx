import React from 'react';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../assets/Images';
import { readMyNotifications } from '../../store/Slices/UserSlice';

export const HeaderDropDown = (props: any) => {
  const navigate = useNavigate();
  const handleReadMyNotifications = async () => {
   let r= await readMyNotifications();
   console.log(r,"notification")
  };
  return (
    <div
      className={`${props.className} z-10 `}
      style={{ border: '1px solid rgba(0, 0, 0, 0.06)' }}
    >
      <div className="flex justify-between p-4">
        <p className="text-[19px] font-bold">Notifications</p>
        <p
          className="text-[#3C82D6] items-center text-[15px] font-semibold"
          style={{
            cursor: 'pointer',
          }}
          onClick={handleReadMyNotifications}
        >
          Mark all as read
        </p>
      </div>
      <div className="border border-custom"></div>
      {props.notification ?
      <>
        <div className="flex px-3 py-2 gap-7">
        <div className="flex gap-3">
          <div>
            <img src={IMAGES.Iphone22} />
          </div>
          <div>
            <p className="flex gap-2 font-bold">
              New listing by <p className="text-[#3C82D6] ">Huzayfah Hanif</p>
            </p>
            <div className="flex gap-2">
              <p className="underline">View </p>
              <span className="bg-[black] overflow-hidden items-center text-[white] h-5 rounded-full w-5 flex justify-center mt-1">
                {' '}
                {'>'}
              </span>
            </div>
          </div>
        </div>

        <div className="pt-2 mt-5 ">
          <p className="text-[#969696] text-[10px]"> 22 Aug 2023</p>
        </div>
      </div>
      <div className="my-1 border border-custom"></div>
     
      </>
      :
      <>
      <div className='flex justify-center items-center mt-[20px]'>
      <p className="flex text-center gap-2 font-bold">
             No New Notifications
            </p>
      </div>
      </>
      }
    
    <p
        onClick={() => navigate('/Notifications')}
        className="text-center py-2 text-[#3C82D6] font-bold cursor-pointer"
      >
        View All
      </p>
     

      
    </div>
  );
};
