import React from "react";
import { Header } from "../../../components";
import { DashCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import { CustomTableComponent } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { SVGIcon } from "../../../components/SVG";
import { CustomMenu } from "../../../atoms/global.style";
export const Searchrole = () => {
  const menuLeft: any = React.useRef(null);
  const filterData = [
    {
      Role: "Role",
      "User Count": "0342525252525",
      "Created On": "Huz@gmail.com",
      Edit: "Edit",
    },
    {
      Role: "Admin",
      "User Count": "0342525252525",
      "Created On": "Huz@gmail.com",
      Edit: "Edit",
    },
    {
      Role: "Admin",
      "User Count": "0342525252525",
      "Created On": "Huz@gmail.com",
      Edit: "Edit",
    },
    {
      Role: "Admin",
      "User Count": "0342525252525",
      "Created On": "Huz@gmail.com",
      Edit: "Edit",
    },
  ];
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
  const AccountBodyTemplate = (option) => {
    return (
      <div className="flex gap-2 items-center justify-center">
        <p className="font-bold">{option.Role}</p>
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
    return (
      <>
        <div
          className="bg-[#212121] w-[83px] h-[29px]
        mx-auto
        rounded
        flex
        justify-center
        overflow-hidden
        cursor-pointer
        items-center
        gap-1
        "
        >
          <img src={IMAGES.Editpen} />
          <p className="font-bold text-[white] ">{option.Edit}</p>
          <img src={IMAGES.dropdown} />
        </div>
      </>
    );
  };
  const columnData = [
    { field: "Role", header: "Role", body: AccountBodyTemplate },
    { field: "User Count", header: "User Count" },
    { field: "Created On", header: "Created On" },
    { field: "Edit", header: "Edit", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ];
  return (
    <div>
      <Header
        typeSearch={true}
        placeholder="Search Roles"
        chooseFilter={false}
        UserBox={true}
      />
      <div>
        <DashCard
          outerclasses={"!bg-[#212121] !w-[187px] !h-[93px] !mt-10"}
          Add={true}
          txt={"Add New Member"}
          txtclasses={"!text-[#FFFFFF]"}
          Addimg={IMAGES.newmembers}
        />
        <div className="mt-4 bg-[#FCFCFC] w-[90%] rounded-[10px]">
          <div>
            <p className="font-bold p-4 text-[19px]">
              Administrators <br />
              <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
                Find all of your team accounts
              </span>
            </p>
            <div className="flex gap-8 px-4 border-b border-custom ">
              <p className="border-b-4 border-[#3C82D6] text-[#3C82D6] pb-2 font-semibold">
                All (3)
              </p>
            </div>
            <CustomTableComponent
              columnStyle={{ backgroundColor: "#FCFCFC" }}
              headerStyle={{ color: "black" }}
              //   columnHeader={"flex-start"}
              filterData={filterData}
              columnData={columnData}
              rowStyling={"#FCFCFC"}
            />
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
