import moment from 'moment';
import { Button } from 'primereact/button';
import { Dropdown } from 'primereact/dropdown';
import { ProgressSpinner } from 'primereact/progressspinner';
import { TabPanel } from 'primereact/tabview';
import React, { useEffect, useRef, useState } from 'react';
import { CSVLink } from 'react-csv';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import IMAGES from '../../assets/Images';
import { CustomButton, CustomTableComponent, Miniselect } from '../../atoms';
import { CustomMenu, CustomTabView } from '../../atoms/global.style';
import { Header, Paginatior, Receiptmodal } from '../../components';
import { SVGIcon } from '../../components/SVG';
import { useFetchOrders } from '../../custom-hooks/useFetchOrders';
import {
  DeleteOrders,
  UpdateOrderStatus,
  setOrderCount,
} from '../../store/Slices/OrderSlice';

const orderStatus = [
  { label: 'under-review', value: 'under-review', id: 1 },
  { label: 'verified', value: 'verified', id: 2 },
  { label: 'shipped-to-buyer', value: 'shipped-to-buyer', id: 3 },
  { label: 'waiting-for-seller', value: 'waiting-for-seller', id: 4 },
  { label: 'rejected', value: 'rejected', id: 5 },
  { label: 'completed', value: 'completed', id: 6 },
];

