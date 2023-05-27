import React, { useState, useRef } from "react";
import { DataTable } from "primereact/datatable";
import styled from "styled-components";
import { Column } from "primereact/column";
import { SVGIcon } from "../../components/SVG";
import IMAGES from "../../assets/Images";
import { Menu } from "primereact/menu";
import { Toast } from "primereact/toast";
const CustomTableWrapper = styled.div`
  box-shadow: 0px -120px 110px inset rgba(240, 240, 240, 0.452);
  /* background-color: orange; */
  width: 100%;
  height: 150px;
  position: absolute;
  bottom: 17px;
  left: 0;
  z-index: 100;
  border: none !important;
`;
const CustomTable = styled(DataTable)`
  .p-datatable-wrapper {
    box-shadow: 0px -120px 110px inset rgba(240, 240, 240, 0.452);
    overflow-x: scroll;
    .p-datatable-table {
      .p-datatable-thead {
        tr {
          th {
            font-family: "Manrope";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            color: #b4b4b4;
            line-height: 19px;
            background: white;
            text-align: center;
            .p-column-header-content {
              display: flex;
              justify-content: center;
              .p-column-filter-menu {
                margin-left: 0 !important;
                margin-right: 5px;
                button {
                  background-color: transparent !important;
                  outline: none;
                  .pi-filter-icon {
                    color: white !important;
                  }
                  &:hover {
                    background-color: transparent !important;
                  }
                  &:focus {
                    outline: none !important;
                    box-shadow: none !important;
                  }
                }
              }
            }
          }
          .p-selection-column {
            padding-left: 16px;
            .p-checkbox {
              .p-checkbox-box {
                background: rgba(164, 164, 164, 0.28);
                border: 1px solid #a4a4a4;
                border-radius: 2px;
                /* width: 16px;
height: 16px; */
              }
            }
          }
        }
      }
      .p-datatable-tbody {
        tr {
          td {
            background-color: white !important;
            font-family: "Manrope";
            font-style: normal;
            font-weight: 500;
            font-size: 14px;
            line-height: 19px;
            text-align: center;
            color: #212121;
            padding-top: 18px;
            padding-bottom: 19px;
          }
          .p-selection-column {
            padding-left: 16px;
            .p-checkbox {
              .p-checkbox-box {
                background: rgba(164, 164, 164, 0.28);
                border: 1px solid #a4a4a4;
                border-radius: 2px;
              }
            }
          }
        }
      }
    }

    ::-webkit-scrollbar {
      width: 5px !important;
      background: white !important;
      height: 10px !important;
    }

    ::-webkit-scrollbar-thumb {
      border-radius: 30px !important;
      background-color: #a4a4a4 !important;
    }
  }
`;
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
  const toast = useRef(null);
  const menuLeft: any = useRef(null);
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
  const MenuBodyTemplate = (option: any) => {
    const [showMenuList, setshowMenuList] = useState(false);
    const items = [
      {
      
        items: [
          {
            label: "View",
            icon: "pi pi-refresh",
            command: () => {},
          },
          {
            label: "Delete",
            icon: "pi pi-times",
            command: () => {},
          },
          {
            label: "Select",
            icon: "pi pi-times",
            command: () => {},
          },
        ],
      },
   
    ];
    return (
      <>
        <div onClick={(event:any)=>{
          event.preventDefault();
          console.log("click")}}
          className={`px-[14px] py-[4px] text-[white]  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon
            // onMouseEnter={(event: any) => {
            //   event.preventDefault();
            //   menuLeft.current.toggle(event);
            // }}
            src={IMAGES.Dots}
          />
          <Menu model={items} popup ref={menuLeft} />
        </div>
      </>
    );
  };
  return (
    <>
      <div className="relative">
        <CustomTableWrapper></CustomTableWrapper>
        <CustomTable
          rows={10}
          value={filterData}
          tableStyle={{ minWidth: "73rem" }}
          selectionMode="checkbox"
        >
          <Column selectionMode="multiple" style={{ width: "1rem" }} />
          <Column field="id" header="ID" style={{ width: "1rem" }} />
          <Column field="firstname" header="First Name" />
          <Column field="lastname" header="Last Name" />
          <Column field="email" header="Email" />
          <Column field="phone" header="Phone" />
          <Column field="register" header="Registered On" />
          <Column field="status" header="Status" body={StatusBodyTemplate} />
          <Column field="registerValue" header="Registered Via" />
          <Column header="" body={MenuBodyTemplate} style={{ width: "1rem" }} />
        </CustomTable>
      </div>
    </>
  );
};
