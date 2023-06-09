import React, { useState, useRef, useEffect } from "react";
import { Header, DashCard, CreateCouponModel,SuccessModel } from "../../../components";
import { CustomTableComponent } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import { MenuItem } from "primereact/menuitem";
import IMAGES from "../../../assets/Images";
import { CustomMenu } from "../../../atoms/global.style";
import { getAllCoupons,DeleteCoupons } from "../../../store/Slices/Coupons";
import moment from "moment";
export const Coupon = () => {
  const [filterData,setfilterData] = useState([]);
  const[added,setadded]=useState(false)
  const getCoupons=async()=>{
    let response=await getAllCoupons();
    if(response.coupons){
      setTotalCoupons(response.results)
      let latestArr=response.coupons.map((item:any)=>{
        let newObj={
          ...item,
          CouponCode:item.code,
          OffPercentage:item.discount,
          CreatedOn:moment(item.created_on).format("DD,MMM,YYYY"),
          Expiry:moment(item.expiry).format("DD,MMM,YYYY"),
          UsedTime:item.maxUse
        }
        return newObj
      })
      console.log(latestArr)
      latestArr.sort((a:any, b:any) => a.id - b.id);
      setfilterData(latestArr)
   
      console.log(latestArr)
    }
    
   
  }
  useEffect(()=>{
    getCoupons()
  },[])
  const [modalVisible, setmodalVisible] = useState(false);
  const[TotalCoupons,setTotalCoupons]=useState(0);
  const [MenuLabel, setMenuLabel] = useState("");
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState("");
  const[successVisible,setsuccessVisible]=useState(false)
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const menuLeft: any = useRef(null);

  const items = [
  
    {
      label: "Delete",
      template: (item: MenuItem) => {
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

  const deleteItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  };
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
  const PercentageTxtTemplate = (options: any) => {
    return <p className="text-blue">{options.OffPercentage}</p>;
  };
  const CouponCodeTxtTemplate = (options: any) => {
    return <p className="text-blue">{options.CouponCode}</p>;
  };
  const [columnData] = useState([
    { field: "id", header: "ID" },
    { field: "title", header: "Title" },
    { field: "CouponCode", header: "Coupon Code", body: CouponCodeTxtTemplate },
    {
      field: "OffPercentage",
      header: "Off Percentage",
      body: PercentageTxtTemplate,
    },
    { field: "CreatedOn", header: "Created On" },
    { field: "Expiry", header: "Expiry" },
    { field: "UsedTime", header: "Used (times)" },
    { field: "", header: "", body: MenuBodyTemplate },
  ]);
  const DeleteCoupon=async()=>{
    try{
      let response=await DeleteCoupons(CurrSelectedProduct)
 
    setCurrSelectedProduct("");
    setsuccessVisible(true)
    getCoupons();
    }catch(err){
      
    }
  }
  useEffect(() => {
    if(MenuLabel=="Delete"){
      DeleteCoupon()
    }
    console.log(
      "Menu",
      MenuLabel,
      "product",
      selectedProducts,
      "CurrSelectedProduct",
      CurrSelectedProduct
    );
    
  }, [MenuLabel]);

 useEffect(()=>{
  if(added){
    setadded(false)
    getCoupons()
  }
 },[added])
  return (
    <div>
      <CreateCouponModel
        classes={"!w-[496px] !h-[502px]"}
        visible={modalVisible}
        setVisible={setmodalVisible}
        added={added}
        setadded={setadded}
      />
       <SuccessModel visible={successVisible} setVisible={setsuccessVisible} txt={"Coupon deleted Successfully"}/>
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      <div className="mt-[35px]">
        <div className="flex flex-wrap gap-6 mt-[28px]">
          <DashCard
            title={"Total Coupons"}
            titleStyle={`!text-[13px]`}
            totalNumber={String(TotalCoupons)}
            showDefaultNumber={false}
            Numberstyle={`!text-[28px]`}
          />
          <DashCard
            Add={true}
            txt="Add New Coupon"
            outerclasses="w-[284px] h-[140px]"
            Addimg={IMAGES.AddItem}
            onClick={() => setmodalVisible(true)}
          />
        </div>
      </div>
      <div className="mt-[20px]">
        <CustomTableComponent
          showWrapper={false}
          filterData={filterData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          columnData={columnData}
          MultipleSelect={true}
         
        />
      </div>
    </div>
  );
};
