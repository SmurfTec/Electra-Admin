import React, { useState, useRef,useEffect } from "react";
import { Header } from "../../../components";
import { SVGIcon } from "../../../components/SVG";
import { CustomTableComponent } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { CustomMenu } from "../../../atoms/global.style";
import { MenuItem } from "primereact/menuitem";
import { useNavigate } from "react-router-dom";
import { getAllSupport } from "../../../store/Slices/HelpCenterSlice";
import moment from "moment";
export const HelpCenter = () => {
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const[LoadMore,setLoadMore]=useState(true)

  const navigate=useNavigate()
  const [filterData,setFilterData] = useState([
  ]);
  const deleteItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    
  
  };
  const ViewItem = (event: React.MouseEvent, id: any) => {
    event.stopPropagation();
    navigate(`/HelpCenterDetail/${id}`)
  };
  
  const MenuBodyTemplate = (rowData: any) => {
    const MenuTemplate = ({ id, menuRef }: { id: string, menuRef: React.RefObject<any> }) => {
      let [items] = useState([
        {
          label: "View Item",
    
          template: (item: any) => {
            return (
              <div
                onClick={(event) => ViewItem(event, rowData.id)}
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
          template: (item: MenuItem) => {
            return (
              <div
                onClick={(event) => deleteItem(event, rowData.id)}
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
      ]);

      return (
        <CustomMenu model={items} popup  height={"80px"} ref={menuRef} id="popup_menu_left" />
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
        <p className="text-[14px] font-[600] text-blue">{options.order}</p>
      </>
    );
  };
  const CategoryBodyTemplate = (options: any) => {
    return (
      <>
        <p className="text-[14px] font-[600] text-blue">{options.category}</p>
      </>
    );
  };
  const StatusBodyTemplate = (options: any) => {
    return (
      <>
        <p
          className={`text-[14px] font-[600] p-2 rounded-[22px] text-white ${
            options.status == "Solved" ? "bg-blue" : "bg-black"
          }`}
        >
          {options.status}
        </p>
      </>
    );
  };
  const [columnData] = useState([
    { field: "id", header: "ID" },
    { field: "firstName", header: "First Name" },
    { field: "lastName", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "order", header: "Order No", body: OrderBodyTemplate },
    { field: "category", header: "Category", body: CategoryBodyTemplate },
    { field: "created_on", header: "Date" },
    { field: "status", header: "Status", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ]);
  const getSupport=async()=>{
    let response = await getAllSupport();
    
    let newArr=response?.supports.map((item:any)=>{
      let newObj={
        ...item,
        created_on:moment(item.created_on).format("DD,MM,YYYY")
      }
      return newObj
    })
    console.log(response?.supports)
    setFilterData(newArr)
  }
  useEffect(()=>{
    getSupport()
  },[])
  return (
    <div>
      <Header chooseFilter={true} typeSearch={true} UserBox={true} />
      <div>
        <CustomTableComponent
          showWrapper={false}
          filterData={filterData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          columnData={columnData}
          MultipleSelect={true}
          LoadMore={LoadMore} 
          setLoadMore={setLoadMore}
        />
      </div>
    </div>
  );
};
