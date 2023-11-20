import moment from 'moment';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel } from 'primereact/tabview';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../../assets/Images';
import { CustomButton, CustomTableComponent, InputTxt } from '../../../atoms';
import { CustomMenu, CustomTabView } from '../../../atoms/global.style';
import { Header, Paginatior } from '../../../components';
import { SVGIcon } from '../../../components/SVG';
import { useFetchVerifications } from '../../../custom-hooks/useFetchVerifications';
export const Verification = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 25,
    currentPage: 1,
    status: '',
    order: 0,
    trakingid: '',
    date: '',
  });
  const { VerificationData, VerificationLoading, stats, allVerificationData } =
    useFetchVerifications(initialPageData);
  const [OrderTrack, setOrderTrack] = useState('');
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [activeTab, setactiveTab] = useState(0);
  const deleteItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
  };
  const ViewItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    navigate(`/Verification/Step1/${id}`);
  };

  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({
      id,
      menuRef,
    }: {
      id: string;
      menuRef: React.RefObject<any>;
    }) => {
      const items = [
        {
          label: 'View Item',

          template: (item: any) => {
            return (
              <div
                onClick={event => ViewItem(event, rowData.id)}
                style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Ban} /> View Item
              </div>
            );
          },
        },
        // {
        //   label: 'Delete',
        //   template: (item: any) => {
        //     return (
        //       <div
        //         onClick={event => deleteItem(event, rowData.id)}
        //         style={{ background: 'rgba(231, 29, 54, 0.05)' }}
        //         className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
        //       >
        //         <SVGIcon fillcolor={'#E71D36'} src={IMAGES.Delete} /> Delete
        //       </div>
        //     );
        //   },
        // },
      ];

      return (
        <CustomMenu
          popupAlignment="left"
          height={'fit-content'}
          model={items}
          popup
          ref={menuRef}
          id="popup_menu_left"
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
  const OrderBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.OrderNo}</p>
      </>
    );
  };
  const SaleBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.SalePrice}</p>
      </>
    );
  };
  const TrackingBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.TrackingID}</p>
      </>
    );
  };
  const StatusBodyTemplate = (options: any) => {
    return (
      <>
        <p
          className={`text-[14px] font-[600] p-2 px-[22px] !inline-block rounded-[22px] text-[#212121] ${
            options.Status == 'verified'
              ? 'bg-custom-blue'
              : options.Status == 'rejected'
              ? 'bg-custom-pink'
              : 'bg-custom-button-yellow'
          }`}
        >
          {options.Status}
        </p>
      </>
    );
  };
  const [columnData] = useState([
    { field: 'id', header: 'ID', headerStyle: { width: '10px' } },
    { field: 'Seller', header: 'Seller' },
    { field: 'Buyer', header: 'Buyer' },
    { field: 'ItemName', header: 'Item Name' },
    { field: 'SalePrice', header: 'Sale Price', body: SaleBodyTemplate },
    { field: 'TrackingID', header: 'Tracking ID', body: TrackingBodyTemplate },
    { field: 'OrderNo', header: 'Order No', body: OrderBodyTemplate },
    { field: 'ActionOn', header: 'Action On' },
    { field: 'Status', header: 'Status', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ]);

  const handleTabChange = (event: any) => {
    setactiveTab(event?.index);
    if (event?.index == 0) {
      setInitialPageData({ ...initialPageData, status: '', currentPage: 1 });
    } else if (event?.index == 1) {
      setInitialPageData({
        ...initialPageData,
        status: 'rejected',
        currentPage: 1,
      });
    } else if (event?.index == 2) {
      setInitialPageData({
        ...initialPageData,
        status: 'verified',
        currentPage: 1,
      });
    } else if (event?.index == 3) {
      setInitialPageData({
        ...initialPageData,
        status: 'pending',
        currentPage: 1,
      });
    }
  };
  const headers = [
    { label: 'ID', key: 'id' },
    { label: 'Seller', key: 'Seller' },
    { label: 'Buyer', key: 'Buyer' },
    { label: 'Item Name', key: 'product.title' },
    { label: 'Sale Price', key: 'saleprice' },
    { label: 'Tracking ID', key: 'trackingid' },
    { label: 'Order No', key: 'order.id' },
    { label: 'Action On', key: 'ActionOn' },
    { label: 'Status', key: 'status' },
  ];
  //GetVerifications();
  const checkSearchValue = () => {
    const isnum = /^\d+$/.test(OrderTrack);

    if (isnum) {
      setInitialPageData({ ...initialPageData, order: Number(OrderTrack) });
    } else {
      if (OrderTrack.length == 0) {
        setInitialPageData({ ...initialPageData, order: 0, trakingid: '' });
      } else {
        setInitialPageData({
          ...initialPageData,
          order: 0,
          trakingid: OrderTrack,
        });
      }
    }
  };
  useEffect(() => {
    const latestArr = VerificationData?.map((item: any) => {
      const newObj = {
        ...item,
        Seller: item.seller.firstname + ' ' + item.seller.lastname,
        Buyer: item.buyer.firstname + ' ' + item.buyer.lastname,
        ItemName: item.product.title,
        SalePrice: item.order.saleprice,
        TrackingID: item.order.trackingid,
        OrderNo: item.order.id,
        ActionOn: moment(item.created_on).format('DD,MM,YYYY'),
        Status: item.status,
      };
      return newObj;
    });
    latestArr?.sort((a: any, b: any) => a.id - b.id);
    setFilterData(latestArr);
  }, [VerificationData]);

  return (
    <div>
      <Header UserBox={true} />
      <div className="flex mt-[37px] gap-3">
        <InputTxt
          placeholder="Enter Order/Tracking Number"
          MainClasses="!bg-[#FCFCFC] pointer  !rounded-[8px] border !border-inputBorder !w-[300px] !h-[59px] "
          iconLeft={true}
          value={OrderTrack}
          onChange={(e: any) => setOrderTrack(e.target.value)}
        />
        <CustomButton
          onClick={checkSearchValue}
          classes="!w-[63px] !h-[59px] !rounded-[8px]"
          icon={true}
        />
      </div>
      <div className="my-[16px] flex justify-center text-center w-[100%] max-w-[350px] ">
        <p className="text-[15px] font-[500] text-[#656565]">Or</p>
      </div>
      <CustomButton
        classes="!w-auto !max-w-[374px] !px-[1rem] !h-[59px] !rounded-[8px] !bg-blue"
        txt="Scan Bar Code"
        iconLeft={<img src={IMAGES.BarCode} />}
      />
      <div className="flex justify-between mt-[47px] w-[98%]">
        <div className="flex flex-col ">
          <p className="text-[20px] text-black font-[600]">Verification</p>
          <p className="text-[14px] text-[#A4A4A4] font-[400]">
            Verify items for proceeding further
          </p>
        </div>
        <CSVLink
          data={allVerificationData || []}
          headers={headers}
          filename={'verification.csv'}
        >
          <CustomButton
            iconLeft={<img src={IMAGES.Csvicon} />}
            classes="!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]"
            txt="Export CSV"
          />
        </CSVLink>
      </div>
      {!VerificationLoading ? (
        <>
          <div className="mt-[39px]">
            <CustomTabView
              activeIndex={activeTab}
              onTabChange={handleTabChange}
            >
              <TabPanel header={`All(${stats?.all || 0})`}>
                <p className="m-0">
                  <CustomTableComponent
                    theadStyles={{
                      color: '#212121 !important',
                      fontWeight: 'bold',
                    }}
                    showWrapper={false}
                    filterData={filterData}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    columnData={columnData}
                    // MultipleSelect={true}
                    MultipleHeaderStyle={{
                      width: '10px',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                    }}
                  />
                  <Paginatior
                    totalRecords={Number(stats?.all)}
                    initialPageData={initialPageData}
                    setInitialPageData={setInitialPageData}
                  />
                </p>
              </TabPanel>
              <TabPanel header={`Fail (${stats?.fail || 0})`}>
                <p className="m-0">
                  <CustomTableComponent
                    theadStyles={{
                      color: '#212121 !important',
                      fontWeight: 'bold',
                    }}
                    showWrapper={false}
                    filterData={filterData?.filter(
                      (item: any) =>
                        item.Status.toLowerCase() == 'rejected' ||
                        item.Status.toLowerCase() == 'fail'
                    )}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    columnData={columnData}
                    // MultipleSelect={true}
                    MultipleHeaderStyle={{
                      width: '10px',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                    }}
                  />
                  <Paginatior
                    totalRecords={Number(stats?.fail)}
                    initialPageData={initialPageData}
                    setInitialPageData={setInitialPageData}
                  />
                </p>
              </TabPanel>
              <TabPanel header={`Pass (${stats?.pass || 0})`}>
                <p className="m-0">
                  <CustomTableComponent
                    theadStyles={{
                      color: '#212121 !important',
                      fontWeight: 'bold',
                    }}
                    showWrapper={false}
                    filterData={filterData?.filter(
                      (item: any) =>
                        item.Status.toLowerCase() == 'verified' ||
                        item.Status.toLowerCase() == 'pass'
                    )}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    columnData={columnData}
                    // MultipleSelect={true}
                    MultipleHeaderStyle={{
                      width: '10px',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                    }}
                  />
                  <Paginatior
                    totalRecords={Number(stats?.pass)}
                    initialPageData={initialPageData}
                    setInitialPageData={setInitialPageData}
                  />
                </p>
              </TabPanel>
              <TabPanel header={`Pending (${stats?.pending || 0})`}>
                <p className="m-0">
                  <CustomTableComponent
                    theadStyles={{
                      color: '#212121 !important',
                      fontWeight: 'bold',
                    }}
                    showWrapper={false}
                    filterData={filterData?.filter(
                      (item: any) => item.Status.toLowerCase() == 'pending'
                    )}
                    selectedProducts={selectedProducts}
                    setSelectedProducts={setSelectedProducts}
                    columnData={columnData}
                    // MultipleSelect={true}
                    MultipleHeaderStyle={{
                      width: '10px',
                      paddingLeft: '5px',
                      paddingRight: '5px',
                    }}
                  />
                  <Paginatior
                    totalRecords={Number(stats?.pending)}
                    initialPageData={initialPageData}
                    setInitialPageData={setInitialPageData}
                  />
                </p>
              </TabPanel>
            </CustomTabView>
          </div>

          {/* <CustomButton
            classes="!w-auto !max-w-[79px] !px-[1rem] !h-[38px] !text-[13px] !rounded-[8px] !bg-[#DD0000]"
            txt="Delete"
          /> */}
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: 'hidden' }} />
        </div>
      )}
    </div>
  );
};
