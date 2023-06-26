import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { SVGIcon } from "../../components/SVG";
import { CustomTableComponent } from "../../atoms";
import { CustomMenu } from "../../atoms/global.style";
import IMAGES from "../../assets/Images";
import { Header, Feemodifcard, Confirmationmodal } from "../../components";
import { useFeesAll } from "../../custom-hooks/feeshooks";
import { CreateFees } from "../../store/Slices/FeesSlice";
import moment from "moment";
export const Feemodifier = () => {
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const [visible, setVisible] = React.useState(false);
  const feeData = useFeesAll();
  const [feesModif, setFeesModif] = useState();
  const [currSelected, setCurrSelectedProduct] = useState<any>();
  const [feeValue, setFeeValue] = useState("");
  useEffect(() => {
    let newData = feeData?.fees.map((item: any, index: any) => {
      return {
        ID: item.id,
        Category: item.category.name,
        "Marketplace Fee": item.fees,
        "Last Changed On": moment(item.updated_on).format("DD MMM, YYYY"),
        Action: "Edit",
        type: item.type,
      };
    });
    setFeesModif(newData);
  }, [feeData]);
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
  const StatusBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      console.log(rowData);
      setCurrSelectedProduct(rowData);
      // menuLeft.current.toggle(event);
      setVisible(!visible);
    };
    return (
      <>
        <div
          onClick={handleClick}
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
          <p className="font-bold text-[white] ">{rowData.Action}</p>
          <img src={IMAGES.dropdown} />
        </div>
      </>
    );
  };
  const columnData = [
    { field: "ID", header: "ID" },
    { field: "Category", header: "Category" },
    { field: "Marketplace Fee", header: "Marketplace Fee" },
    { field: "Last Changed On", header: "Last Changed On" },
    { field: "Action", header: "Action", body: StatusBodyTemplate },
    { field: "", header: "", body: MenuBodyTemplate },
  ];
  const handleFunction = async (value?: any) => {
    try {
      console.log(currSelected);
      let newData = {
        type: currSelected.type,
        fees: feeValue,
        category: currSelected.Category,
      };
      let addFees= await CreateFees(currSelected.ID,newData);
      console.log(addFees)
      setVisible(!visible)
    } catch (e) {
      console.log(e)
    }
  };
  return (
    <div>
      <Header
        typeSearch={true}
        placeholder="Search "
        chooseFilter={true}
        UserBox={true}
      />
      <div>
        <p className="font-bold text-[20px] ml-3">
          Modify or change platform charges, Shipping Charges and othe frees.
        </p>
        <div className="ml-3 flex gap-3">
          <Feemodifcard
            onClick={() => setVisible(true)}
            title={"SHIPPING FEE"}
            number={"15"}
          />
          <Feemodifcard title={"PROCESSING FEE"} number={"15"} />
        </div>
      </div>
      <div>
        <p className="font-semibold ml-3 text-[20px]">Market Place Fee</p>
        <CustomTableComponent
          headerStyle={{ color: "black" }}
          filterData={feesModif}
          columnData={columnData}
        />
      </div>
      <Confirmationmodal
        classes={"!h-[330px] "}
        PopupHeader={"EDIT MARKETPLACE FEE"}
        visible={visible}
        setVisible={setVisible}
        cnfrmbtnText={"Update"}
        cnclebtnText={"Cancel"}
        text={
          "You are editting marketplace fee for Phones. Press update to make    changes on website."
        }
        placeholderclasses={"text-[#3C82D6]"}
        Feemodif={true}
        setValue={setFeeValue}
        value={feeValue}
        placeholderValue={"Enter Fees"}
        handleFunction={handleFunction}
      />
    </div>
  );
};
