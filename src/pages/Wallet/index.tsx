import React, { useState, useRef, useEffect } from 'react';
import { Header, DashCard } from '../../components';
import { CustomTableComponent } from '../../atoms';
import { SVGIcon } from '../../components/SVG';
import { MenuItem } from 'primereact/menuitem';
import IMAGES from '../../assets/Images';
import { CustomMenu } from '../../atoms/global.style';
import { useFetchWallet } from '../../custom-hooks/useFetchWallet';
import {
  getBalance,
  getWalletStats,
  getPayouts,
  getTransfers,
  getPayments,
} from '../../store/Slices/WalletSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { CustomTabView } from '../../atoms/global.style';
import { TabPanel } from 'primereact/tabview';
import moment from 'moment';
export const Wallet = () => {
  const [initialData, setinitialData] = useState({
    limit: 10,
    activetab: 'payout',
    starting_after: '',
  });
  const { Walletdata, WalletLoading } = useFetchWallet(initialData);
  const [bankloader, setbankloader] = useState(false);
  const [MenuLabel, setMenuLabel] = useState('');
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState('');
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [LoadMore, setLoadMore] = useState(false);
  const [AccountBalance, setAccountBalance] = useState<any>();
  const [WalletStats, setWalletStats] = useState<any>();
  const menuLeft: any = useRef(null);
  const [activeTab, setactiveTab] = useState(0);
  const [filterData, setfilterData] = useState<any>();

  useEffect(() => {
  
    if (initialData.activetab == 'transfer') {
      const newfilterData = Walletdata?.map((item: any, index: any) => {
        return {
          id: item.id,
          from: '',
          value: '$' + item.amount,
          Source: item.source_type,
          Date: moment(item.created).format('DD/MM/YYYY'),
        };
      });
      setfilterData(newfilterData);
    } else if (initialData.activetab == 'payouts') {
      console.log(Walletdata)
      const newfilterData = Walletdata?.map((item: any, index: any) => {
        return {
          id: item.id,
          from: '',
          value: '$' + item.amount,
          Source: item.source_type,
          Date: moment(item.created).format('DD/MM/YYYY'),
        };
      });
      setfilterData(newfilterData);
    } else {
      const newfilterData = Walletdata?.map((item: any, index: any) => {
        let newDate = moment(item.created).format('DD MMM YYYY');
        return {
          id: item.id,
          from: '-',
          value: '$' + item.amount,
          Source: item.source ?? '-',
          Date: newDate,
        };
      });
      setfilterData(newfilterData);
    }
  }, [Walletdata]);
  const items = [
    {
      label: 'View Item',

      template: (item: any) => {
        return (
          <div
            onClick={event => deleteItem(event, item)}
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
      template: (item: MenuItem) => {
        return (
          <div
            onClick={event => deleteItem(event, item)}
            style={{ background: 'rgba(231, 29, 54, 0.05)' }}
            className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
          >
            <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
          </div>
        );
      },
    },
  ];

  const deleteItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel(prevLabel => (prevLabel === item.label ? '' : item.label));
  };
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
      // setSelectedProducts([rowData])
      menuLeft.current.toggle(event);
    };
    return (
      <>
        <div
          className={` px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
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
      </>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'TID' },
    { field: 'from', header: 'From' },
    { field: 'value', header: 'Value' },
    { field: 'Source', header: 'Source' },
    // { field: 'Date', header: 'Date' },
    // { field: "", header: '', body: MenuBodyTemplate }
  ]);
  useEffect(() => {
    console.log(
      'Menu',
      MenuLabel,
      'product',
      selectedProducts,
      'CurrSelectedProduct',
      CurrSelectedProduct,
    );
  }, [MenuLabel]);
  const Balance = async () => {
    setbankloader(true);
    let balance = await getBalance();
    
    setAccountBalance(balance);
    let walletstats = await getWalletStats();

    if (walletstats) {
      setbankloader(false);
    }
   
    setWalletStats(walletstats);
    // let r3=await getPayouts()
    // let r4=await getPayments()
    // let r5=await getTransfers()

    // // console.log(r2,"r2")
    // console.log(r3,"r3")
    // console.log(r4,"r4",r5,"r5")
  };
  useEffect(() => {
    Balance();
  }, []);
  const handleTabChange = (event: any) => {
    setactiveTab(event?.index);
    if (event?.index == 0) {
      setinitialData({
        ...initialData,
        activetab: 'payout',
        starting_after: '',
      });
    } else if (event?.index == 1) {
      setinitialData({
        ...initialData,
        activetab: 'payment',
        starting_after: '',
      });
    } else if (event?.index == 2) {
      setinitialData({
        ...initialData,
        activetab: 'transfer',
        starting_after: '',
      });
    }
  };
 
  return (
    <div>
      <Header typeSearch={true}  UserBox={true} />
      {!WalletLoading && !bankloader ? (
        <>
          {/* <div className="flex flex-wrap gap-5 mt-[20px]">
            <div
              className="p-3 w-[419px] h-auto bg-[#212121] rounded-[10px] overflow-hidden"
              style={{ background: `url(${IMAGES.AtmBackground})` }}
            >
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p className="text-[16px] font-[600] text-white">Balance</p>
                  <p className="text-[35px] font-[600] text-white">
                    ${AccountBalance?.available[0].amount}
                  </p>
                  <div className="flex flex-col mt-[80px]">
                    <p className="text-[13px] font-[600] text-white">
                      Last Updated
                    </p>
                    <p className="text-[16px] font-[600] text-white">
                      20,aug,2022
                    </p>
                  </div>
                </div>
                <div className="flex items-center justify-center ">
                  <img src={IMAGES.Coins} />
                </div>
              </div>
            </div>
            <div className="p-3 w-[419px] h-auto bg-[#212121] rounded-[15px]">
              <div className="flex justify-between">
                <div className="flex flex-col ">
                  <p className="text-[12px] font-[600] text-white">
                    Account holder name
                  </p>
                  <p className="text-[20px] font-[600] text-white">
                    HUZAYFAH HANIF
                  </p>
                </div>
                <div className="w-[33px] h-[33px] flex justify-center items-center rounded-[50px] bg-white">
                  <i className="pi pi-pencil "></i>
                </div>
              </div>
              <div className="mt-[34px] flex flex-col ">
                <p className="text-[12px] font-[600] text-white">IBAN</p>
                <p className="text-[20px] font-[600] text-white">
                  KFL35532536353535
                </p>
              </div>
              <div className="flex gap-[76px] mt-[34px]">
                <div className="flex flex-col ">
                  <p className="text-[20px] font-[400] text-white">US BANK</p>
                  <p className="text-[12px] font-[400] text-white">Bank</p>
                </div>
                <div className="flex flex-col ">
                  <p className="text-[20px] font-[400] text-white">25/7/2022</p>
                  <p className="text-[12px] font-[400] text-white">linked on</p>
                </div>
              </div>
            </div>
          </div> */}
          <div className="mt-[35px]">
            <div className="flex flex-wrap gap-6 mt-[28px]">
              <DashCard
                title={'Net Revenue'}
                totalNumber={`$${WalletStats?.grossRevenue || 0}`}
                myImg={IMAGES.coin}
                imgColor={'bg-blue-dash'}
                textDash={`${
                  WalletStats?.grossRevenuePercentage >= 0
                    ? 'bg-custom-blue'
                    : 'bg-custom-red'
                } !w-[63px] `}
                textColor={
                  WalletStats?.grossRevenuePercentage >= 0
                    ? '#3C82D6'
                    : '#FF0000'
                }
                arrowImg={
                  WalletStats?.grossRevenuePercentage >= 0
                    ? IMAGES.uparrow
                    : IMAGES.downarrow
                }
                outerclasses="w-[284px] h-[140px]"
                txt={WalletStats?.grossRevenuePercentage || 0}
              />
              <DashCard
                title={'Platform Profit'}
                totalNumber={`$${WalletStats?.grossProfit || 0}`}
                myImg={IMAGES.DollorHouse}
                imgColor={'bg-yellow-dash'}
                textDash={`${
                  WalletStats?.grossProfitPercentage >= 0
                    ? 'bg-custom-blue'
                    : 'bg-custom-red'
                } !w-[63px] `}
                textColor={
                  WalletStats?.grossProfitPercentage >= 0
                    ? '#3C82D6'
                    : '#FF0000'
                }
                arrowImg={
                  WalletStats?.grossProfitPercentage >= 0
                    ? IMAGES.uparrow
                    : IMAGES.downarrow
                }
                outerclasses="w-[284px] h-[140px]"
                txt={WalletStats?.grossProfitPercentage || 0}
              />
              {/* <DashCard
                title={'Withdrawn'}
                totalNumber={'$3500'}
                myImg={IMAGES.Volume}
                imgColor={'bg-custom-grey'}
                textDash={'bg-yellow-dash !w-[90px] px-1 '}
                textColor={'#3C82D6'}
                txt="20 aug,2022"
                subtxt="Recent Withdrawal"
                outerclasses="w-[284px] h-[140px]"
                subtxtStyle={`!w-[100px]`}
              />
              <DashCard
                title={'Available for withdrawal'}
                totalNumber={'$350000'}
                myImg={IMAGES.CashWithdraw}
                imgColor={'bg-custom-dark-red'}
                textDash={' !w-full '}
                textColor={'#3C82D6'}
                txt="Lorem Ipsum"
                outerclasses="w-[284px] h-[140px]"
              /> */}
            </div>
          </div>
          <div className="mt-[20px]">
            <CustomTabView
              activeIndex={activeTab}
              onTabChange={handleTabChange}
            >
              <TabPanel header={`Payouts`}>
                <CustomTableComponent
                  showWrapper={false}
                  filterData={filterData}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  columnData={columnData}
                  // MultipleSelect={true}
                  LoadMore={LoadMore}
                  setLoadMore={setLoadMore}
                />
              </TabPanel>
              <TabPanel header={`Payments`}>
                <CustomTableComponent
                  showWrapper={false}
                  filterData={filterData}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  columnData={columnData}
                  // MultipleSelect={true}
                  LoadMore={LoadMore}
                  setLoadMore={setLoadMore}
                />
              </TabPanel>
              <TabPanel header={`Transfer`}>
                <CustomTableComponent
                  showWrapper={false}
                  filterData={filterData}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  columnData={columnData}
                  // MultipleSelect={true}
                  LoadMore={LoadMore}
                  setLoadMore={setLoadMore}
                />
              </TabPanel>
            </CustomTabView>
          </div>
        </>
      ) : (
        <div className="w-full mt-[100px] h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: 'hidden' }} />
        </div>
      )}
    </div>
  );
};