export const Orders = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [visible, setVisible] = React.useState(false);
  const [currentItem, setcurrentItem] = useState<any>();
  const [filterData, setfilterData] = useState<any>([]);
  const dt = useRef<any>(null);
  const [activeTab, setactiveTab] = useState(0);
  const [selectedOrders, setselectedOrders] = useState<any>([]);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 8,
    currentPage: 1,
    status: '',
  });
  const [isUpdating, setIsUpdating] = useState({
    updateId: '',
    updating: false,
  });
  const { orderData, orderLoading, stats, allorderData } =
    useFetchOrders(initialPageData);
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
                style={{ background: 'rgba(46, 102, 194, 0.05)' }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
                onClick={(event: any) => viewItem(event, rowData.id)}
              >
                <SVGIcon fillcolor={'#212121'} src={IMAGES.Select} /> View
                Receipt
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
        <>
          <CustomMenu
            popupAlignment="left"
            height={'fit-content'}
            model={items}
            popup
            ref={menuRef}
            id="popup_menu_left"
          />
        </>
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
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
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

          <MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };
  const viewItem = async (event: any, id: any) => {
    setVisible(true);
    const item = filterData?.filter((item: any) => item.id == id);
    setcurrentItem(item);
  };
  const deleteItem = async (event: any, id: any) => {
    const r = await DeleteOrders(id);

    setInitialPageData({
      rowsPerPage: 50,
      currentPage: 1,
      status: '',
    });
  };
  const StatusBodyTemplate = (option: any) => {
    let style;
    if (option.status === 'rejected') {
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

    const handleDropdown = async (e: any) => {
      try {
        setIsUpdating({ updateId: option.id, updating: true });
        const value = e.value;
        const resp = await UpdateOrderStatus(option['Order No'], value);
        const alterData = filterData.map((el: any) =>
          el.id === resp.id ? { ...el, status: resp.status } : el
        );
        setfilterData([...alterData]);
      } catch (er) {
        console.log('er', er);
      } finally {
        setIsUpdating({ updateId: '', updating: false });
      }
    };

    return (
      <>
        <div className="card flex justify-content-center">
          {isUpdating.updating && isUpdating.updateId === option.id ? (
            <div className="flex items-center w-full">
              <ProgressSpinner
                style={{
                  width: '30px',
                  height: '30px',
                  marginInline: 'auto',
                  overflow: 'hidden',
                }}
              />
            </div>
          ) : (
            <Dropdown
              value={option.status}
              onChange={handleDropdown}
              options={orderStatus}
              optionLabel="label"
              placeholder="Order Status"
              className="w-full md:w-14rem"
            />
          )}
        </div>
        {/* <div className={style}>
          <p className="font-bold">{option.status}</p>
        </div> */}
      </>
    );
  };
  const SalesTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['saleprice']}</p>;
  };
  const TrackingTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['trackingid']}</p>;
  };
  const OrderTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option['Order No']}</p>;
  };
  const columnData = [
    { field: 'id', header: 'ID' },
    { field: 'Seller', header: 'Seller' },
    { field: 'Buyer', header: 'Buyer' },
    { field: 'Item Name', header: 'Item Name' },

    { field: 'saleprice', header: 'Sale Price', body: SalesTemplate },
    { field: 'trackingid', header: 'Tracking ID', body: TrackingTemplate },
    { field: 'Order No', header: 'Order No', body: OrderTemplate },
    { field: 'Sold On', header: 'Sold On' },
    { field: 'ship_in', header: 'Shipping In' },
    { field: 'status', header: 'Status', body: StatusBodyTemplate },
    { field: '', header: '', body: MenuBodyTemplate },
  ];

  useEffect(() => {
    dispatch(setOrderCount(stats?.all_orders));
    const newarr = orderData?.map((item: any) => {
      const updatedObj = {
        ...item,
        id: item.id,
        Seller: item?.seller?.firstname + ' ' + item?.seller?.lastname,
        Buyer: item?.buyer?.firstname + ' ' + item?.buyer?.lastname,
        'Item Name': item?.product?.title,
        saleprice: item?.saleprice,
        trackingid: item?.trackingid,
        'Order No': item?.id,
        'Sold On': moment(item?.created_on).format('DD,MM,YYYY'),
        soldon: moment(item?.created_on).format('DD,MM,YYYY'),
        ship_in: item?.ship_in,
        status: item?.status,
      };
      return updatedObj;
    });
    setfilterData(newarr);
  }, [orderData]);

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
        status: 'completed',
        currentPage: 1,
      });
    } else if (event?.index == 3) {
      setInitialPageData({
        ...initialPageData,
        status: 'waiting-for-seller',
        currentPage: 1,
      });
    } else if (event?.index == 4) {
      setInitialPageData({
        ...initialPageData,
        status: 'shipped',
        currentPage: 1,
      });
    } else if (event?.index == 5) {
      setInitialPageData({
        ...initialPageData,
        status: 'verified',
        currentPage: 1,
      });
    } else if (event?.index == 6) {
      setInitialPageData({
        ...initialPageData,
        status: 'under-review',
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
    { label: 'Order No', key: 'Order No' },
    { label: 'Sold On', key: 'soldon' },
    { label: 'Shipping In', key: 'ship_in' },
    { label: 'Status', key: 'status' },
  ];
  return (
    <div>
      <Header placeholder="Search Admins" typeSearch={true} UserBox={true} />
      <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
        <div>
          <div className="flex justify-between items-center px-3">
            <p className="font-bold p-4 text-[19px]">
              Orders <br />
              <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
                Check Orders
              </span>
            </p>
            <CSVLink
              data={allorderData || []}
              headers={headers}
              filename={'orders.csv'}
            >
              <CustomButton
                iconLeft={<img src={IMAGES.Csvicon} />}
                classes="!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]"
                txt="Export CSV"
              />
            </CSVLink>
          </div>

          {!orderLoading ? (
            <div>
              <CustomTabView
                activeIndex={activeTab}
                onTabChange={handleTabChange}
              >
                <TabPanel header={`All(${stats?.all_orders})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      ref={dt}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.all_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel header={`Cancelled(${stats?.cancelled_orders})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'rejected'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.cancelled_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel header={`Completed(${stats?.completed_orders})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'completed'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.completed_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel
                  header={`Shipping inprogress(${stats?.waiting_for_seller_orders})`}
                >
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'waiting-for-seller'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.waiting_for_seller_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel header={`Shipped(${stats?.shipped_orders})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'shipped'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.shipped_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel header={`Verified(${stats?.verified_orders})`}>
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'verified'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.verified_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
                <TabPanel
                  header={`Under Review(${stats?.under_review_orders})`}
                >
                  <p className="m-0">
                    <CustomTableComponent
                      columnStyle={{ backgroundColor: '#FCFCFC' }}
                      headerStyle={{ color: 'black', fontWeight: '800' }}
                      filterData={filterData?.filter(
                        (item: any) => item.status == 'under-review'
                      )}
                      columnData={columnData}
                      rowStyling={'#FCFCFC !important'}
                      // MultipleSelect={true}
                      selectedProducts={selectedOrders}
                      setSelectedProducts={setselectedOrders}
                    />
                    <Paginatior
                      totalRecords={Number(stats?.shipped_orders)}
                      initialPageData={initialPageData}
                      setInitialPageData={setInitialPageData}
                    />
                  </p>
                </TabPanel>
              </CustomTabView>
            </div>
          ) : (
            <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
              <ProgressSpinner style={{ overflow: 'hidden' }} />
            </div>
          )}
        </div>
      </div>
      {/* <div className="mt-3">
        <p className="font-bold">Select Status</p>
        <div className="flex gap-3 mt-2">
          <Miniselect txt={"Completed"} radio={true}  />
          <Miniselect txt={"Verified"} radio={true} />
          <Miniselect txt={"Under Review"} radio={true} />
          <Miniselect txt={"Shipped"} radio={true} />
          <Miniselect txt={"Waiting for seller to ship"} radio={true} />
        </div>
      </div> */}
      {visible && (
        <Receiptmodal
          visible={visible}
          setVisible={setVisible}
          currentItem={currentItem}
        />
      )}
    </div>
  );
};
