import React, { useEffect, useState } from 'react';
import { Header } from '../../components';
import IMAGES from '../../assets/Images';
import { CustomButton } from '../../atoms';
import {
  getNotifications,
  readMyNotifications,
} from '../../store/Slices/UserSlice';
import moment from 'moment';
export const Notifications = () => {
  const [data, setdata] = useState<any>([]);
  const[dates,setdates]=useState<any>([])
  const GetNotifications = async () => {
    let r = await getNotifications();
    setdata(r);
    if(r){
      const uniqueDates = new Set();
      for (const obj of r) {
        const createdOnDate = obj.create_on.split("T")[0]; // Extract date part
        uniqueDates.add(createdOnDate); // Add to the Set
      }
      let uniqueDatesArray:any = [...uniqueDates];
    
      uniqueDatesArray.sort((a:any,b:any)=> new Date(b).getTime()- new Date(a).getTime())
     

      setdates(uniqueDatesArray)
    }
   
  };
  useEffect(() => {
    GetNotifications();
  }, []);

  const handleRead = async () => {
    await readMyNotifications();
  };

  return (
    <div>
      <Header UserBox={true} typeSearch={true} />
      <div className="mt-[30px] w-[96%] pb-[30px]">
        <div className="flex justify-between mb-[29px]">
          <p className="text-[16px] font-[700] text-black">Notifications</p>
          <p
            className="text-[16px] font-[700] text-blue"
            style={{
              cursor: 'pointer',
            }}
            onClick={handleRead}
          >
            Mark all as read
          </p>
        </div>
        <div className="flex flex-col gap-5">
         {dates.map((item:any,index:any)=>{
          let obj=data.filter((itm:any)=>{
            let dt=itm.create_on.split("T")[0]
            return dt==item
          })
         
          return(
            <React.Fragment key={index}>
              {obj.map((item:any,index:any)=>{
                return(
                  <div className="flex justify-between items-center mt-[] " key={index}>
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
                    {moment(item.create_on).format('DD,MM,YYYY')}
                  </p>
                </div>
                )
              })}
               <div className='flex justify-center'>
        <div className='!inline-block py-[0.6rem] px-6 border border-[black] rounded-[38px] font-bold'>
         {index==0?'Today':index==1?'Yesterday':moment(item).format('DD,MM,YYYY') }
          </div>
        </div>
            </React.Fragment>
          )
         })}
        
         <div>
       
         </div>
        </div>
      </div>
    </div>
  );
};
