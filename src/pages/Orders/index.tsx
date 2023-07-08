import React, { useEffect,useRef } from "react";
import { SVGIcon } from "../../components/SVG";
import { CustomTableComponent, Miniselect, CustomButton } from "../../atoms";
import { useNavigate } from "react-router-dom";
import { Header, Receiptmodal } from "../../components";
import IMAGES from "../../assets/Images";
import { CustomMenu,CustomTabView } from "../../atoms/global.style";
import { TabPanel } from "primereact/tabview";
import { getAllOrders } from "../../store/Slices/OrderSlice";
export const Orders = () => {
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const [visible,setVisible]=React.useState(false)
 
  const filterData = [
    {
      id: 1,
      Seller: "Jude John",
      Buyer: "Jude John",
      "Item Name": "ItemName",

      "Sale Price": "$4345",
      "Tracking ID": "$4345",
      "Order No": "345",
      "Sold On": "22 Aug 2022",
      "Shipping In": "2 Days",
      Status: "Completed",
    },
    {
      id: 2,
      Seller: "Jude John",
      Buyer: "Jude John",
      "Item Name": "ItemName",

      "Sale Price": "$4345",
      "Tracking ID": "$4345",
      "Order No": "5",
      "Sold On": "22 Aug 2022",

      "Shipping In": "Shipped",
      Status: "Completed",
    },
    {
      id: 3,
      Seller: "Jude John",
      Buyer: "Jude John",
      "Item Name": "ItemName",

      "Sale Price": "$4345",
      "Tracking ID": "$4345",
      "Order No": "45",
      "Sold On": "22 Aug 2022",

      "Shipping In": "-",
      Status: "Cancelled",
    },
    {
      id: 4,
      Seller: "Jude John",
      Buyer: "Jude John",
      "Item Name": "ItemName",

      "Sale Price": "$4345",
      "Tracking ID": "$434325",
      "Order No": "25",
      "Sold On": "22 Aug 2022",

      "Shipping In": "3 Days",
      Status: "Cancelled",
    },
  ];
  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({ id, menuRef }: { id: string, menuRef: React.RefObject<any> }) => {
      const items = [
        {
          label: "View Item",
    
          template: (item: any) => {
            return (
              <div
              // onClick={(event) => deleteItem(event, rowData.id)}
                style={{ backgroundColor: "rgba(255, 245, 0, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Ban} /> View Item
              </div>
            );
          },
        },
        {
          label: "Delete",
          template: (item:any) => {
            return (
              <div
                // onClick={(event) => deleteItem(event, rowData.id)}
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ];

      return (
       <>
        <CustomMenu
            popupAlignment="left"
            height={"80px"}
            model={items}
            popup
            ref={menuRef}
            id="popup_menu_left"
          /></>
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
          <SVGIcon
            onClick={handleClick}
            src={IMAGES.Dots}
          />

<MenuTemplate id={rowData.id} menuRef={menuLeftRef} />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    let style;
    if (option.Status === "Completed") {
      style = `px-[14px] py-[4px]
            text-center
            h-[33px]
             bg-custom-blue text-[black]
              max-w-[100px]
             mx-auto
              flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    } else if (option.Status === "Cancelled") {
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
          <p className="font-bold">{option.Status}</p>
        </div>
      </>
    );
  };
  const SalesTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option["Sale Price"]}</p>;
  };
  const TrackingTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option["Tracking ID"]}</p>;
  };
  const OrderTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option["Order No"]}</p>;
  };
  const columnData = [
    { field: "id", header: "ID" },
    { field: "Seller", header: "Seller" },
    { field: "Buyer", header: "Buyer" },
    { field: "Item Name", header: "Item Name" },

    { field: "Sale Price", header: "Sale Price", body: SalesTemplate },
    { field: "Tracking ID", header: "Tracking ID", body: TrackingTemplate },
    { field: "Order No", header: "Order No", body: OrderTemplate },
    { field: "Sold On", header: "Sold On" },
    { field: "Shipping In", header: "Shipping In" },
    { field: "Status", header: "Status", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ];
  const getOrders=async()=>{
    let r=await getAllOrders()
    let newarr=r.orders.map((item:any)=>{
      let updatedObj={
        ...item,
        
      }
    })
  }
  useEffect(()=>{
    getOrders();
  },[])
  return (
    <div>
      <Header
        placeholder="Search Admins"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
        <div>
          <div className="flex justify-between items-center px-3">
            <p className="font-bold p-4 text-[19px]">
              Orders <br />
              <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
                Check Orders
              </span>
            </p>
            <CustomButton
            onClick={()=>setVisible(true)}
              iconLeft={<img src={IMAGES.Csvicon} />}
              classes="!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]"
              txt="Export CSV"
            />
          </div> 

          
         <div>
         <CustomTabView>
         <TabPanel header={`All(9)`}>
         <p className="m-0">
         <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC !important"}
            MultipleSelect={true}
          />
          </p>
         </TabPanel>
         <TabPanel header={`Cancelled(9)`}>
         <p className="m-0">
         <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC !important"}
            MultipleSelect={true}
          />
          </p>
         </TabPanel>
         <TabPanel header={`Completed(9)`}>
         <p className="m-0">
         <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC !important"}
            MultipleSelect={true}
          />
          </p>
         </TabPanel>
         <TabPanel header={`Shipping inprogress(9)`}>
         <p className="m-0">
         <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC !important"}
            MultipleSelect={true}
          />
          </p>
         </TabPanel>
         <TabPanel header={`Shipped(9)`}>
         <p className="m-0">
         <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC !important"}
            MultipleSelect={true}
          />
          </p>
         </TabPanel>
            </CustomTabView>
         </div>
          
        </div>
      </div>
      <div className="mt-3">
        <p className="font-bold">Select Status</p>
        <div className="flex gap-3 mt-2">
          <Miniselect txt={"Completed"} radio={true} />
          <Miniselect txt={"Shipped to Seller"} radio={true}  />
          <Miniselect txt={"Verified"} radio={true} />
          <Miniselect txt={"Under Review"} radio={true} />
          <Miniselect txt={"Shipped"}radio={true}  />
          <Miniselect txt={"Waiting for seller to ship"}radio={true}  />
        </div>
      </div>
      <Receiptmodal 
      visible={visible}
      setVisible={setVisible}
      />
    </div>
  );
};
