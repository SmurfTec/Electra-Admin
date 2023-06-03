import React from "react";
import { Header } from "../../../components";
import { CustomTableComponent, ReviewButton } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import IMAGES from "../../../assets/Images";
import { CustomMenu } from "../../../atoms/global.style";
import { useNavigate } from "react-router-dom";

export const Listings = () => {
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
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
  const filterData = [
    {
      id: 1,
      Account: "ListedBy",
      ItemName: "ItemName",
      Ask: "Ask",
      "Lwst Offer": "Lwst Offer",
      "Hgst Offer": "Hgst Offer",
      "Sale Price": "$4345",
      "Listed On": "Listed On",
      Role: "Sold",
    },
    {
      id: 2,
      Account: "ListedBy",
      ItemName: "ItemName",
      Ask: "Ask",
      "Lwst Offer": "Lwst Offer",
      "Hgst Offer": "Hgst Offer",
      "Sale Price": "$4345",
      "Listed On": "Listed On",
      Role: "Sold",
    },
    {
      id: 3,
      Account: "ListedBy",
      ItemName: "ItemName",
      Ask: "Ask",
      "Lwst Offer": "Lwst Offer",
      "Hgst Offer": "Hgst Offer",
      "Sale Price": "$4345",
      "Listed On": "Listed On",
      Role: "Unsold",
    },
    {
      id: 4,
      Account: "ListedBy",
      ItemName: "ItemName",
      Ask: "Ask",
      "Lwst Offer": "Lwst Offer",
      "Hgst Offer": "Hgst Offer",
      "Sale Price": "$4345",
      "Listed On": "Listed On",
      Role: "Unsold",
    },
  ];
  const AccountBodyTemplate = (option: any) => {
    return (
      <div className="flex gap-2 items-center justify-center">
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
    if (option.Role === "Sold") {
      style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-blue text-[black]
           w-auto
           mx-auto
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    } else if (option.Role === "Unsold") {
      style = `px-[14px] py-[4px]
          text-center
          h-[33px]
           bg-custom-pink text-[black]
           w-auto
           mx-auto
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    }
    return (
      <>
        <div className={style}>
          <p className="font-bold">{option.Role}</p>
        </div>
      </>
    );
  };
  const SalesTemplate = (option: any) => {
    return <p className="text-[#3C82D6]">{option["Sale Price"]}</p>;
  };
  const columnData = [
    { field: "id", header: "ID" },
    { field: "Account", header: "Account", body: AccountBodyTemplate },
    { field: "ItemName", header: "ItemName" },
    { field: "Ask", header: "Ask" },
    { field: "Lwst Offer", header: "Lwst Offer" },
    { field: "Hgst Offer", header: "Hgst Offer" },
    { field: "Sale Price", header: "Sale Price", body: SalesTemplate },
    { field: "Listed On", header: "Listed On" },
    { field: "Role", header: "Role", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ];
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
          <p className="font-bold p-4 text-[19px]">
            Listings <br />
            <span className="font-medium text-[#A4A4A4] -mt-[10px]  text-[14px]">
              Check All the Listings
            </span>
          </p>
          <div className="flex gap-8 px-4 border-b border-custom ">
            <p className="border-b-4 border-[#3C82D6] text-[#3C82D6] pb-2 font-semibold">
              All (9)
            </p>
            <p className="text-[#B4B4B4]">Super Admin (3)</p>
            <p className="text-[#B4B4B4]">Admin (3) </p>
            <p className="text-[#B4B4B4]">Sub Admin(9)</p>
          </div>
          <CustomTableComponent
            columnStyle={{ backgroundColor: "#FCFCFC" }}
            headerStyle={{ color: "black", fontWeight: "800" }}
            filterData={filterData}
            columnData={columnData}
            rowStyling={"#FCFCFC"}
            MultipleSelect={true}
          />
        </div>
      </div>
      <div>
        <ReviewButton
        onClick={()=>{
          navigate("/ListingsDetail")
        }}
        txt={"Mark for review"} />
      </div>
    </div>
  );
};
