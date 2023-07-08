import React, { useState, useEffect } from "react";
import {
  Header,
  AdminCards,
  DashCard,
  ShippingModal,
} from "../../../components";
import { CustomTableComponent } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import IMAGES from "../../../assets/Images";
import { CustomMenu, CustomTabView } from "../../../atoms/global.style";
import { useNavigate } from "react-router-dom";
import { TabPanel } from "primereact/tabview";
import { getRoles } from "../../../store/Slices/RoleSlice";
import { useGetRoles } from "../../../custom-hooks/roles/RolesHooks";
import moment from "moment";
interface RoleStats {
  role: string;
  users: number;
}

type Stats = RoleStats[];
type Account = {
  email: string;
  created_at: string;
  role: string;
  profile?: {
    username: string;
    mobile_no: string;
    firstname: string;
    lastname: string;
  };
};
type User = {
  id: string;
  email: string;
  // Other user properties...
  role: string;
};
type userArray = User[];
type PartialAccount = Partial<Account>;
export const Roles = () => {
  const [visible, setVisible] = React.useState(false);
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const {
    
    rolesStats,
    users,
    roleArray,
  }: {
    roles?: any;
    rolesStats: Stats | any;
    users: userArray | any;
    roleArray: any;
  } = useGetRoles();
  const filterData = users?.map((item: PartialAccount, index: number) => {
    return {
      Account: `${item.profile?.firstname} ${item.profile?.lastname}`,
      "Email Address": item.email,
      "Phone No": item.profile?.mobile_no ?? "-",
      "Assigned On": moment(item.created_at).format("DD MMM YYYY"),
      Role: item.role,
    };
  });

  const items = [
    {
      items: [
        {
          label: "Ban User",
          // command: handleBanUser,
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
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex w-full gap-1  items-center  text-[10px] font-[400] text-[#E71D36]"
              >
                <SVGIcon fillcolor={"#E71D36"} src={IMAGES.Delete} /> Delete
              </div>
            );
          },
        },
        {
          label: "Select",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                style={{ background: "rgba(46, 102, 194, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Select} /> Select
              </div>
            );
          },
        },
      ],
    },
  ];
  const AccountBodyTemplate = (option: any) => {
    return (
      <div className="flex gap-2 items-center justify-start">
        <img src={IMAGES.Guy1} />
        <p className="font-bold">{option.Account}</p>
      </div>
    );
  };
  const MenuBodyTemplate = (rowData: any) => {
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

          <CustomMenu model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    let style;

    style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-blue text-[black]
       max-w-[160px]
          
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;

    return (
      <>
        <div className={style}>
          <p className="font-bold">{option.Role}</p>
          <img src={IMAGES.dropdown} />
        </div>
      </>
    );
  };
  const columnData = [
    { field: "Account", header: "Account", body: AccountBodyTemplate },
    { field: "Email Address", header: "Email Address" },
    { field: "Phone No", header: "Phone No" },
    { field: "Assigned On", header: "Assigned On" },
    {
      field: "Role",
      header: "Role",
      body: StatusBodyTemplate,
      className: "role",
    },
    { field: "", header: "", body: MenuBodyTemplate },
  ];

  return (
    <div>
      <ShippingModal visible={visible} setVisible={setVisible} />
      <Header
        placeholder="Search Admins"
        typeSearch={true}
        chooseFilter={true}
        UserBox={true}
      />
      <div className="flex gap-2">
        {rolesStats &&
          rolesStats.length > 0 &&
          rolesStats?.map((item: RoleStats, index: number) => {
            return (
              <AdminCards key={index} accounts={item.users} title={item.role} />
            );
          })}
        <DashCard
          onClick={() => navigate("/Newadmin")}
          outerclasses={"!bg-[#212121] !w-[187px] !h-[93px]"}
          Add={true}
          txt={"Add New Member"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.newmembers}
        />
        <DashCard
          onClick={() => setVisible(true)}
          outerclasses={"!bg-[#3C82D6] !w-[187px] !h-[93px]"}
          Add={true}
          txt={"View Roles"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.Rolesbadge}
        />
      </div>
      <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
        <div>
          <p className="font-bold p-4 text-[19px]">
            Administrators <br />
            <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
              Find all of your team accounts
            </span>
          </p>
          <CustomTabView>
            <TabPanel header={`All(${filterData?.length})`}>
              <p className="m-0">
                <CustomTableComponent
                  columnStyle={{ backgroundColor: "#FCFCFC" }}
                  headerStyle={{
                    color: "black",
                    fontWeight: "800",
                    textAlign: "left",
                  }}
                  columnHeaderFirst={"start"}
                  filterData={filterData}
                  columnData={columnData}
                  rowStyling={"#FCFCFC !important"}
                  // columnHeader={"flex-start"}
                />
              </p>
            </TabPanel>
            {roleArray?.map((item: any, index: any) => {
              const filterData2 = item.users?.map((item: PartialAccount, index: number) => {
                return {
                  Account: `${item.profile?.firstname} ${item.profile?.lastname}`,
                  "Email Address": item.email,
                  "Phone No": item.profile?.mobile_no ?? "-",
                  "Assigned On": moment(item.created_at).format("DD MMM YYYY"),
                  Role: item.role,
                };
              });
              return (
                <TabPanel key={index} header={item.name}>
                  
                  <CustomTableComponent
                  columnStyle={{ backgroundColor: "#FCFCFC" }}
                  headerStyle={{
                    color: "black",
                    fontWeight: "800",
                    textAlign: "left",
                  }}
                  columnHeaderFirst={"start"}
                  filterData={filterData2}
                  columnData={columnData}
                  rowStyling={"#FCFCFC !important"}
                  // columnHeader={"flex-start"}
                />
                
                </TabPanel>
              );
            })}
      
          </CustomTabView>
        </div>
      </div>
    </div>
  );
};
