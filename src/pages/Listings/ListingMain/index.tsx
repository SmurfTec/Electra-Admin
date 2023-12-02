/* eslint-disable react-hooks/exhaustive-deps */
import moment from 'moment';
import { Button } from 'primereact/button';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel } from 'primereact/tabview';
import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton, CustomTableComponent } from '../../../atoms';
import { CustomMenu, CustomTabView } from '../../../atoms/global.style';
import { Confirmationmodal, Header, Paginatior } from '../../../components';
import { SVGIcon } from '../../../components/SVG';
import { useListingDetail } from '../../../custom-hooks';
import {
  flagListing,
  setListingCount,
} from '../../../store/Slices/ListingsSlice';
export const Listings = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [actIndex, setActIndex] = useState(0);
  const [totalList, setTotalList] = useState();
  const { data, listLoad } = useListingDetail(initialPageData);
  const [visible, setVisible] = useState(false);
  const [listings, setListings] = useState<any>([
    {
      name: '',
      data: [],
    },
  ]);
  const [MenuLabel, setMenuLabel] = useState('');
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState({});
  const [initial, setInitial] = useState(true);
  const [selectedListing, setSelectedListing] = useState<any>([]);
  const getListings = async () => {
    const soldItems: any = [];
    const unsoldItems: any = [];
    const flagged: any = [];
    const All: any = [];
    setTotalList(data?.data?.stats.all_listings);
    dispatch(setListingCount(data?.data?.stats.all_listings));
    data?.data?.listings?.forEach((item: any) => {
      const newObj = {
        ...item,
        id: item.id,
        Account: item?.user.firstname + item?.user.lastname,
        ItemName: item.product_data.title,
        Ask: item.ask,
        'Lwst Offer': item.lowest_offer ?? '-',
        'Hgst Offer': item.highest_offer ?? '-',
        'Sale Price': item.saleprice ? `$ ${item.saleprice}` : '-',
        'Listed On': moment(item?.created_on).format('DD MMM, YYYY'),
        Role: item.is_active ? 'Unsold' : 'Sold',
      };
      All.push(newObj);
      if (item.is_flagged) {
        flagged.push(newObj);
      }
      if (item.is_active) {
        unsoldItems.push(newObj);
      } else if (!item.is_active) {
        soldItems.push(newObj);
      }
    });
    setListings([
      { name: 'All', data: All, value: data?.data?.stats.all_listings },
      { name: 'sold', data: soldItems, value: data?.data?.stats.sold },
      {
        name: 'not sold',
        data: unsoldItems,
        value: data?.data?.stats.unsold,
      },
      { name: 'flagged', data: flagged, value: data?.data?.stats.flagged },
    ]);
  };
  useEffect(() => {
    getListings();
  }, [data]);
  const viewItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();

    setMenuLabel(prevLabel => (prevLabel === item.label ? '' : item.label));
  };
  const flagListings = async () => {
    try {
      const newarr = selectedListing.map((item: any) => {
        return item.id;
      });
      const body = {
        is_flagged: true,
        ids: newarr,
      };
      const flag = await flagListing(body);
      if (flag) {
        setVisible(true);
        setSelectedListing([]);
      }
    } catch (e) {
      console.log('e', e);
    }
  };
  const items = [
    {
      items: [
        {
          label: 'View',
          // command: handleBanUser,
          template: (item: any) => {
            return (
              <div
                onClick={(event: any) =>
                  viewItem(event, item, CurrSelectedProduct)
                }
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Ban} /> View listings
              </div>
            );
          },
        },
      ],
    },
  ];

  const AccountBodyTemplate = (option: any) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <img src={IMAGES.Guy1} />
        <p className="font-bold">{option.Account}</p>
      </div>
    );
  };
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
      menuLeft.current.toggle(event);
    };
    useEffect(() => {
      if (initial) {
        setInitial(false);
      } else {
      }
    }, [MenuLabel, CurrSelectedProduct]);
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px] h-fit`}
        >
          <Button
            icon="pi pi-ellipsis-h"
            rounded
            text
            severity="secondary"
            aria-label="Action"
            className="font-extrabold text-black"
            onClick={handleClick}
          />
          {/* <SVGIcon onClick={handleClick} src={IMAGES.Dots} /> */}
          <CustomMenu
            model={items}
            popup
            ref={menuLeft}
            id="popup_menu_left"
            height="fit-content"
          />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    console.log('option', option);
    let style;
    if (option.Role === 'Sold') {
      style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-blue text-[black]
           max-w-[100px]
           mx-auto
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    } else if (option.Role === 'Unsold') {
      style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-pink text-[black]
           max-w-[100px]
           mx-auto
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    }
    return (
      <>
        <div className={style}>
          <p className="font-bold">{option.Role}</p>
        </div>
      </>
    );
  };
  const SalesTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['Sale Price']}</p>;
  };
  const columnData = [
    { field: 'id', header: 'ID' },
    { field: 'Account', header: 'Account', body: AccountBodyTemplate },
    { field: 'ItemName', header: 'ItemName' },
    { field: 'Ask', header: 'Ask' },
    { field: 'Lwst Offer', header: 'Lwst Offer' },
    { field: 'Hgst Offer', header: 'Hgst Offer' },
    { field: 'Sale Price', header: 'Sale Price', body: SalesTemplate },
    { field: 'Listed On', header: 'Listed On' },
    { field: 'Role', header: 'Role', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ];
  useEffect(() => {
    if (MenuLabel == 'View') {
      navigate(`/ListingsDetail/${CurrSelectedProduct}`);
    } else {
      // console.log(
      //   'Menu',
      //   MenuLabel,
      //   'product',
      //   // selectedProducts,
      //   'CurrSelectedProduct',
      //   CurrSelectedProduct
      // );
    }
  }, [MenuLabel]);

  return (
    <div>
      <Header placeholder="Search Admins" typeSearch={true} UserBox={true} />

      <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
        <div>
          <p className="font-bold p-4 text-[19px]">
            Listings <br />
            <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
              Check All the Listings
            </span>
          </p>
          {!listLoad ? (
            <>
              <div className="flex gap-8 px-4 border-b border-custom "></div>
              <CustomTabView
                activeIndex={actIndex}
                onTabChange={e => {
                  setActIndex(e.index);
                }}
                className="!bg-[#FCFCFC]"
              >
                {listings.map((item: any, index: number) => {
                  return (
                    <TabPanel
                      key={index}
                      header={`${item.name}(${item?.data?.length || 0})`}
                    >
                      <CustomTableComponent
                        colume={{ backgroundColor: '#FCFCFC !important' }}
                        headerStyle={{
                          color: 'black',
                          fontWeight: '800',
                          backgroundColor: '#FCFCFC',
                        }}
                        selectedProducts={selectedListing}
                        setSelectedProducts={setSelectedListing}
                        filterData={item.data}
                        columnData={columnData}
                        rowStyling={'#FCFCFC !important'}
                        MultipleSelect={true}
                      />
                    </TabPanel>
                  );
                })}
              </CustomTabView>
            </>
          ) : (
            <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
              <ProgressSpinner style={{ overflow: 'hidden' }} />
            </div>
          )}
        </div>
      </div>
      <div>
        <CustomButton
          onClick={() => {
            flagListings();
          }}
          iconLeft={<img src={IMAGES.Flag} />}
          classes="!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]"
          txt="Mark for review"
          isDisabled={selectedListing.length === 0}
        />
      </div>
      <Paginatior
        totalRecords={listings[actIndex].value}
        initialPageData={initialPageData}
        setInitialPageData={setInitialPageData}
        // recordShowing={
        //   listings && actIndex > 0
        //     ? listings[actIndex].data?.length
        //     : listings[0]?.length
        // }
        recordShowing={Math.min(
          initialPageData.currentPage * initialPageData.rowsPerPage,
          listings[actIndex].value
        )}
      />
      <Confirmationmodal
        PopupHeader={'Confirmation'}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={'ok'}
        cnclebtnText={'Cancel'}
        text={'Listings flagged'}
        setOkButton={() => {
          setVisible(false);
        }}
        setCancelButton={() => {
          setVisible(false);
        }}
      />
    </div>
  );
};
