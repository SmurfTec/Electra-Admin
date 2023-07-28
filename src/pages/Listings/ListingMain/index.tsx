import React, { useState, useEffect } from "react";
import { Header } from "../../../components";
import { CustomTableComponent, CustomButton } from "../../../atoms";
import { SVGIcon } from "../../../components/SVG";
import IMAGES from "../../../assets/Images";
import { CustomMenu, CustomTabView } from "../../../atoms/global.style";
import { Navigate, useNavigate } from "react-router-dom";
import { useListingDetail } from "../../../custom-hooks";
import { TabPanel } from "primereact/tabview";
import { Paginatior } from "../../../components";
import { ProgressSpinner } from "primereact/progressspinner";
import moment from "moment";
export const Listings = () => {
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [totalList, setTotalList] = useState();
  const {data ,listLoad}= useListingDetail(initialPageData);
  const [listings, setListings] = useState<any>([
    {
      name: "",
      data: [],
    },
  ]);
  const [MenuLabel, setMenuLabel] = useState("");
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState({});
  const [initial, setInitial] = useState(true);

  const getListings = async () => {
    let soldItems: any = [];
    let unsoldItems: any = [];
    let flagged:any = [];
    let All:any = [];
    setTotalList(data.data.stats[0].all_listings);
    data?.data?.listings?.forEach((item: any) => {
      let newObj = {
        ...item,
        id: item.id,
        Account: item?.user.firstname + item?.user.lastname,
        ItemName: item.product_data.title,
        Ask: item.ask,
        "Lwst Offer": item.lowest_offer ?? "-",
        "Hgst Offer": item.highest_offer ?? "-",
        "Sale Price": item.saleprice ? `$ ${item.saleprice}` : "-",
        "Listed On": moment(item?.created_on).format("DD MMM, YYYY"),
        Role: item.is_active ? "Unsold" : "Sold",
      };
      All.push(newObj);
      if (item.is_flagged) {
        flagged.push(newObj);
      }
      if (item.is_active) {
        unsoldItems.push(newObj);
      } else if (!item.is_active) {
        soldItems.push(newObj);
      }
    });
    setListings([
      { name: "All", data: All },
      { name: "sold", data: soldItems },
      { name: "not sold", data: unsoldItems },
      { name: "flagged", data: flagged },
    ]);
  };
  useEffect(() => {
    getListings();
  }, [data]);
  const viewItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();
    console.log(vaaluue);

    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  };

  const items = [
    {
      items: [
        {
          label: "View",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                onClick={(event: any) =>
                  viewItem(event, item, CurrSelectedProduct)
                }
                style={{ backgroundColor: "rgba(255, 245, 0, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#212121"} src={IMAGES.Ban} /> View listings
              </div>
            );
          },
        },
      
      ],
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
    const handleClick = (event: any) => {
      event.preventDefault();
      console.log(rowData);
      setCurrSelectedProduct(rowData.id);
      menuLeft.current.toggle(event);
    };
    useEffect(() => {
      if (initial) {
        setInitial(false);
      } else {
       
      }
    }, [MenuLabel, CurrSelectedProduct]);
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />

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
           max-w-[100px]
           mx-auto
            flex justify-center gap-5 items-center rounded-[25px] text-[12px] overflow-hidden`;
    } else if (option.Role === "Unsold") {
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
  useEffect(() => {
    if (MenuLabel == "View") {
      navigate(`/ListingsDetail/${CurrSelectedProduct}`);
    } else {
      console.log(
        "Menu",
        MenuLabel,
        "product",
        // selectedProducts,
        "CurrSelectedProduct",
        CurrSelectedProduct
      );
    }
  }, [MenuLabel]);
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
          {!listLoad?<> 
            <div className="flex gap-8 px-4 border-b border-custom "></div>
               <CustomTabView className="!bg-[#FCFCFC]">
            {listings.map((item: any, index: number) => {
              return(
              <TabPanel key={index} header={item.name}>
                <CustomTableComponent
                  colume={{ backgroundColor: "#FCFCFC !important" }}
                  headerStyle={{
                    color: "black",
                    fontWeight: "800",
                    backgroundColor: "#FCFCFC",
                  }}
                  filterData={item.data}
                  columnData={columnData}
                  rowStyling={"#FCFCFC !important"}
                  MultipleSelect={true}
                />
              </TabPanel>)
            })}
          </CustomTabView>
          </>
          :
          <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: "hidden" }} />
        </div>
         }
        </div>

      </div>
      {/* <div>
        <CustomButton
          onClick={() => {
            navigate("/ListingsDetail");
          }}
          iconLeft={<img src={IMAGES.Flag} />}
          classes="!w-auto !max-w-[150px] !px-[1rem] !h-[43px] !text-[13px] !rounded-[8px]"
          txt="Mark for review"
        />
      </div> */}
      <Paginatior
        totalRecords={Number(totalList)}
        initialPageData={initialPageData}
        setInitialPageData={setInitialPageData}
      />
     
    </div>
  );
};
