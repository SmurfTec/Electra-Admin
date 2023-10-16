import React, { useState, useRef, useEffect } from 'react';
import { DashCard } from '../../../components';
import IMAGES from '../../../assets/Images';
import { CustomButton, CustomTableComponent } from '../../../atoms';
import { Header } from '../../../components';
import { InputTxt } from '../../../atoms';
import { SVGIcon } from '../../../components/SVG';
import { CustomMenu } from '../../../atoms/global.style';
import { MenuItem } from 'primereact/menuitem';
import {
  getSingleUser,
  GetAllUserOrder,
  GetUserAsks,
  GetUserStats,
  getSingleUserOrder,
} from '../../../store/Slices/UserSlice';
import { useParams } from 'react-router-dom';
import { Paginatior } from '../../../components';
import { useNavigate } from 'react-router-dom';
import { DeleteOrders } from '../../../store/Slices/OrderSlice';
import moment from 'moment';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useFetchUserOrder } from '../../../custom-hooks/useFetchUserOrder';
import { CustomCalendar } from '../../../atoms';
type UserInterface = {
  username: String;
  email: String;
  phone: String;
  date: String;
};
type InitialPageData = {
  rowsPerPage: Number;
  currentPage: Number;
  name: String;
  orderid: Number;
  date: String | Date | null;
};
export const UserProfile = () => {
  const params = useParams();
  const navigate = useNavigate();
  let { id } = params;
  const [UserData, setUserData] = useState<UserInterface>({
    username: '',
    email: '',
    phone: '',
    date: '',
  });
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 25,
    currentPage: 1,
    name: '',
    orderid: 0,
    date: '',
  });

  const [activetxt, setactivetxt] = useState('Active');
  const { orderData, orderLoading, stats } = useFetchUserOrder(
    id,
    activetxt == 'Active' ? '' : activetxt.toLowerCase(),
    initialPageData
  );
  const [search, setSearch] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [SearchDate, setSearchDate] = useState<any>('');
  const [userOrders, setuserOrders] = useState<any>();
  const [userLoading, setUserLoading] = useState<any>(false);
  const [sales, setsales] = useState({
    completed: 0,
    rejected: 0,
  });
  const [ButtonList, setButtonList] = useState([
    { id: 1, txt: 'Active', active: true },
    { id: 2, txt: 'Pending', active: false },
    { id: 3, txt: 'Completed', active: false },
  ]);
  const [Data, setData] = useState([
    { id: 1, txt: 'Active', title: 'No of Listings', body: '' },
    { id: 2, txt: 'Active', title: 'Gross Value', body: '' },
    // { id: 3, txt: 'Active', title: 'Net Value', body: '' },
    { id: 4, txt: 'Pending', title: 'Pending Sales', body: '5' },
    { id: 5, txt: 'Pending', title: 'Gross Value', body: '$2000' },
    { id: 6, txt: 'Pending', title: 'Net Value', body: '$2100' },
    { id: 7, txt: 'Completed', title: 'Total Sales', body: '20' },
    { id: 8, txt: 'Completed', title: 'Gross Value', body: '3' },
    { id: 9, txt: 'Completed', title: 'Net Value', body: '17' },
    { id: 10, txt: 'Completed', title: 'Total Points Earned', body: '1500' },
  ]);

  const handleButton = (id: any) => {
    const buttonfilter = ButtonList.map((item: any, index: any) => {
      if (item.id == id) {
        setactivetxt(item.txt);
        return {
          ...item,
          active: true,
        };
      } else {
        return {
          ...item,
          active: false,
        };
      }
    });
    setButtonList(buttonfilter);
  };

  const deleteItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    DeleteOrders(id);
    getUserOrder();
  };
  const viewItem = (event: any, id: any) => {
    event.stopPropagation();
    navigate('/Orders');
  };

  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({
      id,
      menuRef,
    }: {
      id: string;
      menuRef: React.RefObject<any>;
    }) => {
      let [items] = useState([
        {
          label: 'View Item',

          template: (item: any) => {
            return (
              <div
                onClick={event => viewItem(event, item)}
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Ban} /> View Item
              </div>
            );
          },
        },
        {
          label: 'Delete',
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: 'rgba(231, 29, 54, 0.05)' }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
                onClick={(event: any) => deleteItem(event, rowData.id)}
              >
                <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ]);

      return (
        <CustomMenu
          model={items}
          popup
          ref={menuRef}
          id="popup_menu_left"
          popupAlignment="left"
          height={'80px'}
        />
      );
    };
    const menuLeftRef = useRef<any>(null);
    const handleClick = (event: any) => {
      event.preventDefault();
      menuLeftRef.current?.toggle(event);
    };

    return (
      <>
        <div
          className={` px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />
          <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    let style;
    if (option.status === 'cancelled') {
      style = `px-[14px] py-[4px]
            text-center
            h-[33px]
             bg-custom-pink text-[black]
              max-w-[100px]
             mx-auto
              flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    } else {
      style = `px-[14px] py-[4px]
            text-center
            h-[33px]
             bg-custom-blue text-[black]
              max-w-auto
             mx-auto
              flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    }

    return (
      <>
        <div className={style}>
          <p className="font-bold">{option.status}</p>
        </div>
      </>
    );
  };
  const TrackingTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['trackingid']}</p>;
  };
  const OrderNoTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['id']}</p>;
  };
  const HighestOfferTemplate = (option: any) => {
    return (
      <p className="text-[#3C82D6]">
        {option['highestOffer'] > 0 && `$${option['highestOffer']}`}
      </p>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'ID' },
    { field: 'itemname', header: 'Item Name' },
    { field: 'askprice', header: 'Ask Price' },
    {
      field: 'highestOffer',
      header: 'Highest Offer',
      body: HighestOfferTemplate,
    },
    { field: 'listedon', header: 'Listed On' },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);
  const [PendingcolumnData] = useState([
    { field: 'id', header: 'ID' },
    { field: 'itemname', header: 'Item Name' },
    { field: 'saleprice', header: 'Sale Price' },
    { field: 'trackingid', header: 'Tracking No', body: TrackingTemplate },
    { field: 'updated_on', header: 'Sale Date' },
    { field: 'status', header: 'Status', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);
  const [CompletedcolumnData] = useState([
    { field: 'id', header: 'ID' },
    { field: 'itemname', header: 'Item Name' },
    { field: 'id', header: 'Order No', body: OrderNoTemplate },
    { field: 'updated_on', header: 'Sale Date' },
    { field: 'status', header: 'Status', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);
  const GetUserDetail = async () => {
    let response = await getSingleUser(id);
    setUserData({
      ...UserData,
      username:
        response?.profile?.firstname + ' ' + response?.profile?.lastname || '',
      email: response.email || '',
      phone: response.profile.mobile_no || '',
      date: moment(response.created_at).format('DD,MM,YYYY'),
    });
  };
  const getUserOrder = async () => {
    try {
      // let active=activetxt=="Active"?"":activetxt.toLowerCase()

      // let r=await getSingleUserOrder(id,active,initialPageData);

      // setuserStats(r.orderStats)
      // let order=r?.orders?.map((item:any)=>{
      //   let updatedOrders={
      //     ...item,
      //     itemname:item?.product?.title,
      //     askprice:item?.ask_price        ,
      //     highestOffer:item?.highest_offer,
      //     listedon:moment(item?.created_on).format("DD,MM,YYYY")      ,
      //   }
      //   return updatedOrders
      // })
      // setuserOrders(order)
      setUserLoading(true);
      let response = await GetUserAsks(id);

      setsales({
        completed: response?.data?.orderStats?.completed_sales || 0,

        rejected: response?.data?.orderStats?.rejected_sales || 0,
      });
      let newData = Data.map((item: any) => {
        if (item.id == 1) {
          return {
            ...item,
            body: response.askStats.no_of_listing,
          };
        } else if (item.id == 2) {
          return {
            ...item,
            body: response?.askStats?.gross_value || '$0',
          };
        } else if (item.id == 3) {
          return {
            ...item,
            body: response?.askStats?.net_value,
          };
        } else if (item.id == 4) {
          return {
            ...item,
            body: response?.askStats?.pending_sales || '$0',
          };
        } else if (item.id == 5) {
          return {
            ...item,
            body: response?.askStats?.gross_value_pending || '$0',
          };
        } else if (item.id == 6) {
          return {
            ...item,
            body: response?.askStats?.net_value_pending || '$0',
          };
        } else if (item.id == 7) {
          return {
            ...item,
            body: response?.askStats?.total_sales || '$0',
          };
        } else if (item.id == 8) {
          return {
            ...item,
            body: response?.askStats?.gross_value_completed || '$0',
          };
        } else if (item.id == 9) {
          return {
            ...item,
            body: response?.askStats?.net_value_completed || '$0',
          };
        } else if (item.id == 10) {
          return {
            ...item,
            body: (stats && stats[0]?.points_earned_buyer) || 0,
          };
        } else {
          return item;
        }
      });
      setData(newData);
      setUserLoading(false);
    } catch (err) {
      console.log(err, 'ERROR');
    }
  };
  useEffect(() => {
    let order = orderData?.map((item: any) => {
      let updatedOrders = {
        ...item,
        itemname: item?.product?.title,
        askprice: item?.ask_price,
        highestOffer: item?.highest_offer,
        listedon: moment(item?.created_on).format('DD,MM,YYYY'),
      };
      return updatedOrders;
    });
    setuserOrders(order);
  }, [orderData]);
  useEffect(() => {
    getUserOrder();
    GetUserDetail();
  }, [activetxt]);

  useEffect(() => {
    let isnum = /^\d+$/.test(search);
    if (isnum) {
      setInitialPageData({ ...initialPageData, orderid: Number(search) });
    } else {
      if (search.length == 0) {
        setInitialPageData({ ...initialPageData, orderid: 0, name: '' });
      } else {
        setInitialPageData({ ...initialPageData, orderid: 0, name: search });
      }
    }
  }, [search]);

  return (
    <div className="">
      <Header
        title="User Profile"
        semiTitle="View user profile and their stats"
        chooseFilter={false}
        UserBox={true}
      />
      <div className="flex flex-wrap gap-5 mt-[31px]">
        <div className=" w-[500px] h-[305px] border border-custom-border border-[#F7F7F8] rounded-[10px] flex flex-col pt-[11px] pb-[40px] pl-[17px] pr-[17px]">
          <div className="flex justify-between">
            <div className="flex flex-col gap-2">
              <h1 className="text-[24px] font-[600] text-[#212121] overflow-hidden">
                {UserData.username}
              </h1>
              <p className="text-[14px] font-[400] text-[#969696] overflow-hidden">
                {UserData.email}
              </p>
            </div>
          </div>
          <div className="flex justify-between mt-[46px]">
            <div className="flex flex-col">
              <h1 className="text-[14px] font-[500] text-[#969696] overflow-hidden">
                Joined On
              </h1>
              <p className="text-[14px] font-[400] text-[#212121] overflow-hidden">
                {UserData.date}
              </p>
            </div>
          </div>
          <hr className="w-full mt-[19px] border border-custom-border border-[#F7F7F8]" />
          <div className="flex justify-between mt-[19px]">
            <div className="flex flex-col">
              <h1 className="text-[14px] font-[500] text-[#969696] overflow-hidden">
                Phone No
              </h1>
              <p className="text-[14px] font-[400] text-[#212121] overflow-hidden">
                {UserData.phone}
              </p>
            </div>
          </div>
        </div>
        <div className="flex flex-wrap gap-6">
          <DashCard
            title={'Total Volume'}
            totalNumber={`${stats?.total_volume || 0}`}
            myImg={IMAGES.Volume}
            // imgColor={'bg-custom-grey'}
            // textDash={'bg-yellow-dash px-2 py-1 w-[6rem] '}
            // txt="20 aug,2022"
            // subtxt="Last Sale"
            // textColor={'#3C82D6'}
            outerclasses="!w-[284px] !h-[140px]"
          />
          <DashCard
            title={'Completed Sales'}
            totalNumber={`${stats?.completed_sales || 0}`}
            myImg={IMAGES.Sales}
            imgColor={'bg-custom-blue'}
            textDash={`${
              stats?.completed_sales_percentage >= 0
                ? 'bg-custom-blue'
                : 'bg-custom-red'
            }  w-[67px] `}
            textColor={
              stats?.completed_sales_percentage >= 0 ? '#3C82D6' : '#FF0000'
            }
            arrowImg={
              stats?.completed_sales_percentage >= 0
                ? IMAGES.uparrow
                : IMAGES.downarrow
            }
            outerclasses="!w-[284px] !h-[140px]"
            txt={stats?.completed_sales_percentage?.toFixed(2) || 0}
          />
          <DashCard
            title={'Rejected Sales'}
            totalNumber={`${stats?.rejected_sales || 0}`}
            myImg={IMAGES.RegectedSale}
            imgColor={'bg-[#F8B84E]'}
            textDash={`${
              stats?.rejected_sales_percentage >= 0
                ? 'bg-custom-blue'
                : 'bg-custom-red'
            }  w-[67px]`}
            textColor={
              stats?.rejected_sales_percentage >= 0 ? '#3C82D6' : '#FF0000'
            }
            arrowImg={
              stats?.rejected_sales_percentage >= 0
                ? IMAGES.uparrow
                : IMAGES.downarrow
            }
            outerclasses="!w-[284px] !h-[140px] !pb-[8px]"
            txt={stats?.rejected_sales_percentage?.toFixed(2) || 0}
          />
        </div>
      </div>

      <div className="w-[521px] mt-[21px] h-[61px] rounded-[10px] bg-lightgray flex item-center pt-[5px] pl-[5px] !shadow-custom-inset-shadow">
        {ButtonList.map((item: any, index: any) => {
          return (
            <React.Fragment key={index}>
              <CustomButton
                txt={item?.txt}
                onClick={(txt: any) => {
                  handleButton(item.id);
                }}
                classes={
                  item.active
                    ? '!h-[52px] !w-[164px] !font-[600] !rounded-[10px] !bg-[#FFFFFF] !shadow-custom-shadow !text-[black]'
                    : '!h-[52px] !w-[164px] !rounded-[10px] !bg-[transparent] !text-customTxt'
                }
              />
            </React.Fragment>
          );
        })}
      </div>
      <div className="flex flex-wrap gap-3 mt-[20px]">
        {!userLoading ? (
          Data.map((item: any, index: any) => {
            return (
              <React.Fragment key={index}>
                {item.txt == activetxt && (
                  <div
                    key={index}
                    className="w-[201px] h-[115px] bg-[#FFFFFF] border border-custom-cardBorder border-[#6565654A] pt-[19px] pl-[21px]"
                  >
                    <p className="text-[#656565] text-[14px] font-[500]">
                      {item.title}
                    </p>
                    <p className="text-[#111111] text-[32px] font-[700]">
                      {item.body}
                    </p>
                  </div>
                )}
              </React.Fragment>
            );
          })
        ) : (
          <div className="w-56 mt-[20px] h-full flex justify-start items-center overflow-y-hidden">
            <ProgressSpinner style={{ overflow: 'hidden' }} />
          </div>
        )}
      </div>

      {activetxt == 'Completed' && (
        <div className="flex mt-[30px] gap-3">
          <CustomButton
            txt={'Completed'}
            classes={'!h-[45px] !w-[276px] !rounded-[1px] !bg-blue !text-white'}
            value={`${sales.completed}`}
            valueclasses={'!bg-[#F1F1F1] !text-[black] ml-2'}
          />
          <CustomButton
            txt={'Rejected'}
            classes={
              '!h-[47px] !w-[276px] !rounded-[1px] !bg-[#F1F1F1] !text-[black]'
            }
            value={`${sales.rejected}`}
            valueclasses={'!bg-[#111111] !text-white ml-2'}
          />
        </div>
      )}
      <div className="mt-[27px] flex gap-4 flex-wrap">
        <InputTxt
          placeholder="Search by Id,name"
          MainClasses={`!bg-[#F1F1F1] !text-[#656565] !w-[27.7rem]`}
          img={IMAGES.Search}
          value={search}
          onChange={(e: any) => setSearch(e.target.value)}
          placeholdertxtColor="#656565"
        />
        <CustomCalendar
          img={IMAGES.FilterDate}
          inputbackground="#F1F1F1"
          value={initialPageData.date}
          setDate={(e: any) =>
            setInitialPageData({ ...initialPageData, date: e.value })
          }
          classes="!w-[10.5rem] !h-[72px] !pl-[5px] !pr-[10px]  !rounded-[8px] !bg-[#F1F1F1]"
          placeholder="Filter Date"
          MainClasses="!bg-[#F1F1F1] !text-[#656565] !w-[10.5rem] "
        />
        {/* <InputTxt
          placeholder="Filter Date"
          MainClasses={`!bg-[#F1F1F1] !text-[#656565] !w-[10.5rem]`}
          img={IMAGES.FilterDate}
          inputClasses={`!text-[#656565]`}
          placeholdertxtColor="#656565"


          iconRight={true}
        /> */}
      </div>
      {!orderLoading ? (
        <div className="mt-[38px]">
          <CustomTableComponent
            width={'60%'} //634px
            theadStyles={{ color: '#212121 !important', fontWeight: 'bold' }}
            showWrapper={false}
            filterData={userOrders}
            selectedProducts={selectedProducts}
            setSelectedProducts={setSelectedProducts}
            columnData={
              activetxt == 'Active'
                ? columnData
                : activetxt == 'Completed'
                ? CompletedcolumnData
                : PendingcolumnData
            }
            MultipleSelect={true}
            pagination={true}
          />
          <Paginatior
            totalRecords={stats?.total}
            initialPageData={initialPageData}
            setInitialPageData={setInitialPageData}
          />
        </div>
      ) : (
        <>
          <div className="w-full mt-[100px] h-full flex justify-start items-center overflow-y-hidden">
            <ProgressSpinner style={{ overflow: 'hidden' }} />
          </div>
        </>
      )}
    </div>
  );
};
