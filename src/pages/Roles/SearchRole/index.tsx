import React from "react";
import { Header } from "../../../components";
import { DashCard } from "../../../components";
import { useNavigate } from "react-router-dom";
import { CustomTableComponent } from "../../../atoms";
import IMAGES from "../../../assets/Images";
import { SVGIcon } from "../../../components/SVG";
import { CustomMenu } from "../../../atoms/global.style";
import { useGetRoles } from "../../../custom-hooks/RolesHooks";
import { ProgressSpinner } from "primereact/progressspinner";
import { deleteRole } from "../../../store/Slices/RoleSlice";
import moment from "moment";
type SuperAdminRole = {
  created_at: string;
  created_by: string;
  description: string;
  name: string;
  parent_role: string | null;
};
type ROLE = {
  roles: SuperAdminRole[] | any;
  loading: boolean;
};
export const Searchrole = () => {
  const navigate = useNavigate();
  const menuLeft: any = React.useRef(null);
  const [initialPageData, setInitialPageData] = React.useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [MenuLabel, setMenuLabel] = React.useState("");
  const [CurrSelectedProduct, setCurrSelectedProduct] = React.useState({});
  const [initial, setInitial] = React.useState(true);

  const [fetch, setFetch] = React.useState(false);
  const { roles, rolesStats, users, roleArray, totalStats, loading }: any =
    useGetRoles(fetch, initialPageData);
  console.log(roles);

  if (!loading) {
    console.log(roles);
  }
  const filterData = roles?.map((item: SuperAdminRole, index: number) => {
    console.log(item, "ITEEM");
    return {
      Role: item.name,
      "User Count": item.description ?? "-",
      "Created On": moment(item.created_at).format("DD MMM YYYY"),
      Edit: item.name,
    };
  });
  const viewItem = async (
    event: React.MouseEvent,
    item: any,
    vaaluue?: any
  ) => {
    event.stopPropagation();
    console.log(vaaluue);
    setFetch(true)
    const deleteTheRole = await deleteRole(vaaluue.Role);
    setFetch(false)
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  };
  //  useEffect(() => {
  //   if (MenuLabel == "View") {
  //     navigate(`/ProductDetail/${CurrSelectedProduct}`);
  //   } else {
  //     console.log(
  //       "Menu",
  //       MenuLabel,
  //       "product",
  //       selectedProducts,
  //       "CurrSelectedProduct",
  //       CurrSelectedProduct
  //     );
  //   }
  // }, [MenuLabel]);
  const items = [
    {
      items: [
        {
          label: "Ban User",
          // command: handleBanUser,
          template: (item: any, options: any) => {
            return (
              <div
                onClick={(event: any) =>
                  viewItem(event, item, CurrSelectedProduct)
                }
                style={{ background: "rgba(231, 29, 54, 0.05)" }}
                className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
              >
                <SVGIcon fillcolor={"#E71D36"}  src={IMAGES.Delete} /> Delete role
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
    const handleClick = (event: any) => {
      event.preventDefault();
      console.log(rowData);
      setCurrSelectedProduct(rowData);
      menuLeft.current.toggle(event);
    };
    React.useEffect(() => {
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

          <CustomMenu height={"50px"} model={items} popup ref={menuLeft} id="popup_menu_left" />
        </div>
      </>
    );
  };
  const StatusBodyTemplate = (option: any) => {
    return (
      <>
        <div
          onClick={() => {
            navigate(`/Editroles/${option.Edit}`);
          }}
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
          <p className="font-bold text-[white] ">Edit</p>
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
  React.useEffect(() => {
    if (MenuLabel == "View") {
      // navigate(`/ListingsDetail/${CurrSelectedProduct}`);
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
        typeSearch={true}
        placeholder="Search Roles"
        chooseFilter={false}
        UserBox={true}
      />
      <div>
        <DashCard
          onClick={() => navigate("/Creationroles")}
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
            {!loading &&!fetch   ? (
              <CustomTableComponent
                columnStyle={{ backgroundColor: "#FCFCFC" }}
                headerStyle={{ color: "black", fontWeight: "800" }}
                //   columnHeader={"flex-start"}
                filterData={filterData}
                columnData={columnData}
                rowStyling={"#FCFCFC !important"}
              />
            ) : (
              <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
                <ProgressSpinner style={{ overflow: "hidden" }} />
              </div>
            )}
          </div>
        </div>
        <div></div>
      </div>
    </div>
  );
};
