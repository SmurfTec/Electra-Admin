import moment from 'moment';
import { Button } from 'primereact/button';
import { MenuItem } from 'primereact/menuitem';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel } from 'primereact/tabview';
import React, { useEffect, useRef, useState } from 'react';
import IMAGES from '../../assets/Images';
import { CustomTableComponent } from '../../atoms';
import { CustomMenu, CustomTabView } from '../../atoms/global.style';
import { DashCard, Header } from '../../components';
import { SVGIcon } from '../../components/SVG';
import { useFetchWallet } from '../../custom-hooks/useFetchWallet';
import {
  getBalance,
  getPayments,
  getPayouts,
  getTransfers,
  getWalletStats,
} from '../../store/Slices/WalletSlice';
export const Wallet = () => {
  const [initialData, setinitialData] = useState({
    limit: 10,
    activetab: 'payment',
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
          from: '-',
          value: '$' + item.amount,
          Source: item.source_type,
          destination: item.destination,
          Date: moment(item.created).format('DD/MM/YYYY'),
        };
      });
      setfilterData(newfilterData);
    } else if (initialData.activetab == 'payouts') {
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
        const newDate = moment(item.created).format('DD MMM YYYY');
        return {
          id: item.id,
          from: '-',
          capture_method: item.capture_method,
          value: '$' + item.amount,
          Source: item.source ?? '-',
          Date: newDate,
          description: item.description,
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
          {/* <SVGIcon onClick={handleClick} src={IMAGES.Dots} /> */}
          <Button
            icon="pi pi-ellipsis-h"
            rounded
            text
            severity="secondary"
            aria-label="Action"
            className="font-extrabold text-black"
            onClick={handleClick}
          />

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

  const Balance = async () => {
    setbankloader(true);
    const balance = await getBalance();

    setAccountBalance(balance);
    const walletstats = await getWalletStats();

    if (walletstats) {
      setbankloader(false);
    }

    setWalletStats(walletstats);
    // let r3=await getPayouts()
    // let r4=await getPayments()
    // let r5=await getTransfers()
  };
  useEffect(() => {
    Balance();
  }, []);
  const handleTabChange = (event: any) => {
    setactiveTab(event?.index);
    if (event?.index == 0) {
      setinitialData({
        ...initialData,
        activetab: 'payment',
        starting_after: '',
      });
    } else if (event?.index == 1) {
      setinitialData({
        ...initialData,
        activetab: 'payout',
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
      <Header typeSearch={true} UserBox={true} />
      {!WalletLoading && !bankloader ? (
        <>
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
              <DashCard
                title={'Withdrawn'}
                totalNumber={`$${
                  WalletStats?.withdrawnstats?.total_withdrawn || 0
                }`}
                myImg={IMAGES.Volume}
                imgColor={'bg-custom-grey'}
                textDash={'bg-yellow-dash !w-[90px] px-1 '}
                textColor={'#3C82D6'}
                txt="-"
                // subtxt="Recent Withdrawal"
                outerclasses="w-[284px] h-[140px]"
                subtxtStyle={`!w-[100px]`}
              />
              <DashCard
                title={'Available for withdrawal'}
                totalNumber={`$${
                  WalletStats?.available_withdrawn_stats?.available_withdrawn ||
                  0
                }`}
                myImg={IMAGES.CashWithdraw}
                imgColor={'bg-custom-dark-red'}
                textDash={' !w-full '}
                textColor={'#3C82D6'}
                txt="-"
                outerclasses="w-[284px] h-[140px]"
              />
            </div>
          </div>
          <div className="mt-[20px]">
            <CustomTabView
              activeIndex={activeTab}
              onTabChange={handleTabChange}
            >
              <TabPanel header={`Payments`}>
                <CustomTableComponent
                  showWrapper={false}
                  filterData={filterData}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  columnData={[
                    { field: 'id', header: 'TID' },
                    { field: 'capture_method', header: 'Payment Method' },
                    { field: 'value', header: 'Value' },
                    { field: 'description', header: 'Description' },
                    { field: 'from', header: 'From' },
                    { field: 'Source', header: 'Source' },
                    { field: 'Date', header: 'Created On' },
                  ]}
                  // MultipleSelect={true}
                  LoadMore={LoadMore}
                  setLoadMore={setLoadMore}
                />
              </TabPanel>
              <TabPanel header={`Payouts`}>
                <CustomTableComponent
                  showWrapper={false}
                  filterData={filterData}
                  selectedProducts={selectedProducts}
                  setSelectedProducts={setSelectedProducts}
                  columnData={[
                    { field: 'id', header: 'TID' },
                    { field: 'from', header: 'From' },
                    { field: 'value', header: 'Value' },
                    { field: 'Source', header: 'Source' },
                    { field: 'Date', header: 'Created On' },
                    // { field: "", header: '', body: MenuBodyTemplate }
                  ]}
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
                  columnData={[
                    { field: 'id', header: 'TID' },
                    { field: 'destination', header: 'Destination' },
                    { field: 'value', header: 'Amount' },
                    { field: 'from', header: 'From' },
                    { field: 'Source', header: 'Source' },
                    { field: 'Date', header: 'Created On' },
                  ]}
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
