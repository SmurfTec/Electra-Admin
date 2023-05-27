import  { useState, useRef, useEffect } from "react";
import { Column } from "primereact/column";
import { SVGIcon } from "../../components/SVG";
import IMAGES from "../../assets/Images";

import { CustomMenu,CustomTableWrapper,CustomTable } from "../global.style.js"
export const CustomTableComponent = () => {
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
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  
  const menuLeft: any = useRef(null);
  const StatusBodyTemplate = (option: any) => {
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] ${option.status.toLowerCase() == "active" ? "bg-blue" : "bg-red"
            } flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <p>{option.status}</p>
        </div>
      </>
    );
  };
  const handleBanUser = (e:any) => {
    e.preventDefault()
    const selectedUserIds = selectedProducts.map((product: any) => product.id);
    console.log("Selected User IDs:", selectedUserIds);
  };
  const items = [
    {

      items: [
        {
          label: "Ban User",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div style={{ backgroundColor: 'rgba(255, 245, 0, 0.05)' }} className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]">
                <SVGIcon
                  fillcolor={'#212121'}
                  src={IMAGES.Ban}
                /> Ban User
              </div>
            )
          }
        },
        {
          label: "Delete",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div  style={{ background: 'rgba(231, 29, 54, 0.05)' }} className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]">
                <SVGIcon

                  fillcolor={'#E71D36'}
                  src={IMAGES.Delete}
                /> Delete
              </div>
            )
          }
        },
        {
          label: "Select",
          command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div  style={{ background: 'rgba(46, 102, 194, 0.05)' }} className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]">
                <SVGIcon
                  fillcolor={'#212121'}
                  src={IMAGES.Select}
                /> Select
              </div>
            )
          }
        },
      ],
    },

  ];
  
  const MenuBodyTemplate = (rowData:any) => {
    
    
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            onClick={(event: any) => {
              event.preventDefault();
              menuLeft.current.toggle(event);
            }}

            src={IMAGES.Dots}
          />
        
          <CustomMenu   model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </>
    );
  };
  useEffect(()=>{
console.log(selectedProducts)
  },[selectedProducts])
  return (
    <>
      <div className="relative">
        <CustomTableWrapper></CustomTableWrapper>
        <CustomTable

          rows={10}
          value={filterData}
          scrollable={false}
          selection={selectedProducts} dataKey="id" onSelectionChange={(e: any) => setSelectedProducts(e.value)}
          // selectionMode={'checkbox'}
        >
          <Column selectionMode="multiple" headerStyle={{ width: '3rem' }} />
          <Column field="id" header="ID" />
          <Column field="firstname" header="First Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="register" header="Registered On" />
          <Column field="status" header="Status" body={StatusBodyTemplate} />
          <Column field="registerValue" header="Registered Via" />
          <Column header="" body={MenuBodyTemplate} />
        </CustomTable>
      </div>
    </>
  );
};
