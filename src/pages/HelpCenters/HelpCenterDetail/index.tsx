import React, { useState, useRef, useEffect } from 'react';
import { Header } from '../../../components';
import { CustomButton, InputTxt } from '../../../atoms';
import { SVGIcon } from '../../../components/SVG';
import IMAGES from '../../../assets/Images';
import { CustomMenu } from '../../../atoms/global.style';
import { useParams } from 'react-router-dom';
import {
  getSupportById,
  ChangeSupportStatus,
  DeleteSupport,
  ReplySupportCenter,
} from '../../../store/Slices/HelpCenterSlice';
import { SuccessModel } from '../../../components';
import { useNavigate } from 'react-router-dom';
export const HelpCenterDetail = () => {
  const menuLeft: any = useRef(null);
  const navigate = useNavigate();
  const [visible, setvisible] = useState(false);
  const { id } = useParams();
  const [detail, setDetail] = useState<any>({});
  const [Reply, setReply] = useState('');
  const ChangeStatus = async (event: React.MouseEvent, item: any) => {
    try {
      event.preventDefault();
      const body = {
        status: 'resolved',
      };
      let r = await ChangeSupportStatus(id, body);

      if (r) {
        getDetail();
      }
    } catch (err) {}
  };
  const Delete = async (event: any, item: any) => {
    try {
      event.preventDefault();

      let r = await DeleteSupport(id);
      setvisible(true);
      setTimeout(() => {
        navigate('/HelpCenter');
      }, 1000);
    } catch (err) {}
  };
  const ReplySupport = async (e: any) => {
    e.preventDefault();

    try {
      let body = {
        message: Reply,
      };
      let r = await ReplySupportCenter(id, body);
      getDetail();
    } catch (err) {}
  };
  const [items, setItems] = useState([
    {
      label: 'Mark Solved',

      template: (item: any) => {
        return (
          <div
            onClick={event => ChangeStatus(event, item)}
            style={{ backgroundColor: 'rgba(60, 130, 214, 0.05) ' }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
          >
            <SVGIcon fillcolor={'#3C82D6'} src={IMAGES.pending} /> Mark Solved
          </div>
        );
      },
    },
    {
      label: 'Delete',
      template: (item: any) => {
        return (
          <div
            onClick={event => Delete(event, item)}
            style={{ background: 'rgba(231, 29, 54, 0.05)' }}
            className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
          >
            <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
          </div>
        );
      },
    },
  ]);

  const handleClick = (event: any) => {
    menuLeft.current.toggle(event);
  };
  const getDetail = async () => {
    try {
      let response = await getSupportById(id);
      console.log(response, 'response');
      setDetail(response.support);
    } catch (err) {}
  };
  useEffect(() => {
    getDetail();
  }, []);

  return (
    <div>
      <SuccessModel
        visible={visible}
        setVisible={setvisible}
        txt="Deleted Successfully"
      />
      <Header chooseFilter={true} typeSearch={true} UserBox={true} />
      <div className="w-[98%] h-auto border border-inputBorder rounded-[7px] mt-[35px] ">
        <div className="flex justify-between pt-[21px] pb-[18px] items-center border-b border-inputBorder px-[39px]">
          <p className="text-[20px] font-[600]">Help (ID #{detail.id})</p>
          <div className="flex gap-4 items-center">
            <CustomButton
              txt={detail.status}
              classes={`!w-auto px-[32px] !h-auto !py-[6px] !rounded-[22px] ${
                detail.status == 'resolved' ? '!bg-[#3C82D6]' : ''
              } `}
            />
            <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
            <CustomMenu
              popupAlignment="left"
              height={'80px'}
              model={items}
              popup
              ref={menuLeft}
              id="popup_menu_left"
            />
          </div>
        </div>
        <div className="w-[33.5rem] relative flex flex-col gap-12 pt-[24px] pl-[28px] pb-[38px] mt-[22px] ml-[39px] h-auto bg-white rounded-[7px] shadow-md">
          <div className="flex justify-between items-center w-[20rem]">
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                FIRSTNAME
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail.firstname}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                LASTNAME
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail.lastname}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-[20rem]">
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                Email
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail?.email}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                Phone No
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail.phone}
              </p>
            </div>
          </div>
          <div className="flex justify-between items-center w-[20rem]">
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                Order No
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail?.order?.id}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                Category
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail?.category}
              </p>
            </div>
          </div>
          <div className=" w-[25rem] h-auto">
            <div className="flex flex-col gap-1">
              <p className="text-black font-[600] text-[12px] uppercase">
                Message
              </p>
              <p className="text-[#000000] font-[600] text-[14px]">
                {detail?.message}
              </p>
            </div>
          </div>
          <p className="text-[11px] font-[500] absolute bottom-4 right-5 text-[#A4A4A4]">
            10.00 PM
          </p>
        </div>
        {detail?.replies?.length !== 0 &&
          detail?.replies !== null &&
          detail?.replies?.map((item: any, index: any) => {
            return (
              <div
                key={index}
                className="w-[33.5rem] text-[14px] pr-[47px] font-[400] leading-[26px] relative pt-[24px] pl-[28px] pb-[56px] h-auto bg-black text-white mt-[22px] ml-[39px] rounded-[7px]"
              >
                {item?.message}
                <p className="text-[11px] font-[500] absolute bottom-2 right-5 text-[#A4A4A4]">
                  10.00 PM
                </p>
              </div>
            );
          })}
        {/* <div className='flex gap-3 justify-center items-center mt-[46px]'>
        <hr className="w-[18.5rem] border-[#A4A4A4]" />
        <CustomButton txt="Solved" classes="!w-auto !bg-blue !text-white px-[32px] !h-auto !py-[6px] !rounded-[22px] "  />
        <hr className="w-[18.5rem] border-[#A4A4A4]" />
        </div> */}
        <div className="pt-[114px] pl-[39px] pr-[39px] pb-[39px]">
          <InputTxt
            placeholder="Type Reply here"
            MainClasses="!bg-[#FFFFFF] pointer !shadow-input-shadow !rounded-[8px] border !border-inputBorder !w-full !h-[91px] !pr-[0px]"
            iconLeft={true}
            LeftIcon={IMAGES.Ring}
            iconRight={true}
            IconRightClick={ReplySupport}
            img={IMAGES.Send}
            value={Reply}
            onChange={(e: any) => setReply(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};
