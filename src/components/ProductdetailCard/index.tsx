import moment from 'moment';
import { Button } from 'primereact/button';
import { useEffect, useRef, useState } from 'react';
import IMAGES from '../../assets/Images';
import { CustomMenu } from '../../atoms/global.style';
import { SVGIcon } from '../SVG/index.js';
export const Productdetailcard = (props: any) => {
  const [ViewMore, SetViewMore] = useState(true);
  const menuLeft: any = useRef(null);
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState({});
  const [initial, setInitial] = useState(true);

  const items = [
    {
      items: [
        {
          label: 'Delete',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                onClick={(event: any) => {
                  props.deleteProduct(props.id);
                }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
        {
          label: 'approved',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(60, 130, 214, 0.05)' }}
                onClick={(event: any) => {
                  props.changeStatus(props.id, 'approved');
                }}
                className="flex w-full gap-1  items-center text-[10px] font-[400] text-[#3C82D6]"
              >
                <SVGIcon
                  fillcolor={'#3C82D6'}
                  width="8px"
                  height="fit-content"
                  s
                  src={IMAGES.bluetick}
                />
                Approve
              </div>
            );
          },
        },
        {
          label: 'rejected',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(251,187,0, 0.05)' }}
                onClick={(event: any) => {
                  props.changeStatus(props.id, 'rejected');
                }}
                className="flex w-full gap-1  items-center text-[10px] font-[400] text-[#FBBB00]"
              >
                <SVGIcon
                  fillcolor={'#FBBB00'}
                  width="8px"
                  height="fit-content"
                  src={IMAGES.Cross}
                />
                Reject
              </div>
            );
          },
        },
        {
          label: 'Completed',
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{
                  background: 'rgb(78, 154, 6,0.05)',
                }}
                onClick={(event: any) => {
                  props.changeStatus(props.id, 'completed');
                }}
                className="flex w-full gap-1  items-center text-[10px] font-[400] text-[#4e9a06]"
              >
                <SVGIcon
                  fillcolor={'#4e9a06'}
                  width="8px"
                  height="fit-content"
                  src={IMAGES.Completed}
                />
                Completed
              </div>
            );
          },
        },
      ],
    },
  ];
  useEffect(() => {
    if (initial) setInitial(false);
  }, [CurrSelectedProduct]);
  return (
    <div className="border border-custom w-[363px] h-[auto] rounded-xl overflow-hidden">
      <div className="flex justify-between mt-2 px-4 items-center">
        <div className="flex gap-3 items-center">
          <p className="font-bold">{props.title}</p>
          <img
            src={
              props.prodStatus === 'pending'
                ? IMAGES.New
                : props.prodStatus === 'rejected'
                ? IMAGES.greencross
                : props.prodStatus === 'approved'
                ? IMAGES.bluetick
                : props.prodStatus === 'completed'
                ? IMAGES.Completed
                : IMAGES.person
            }
            style={{
              width: '20px',
              height: 'fit-content',
            }}
          />
          {/* <img src={IMAGES.New} /> */}
        </div>
        <p className="font-light text-[12px] text-[#656565]">
          {moment(props.created).format('DD MMM, YYYY')}
        </p>
      </div>
      <div className="overflow-hidden h-auto">
        <p
          className={`p-4 font-medium text-[#656565] 
        
        ${
          ViewMore == false
            ? 'h-auto overflow-hidden  break-words'
            : 'h-[110px]  text-ellipsis overflow-hidden '
        }`}
        >
          {props.text}{' '}
        </p>
        {props.text.length > 50 && (
          <span
            className={`cursor-pointer px-4 font-medium text-[#3C82D6] "}`}
            onClick={() => {
              SetViewMore(!ViewMore);
            }}
          >
            {ViewMore ? '... View more' : 'Collapse'}
          </span>
        )}
      </div>
      <div className="px-4 mb-3 flex justify-between h-[46px]">
        <div className="flex gap-4 flex-1 items-center">
          <img src={IMAGES.personicon} />
          <p className="font-bold flex-1">
            {props.userInfo.firstname
              ? `${props.userInfo.firstname} ${props.userInfo.lastname}`
              : ''}
          </p>
        </div>
        {props.prodStatus !== 'completed' && (
          <div
            className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
          >
            <Button
              icon="pi pi-ellipsis-h"
              rounded
              text
              severity="secondary"
              aria-label="Action"
              className="font-extrabold text-black"
              onClick={(event: any) => {
                event.preventDefault();
                menuLeft.current.toggle(event);
              }}
            />

            <CustomMenu
              height="fit-content"
              model={items}
              popup
              ref={menuLeft}
              id="popup_menu_left"
            />
          </div>
        )}
      </div>
    </div>
  );
};
