import { useState, useEffect, useRef } from "react";
import { DashCard } from "../../../components/index.js";
import IMAGES from "../../../assets/Images";
import { CustomTableComponent,CustomButton } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import { CustomMenu } from "../../../atoms/global.style";
import { useNavigate } from "react-router-dom";
import { Header } from "../../../components/index.js";
import { Confirmationmodal } from "../../../components/index.js";
export const Users = () => {
  const navigate = useNavigate();
  const [MenuLabel, setMenuLabel] = useState("");
  const [visible, setVisible] = useState(false);
  const[LoadMore,setLoadMore]=useState(true)
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState("");
  const menuLeft: any = useRef(null);
  const [filterData, setFilterData] = useState([
    {
      id: 1,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 2,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 3,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 4,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 5,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 6,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 7,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 8,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 9,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 10,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 11,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 12,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 13,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Banned",
      registerValue: "Website",
    },
    {
      id: 14,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
    {
      id: 15,
      firstname: "Huzayfah",
      lastname: "Hanif",
      email: "Huz@gmail.com",
      phone: "34342424",
      register: "20,aug,2022",
      status: "Active",
      registerValue: "Website",
    },
  ]);
  const deleteItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  
  };
  const ViewItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
    navigate('/UserProfile')
  };
  const handleBanUser = (e: any) => {
    e.preventDefault();
    const selectedUserIds = selectedProducts.map((product: any) => product.id);
    console.log("Selected User IDs:", selectedUserIds);
  };
  const  items= [
    {
      label: "Ban User",
      template: (item: any, options: any) => {
        return (
          <div
            style={{ backgroundColor: "rgba(255, 245, 0, 0.05)" }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
          >
            <SVGIcon fillcolor={"#212121"} src={IMAGES.Ban} /> Ban User
          </div>
        );
      },
    },
    {
      label: "Delete",
      template: (item: any, options: any) => {
        return (
          <div
            style={{ background: "rgba(231, 29, 54, 0.05)" }}
            className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
            onClick={(event) => deleteItem(event, item)}
          >
            <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
          </div>
        );
      },
    },
    {
      label: "Select",
      template: (item: any, options: any) => {
        return (
          <div
            style={{ background: "rgba(46, 102, 194, 0.05)" }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
            onClick={(event) => ViewItem(event, item)}
          >
            <SVGIcon fillcolor={"#212121"} src={IMAGES.Select} /> Select
          </div>
        ); 
      },
    },
  ]
  const StatusBodyTemplate = (option: any) => {
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] ${
            option.status.toLowerCase() == "active" ? "bg-blue" : "bg-red"
          } flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <p>{option.status}</p>
        </div>
      </>
    );
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
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            onClick={handleClick}
            src={IMAGES.Dots}
          />

          <CustomMenu model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </>
    );
  };
 
  const [columnData] = useState([
    { field: "id", header: "ID" },
    { field: "firstname", header: "First Name" },
    { field: "lastname", header: "Last Name" },
    { field: "email", header: "Email" },
    { field: "phone", header: "Phone" },
    { field: "register", header: "Registered On" },
    { field: "status", header: "Status", body: StatusBodyTemplate },
    { field: "registerValue", header: "Registered Via" },
    { field: "", header: "", body: MenuBodyTemplate },
  ]);
  // useEffect(() => {
  //   if (selectedProducts.length > 0) {
  //     navigate("/UserProfile");
  //   }
  // }, [selectedProducts]);
  return (
    <div className="">
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      <div className="flex flex-wrap gap-6 mt-[28px]">
        <DashCard
          onClick={() => setVisible(true)}
          title={"Total Users"}
          totalNumber={"4500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"User Registered In March"}
          totalNumber={"350"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"User Registered This Year"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-blue w-[67px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
      </div>
      <div className="mt-[40px] relative">
        <CustomTableComponent
          filterData={filterData}
          selectedProducts={selectedProducts}
          setSelectedProducts={setSelectedProducts}
          columnData={columnData}
          MultipleSelect={true}
          LoadMore={LoadMore}
          setLoadMore={setLoadMore}
        />
      </div>
      <Confirmationmodal
        PopupHeader={"Confirmation"}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={"Ban"}
        cnclebtnText={"Cancel"}
        text={
          "Are you sure you want to ban this user"
        }
      />
      {!LoadMore
      && 
      <div className="flex gap-2 items-center mt-[20px]">
        <CustomButton iconLeft={<SVGIcon fillcolor={"white"} src={IMAGES.DeleteIcon}/>}  classes={'!w-[194px] !h-[46px] !rounded-[8px] !bg-[#BA0000]'} txt={'Delete Users(12)'} />
        <CustomButton iconLeft={<SVGIcon   width={"14px"} height={"14px"} fillcolor={"#212121"} src={IMAGES.Ban} />} classes={'!w-[173px] !h-[46px] !text-black !rounded-[8px] !bg-[#FBBB00]'} txt={'Ban Users(12)'}/>
      </div>
      }
      
    </div>
  );
};
