import React,{useState,useRef} from 'react'
import { Header } from '../../../components'
import { CustomTableComponent, InputTxt } from '../../../atoms'
import { CustomButton} from '../../../atoms'
import IMAGES from '../../../assets/Images'
import { TabPanel } from 'primereact/tabview';
import { CustomTabView,CustomMenu } from '../../../atoms/global.style'
import { SVGIcon } from '../../../components/SVG'
import { useNavigate } from 'react-router-dom'
export const Verification = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const[OrderTrack,setOrderTrack]=useState('')
  const menuLeft: any = React.useRef(null);
  const navigate=useNavigate()
  const [MenuLabel, setMenuLabel] = useState("");
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState("");
  const [filterData] = useState([
    {
      id: 1,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Pass",
    },
    {
      id: 2,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Pass",
    },
    {
      id: 3,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Pass",
    },
    {
      id: 4,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Fail",
    },
    {
      id: 5,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Pass",
    },
    {
      id: 6,
      Seller: "Jude John ",
      Buyer: "Mike Adam",
      ItemName: "Iphone 14",
      SalePrice: "$999",
      TrackingID: "2525252",
      OrderNo: "25",
      ActionOn: "22 aug,2022",
      Status:"Pending",
    },
    
  
  ]);
  const deleteItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  
  };
  const ViewItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
    navigate('/HelpCenterDetail')
  };
  const items = [
    {
      label: "View Item",

      template: (item: any) => {
        return (
          <div
            onClick={(event) => ViewItem(event, item)}
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
            onClick={(event) => deleteItem(event, item)}
            style={{ background: "rgba(231, 29, 54, 0.05)" }}
            className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
          >
            <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
          </div>
        );
      },
    },
  ];
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
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
            height={"80px"}
            model={items}
            popup
            ref={menuLeft}
            id="popup_menu_left"
          />
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
          className={`text-[14px] font-[600] p-2 px-[22px] rounded-[22px] text-[#212121] ${
            options.Status == "Pass" ? "bg-custom-blue" : options.Status == "Fail" ?"bg-custom-pink":"bg-custom-button-yellow"
          }`}
        >
          {options.Status}
        </p>
      </>
    );
  };
  const [columnData] = useState([
    { field: "id", header: "ID",headerStyle:{width:'10px'} },
    { field: "Seller", header: "Seller" },
    { field: "Buyer", header: "Buyer" },
    { field: "ItemName", header: "Item Name" },
    { field: "SalePrice", header: "Sale Price", body: SaleBodyTemplate },
    { field: "TrackingID", header: "Tracking ID", body: TrackingBodyTemplate },
    { field: "OrderNo", header: "Order No",body: OrderBodyTemplate },
    { field: "ActionOn", header: "Action On" },
    { field: "Status", header: "Status", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ]);
 
  

  return (
    <div>
        <Header
         chooseFilter={true}
         typeSearch={true}
         UserBox={true}
       />
       <div className='flex mt-[37px] gap-3'>
       <InputTxt
        placeholder="Enter Order/Tracking Number"
        MainClasses="!bg-[#FCFCFC] pointer  !rounded-[8px] border !border-inputBorder !w-[300px] !h-[59px] "
        iconLeft={true}
     
        value={OrderTrack}
        onChange={(e: any) => setOrderTrack(e.target.value)}
      />
      <CustomButton
      classes='!w-[63px] !h-[59px] !rounded-[8px]'
      icon={true}
      />
       </div>
       <div className='my-[16px] flex justify-center text-center w-[100%] max-w-[350px] '>
        <p className='text-[15px] font-[500] text-[#656565]'>Or</p>
       </div>
       <CustomButton
      classes='!w-auto !max-w-[374px] !px-[1rem] !h-[59px] !rounded-[8px] !bg-blue'
    
      txt="Scan Bar Code"
      iconLeft={<img src={IMAGES.BarCode}/>}
      />
      <div className='flex justify-between mt-[47px] w-[98%]'>
        <div className='flex flex-col '>
          <p className='text-[20px] text-black font-[600]'>Verification</p>
          <p className='text-[14px] text-[#A4A4A4] font-[400]'>Verify items for proceeding further</p>
        </div>
        <CustomButton
        iconLeft={<img src={IMAGES.Csvicon}/>}
        classes='!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]'
        txt="Export CSV"
        />
      </div>
      <div className='mt-[39px]'>
      <CustomTabView>
      <TabPanel header="All(6)" >
                    <p className="m-0">
                       <CustomTableComponent
                      theadStyles={{ color: '#212121 !important', fontWeight: 'bold' }}
                      showWrapper={false}
                      filterData={filterData}
                      selectedProducts={selectedProducts}
                      setSelectedProducts={setSelectedProducts}
                      columnData={columnData}
                      MultipleSelect={true}
                      MultipleHeaderStyle={{width:"10px",paddingLeft:'5px',paddingRight:'5px'}}
                       />
                    </p>
                </TabPanel>
                <TabPanel header="Fail (1)" >
                    <p className="m-0">
                          </p>
                </TabPanel>
                <TabPanel header="Pass (1)" >
                    <p className="m-0">
                          </p>
                </TabPanel>
                <TabPanel header="Pending (1)" >
                    <p className="m-0">
                          </p>
                </TabPanel>
      </CustomTabView>
      </div>

      <CustomButton
      classes='!w-auto !max-w-[79px] !px-[1rem] !h-[38px] !text-[13px] !rounded-[8px] !bg-[#DD0000]'
    
      txt="Delete"
     
      />
    </div>
  )
}
