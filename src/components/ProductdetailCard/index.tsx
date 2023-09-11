import { useState, useRef, useEffect } from 'react';
import IMAGES from '../../assets/Images';
import { CustomMenu } from '../../atoms/global.style';
import { SVGIcon } from '../SVG/index.js';
import moment from 'moment';
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
                  console.log(props.id);
                  props.deleteProduct(props.id);
                }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ],
    },
  ];
  useEffect(() => {
    if (initial) {
      setInitial(false);
    } else {
      console.log(
        // "Menu",
        // MenuLabel,
        'product',
        CurrSelectedProduct,
      );
    }
  }, [CurrSelectedProduct]);
  return (
    <div className="border border-custom w-[363px] h-[auto] rounded-xl overflow-hidden">
      <div className="flex justify-between mt-2 px-4 items-center">
        <div className="flex gap-3 items-center">
          <p className="font-bold">{props.title}</p>
          <img src={IMAGES.New} />
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
      <div className="px-4 mb-3 flex justify-between">
        <div className="flex gap-4 ">
          <img src={IMAGES.personicon} />
          <p className="font-bold">Huzayfah Hanif</p>
        </div>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            onClick={(event: any) => {
              event.preventDefault();
              menuLeft.current.toggle(event);
            }}
            src={IMAGES.Dots}
          />

          <CustomMenu model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </div>
    </div>
  );
};
