import { useState, useRef, useEffect } from "react";
import { Header } from "../../../components/index.js";
import { DashCard } from "../../../components/index.js";
import IMAGES from "../../../assets/Images.js";
import { CustomTableComponent, CustomSwitch } from "../../../atoms/index.js";
import { SVGIcon } from "../../../components/SVG/index.js";
import { CustomMenu } from "../../../atoms/global.style";
import { useNavigate } from "react-router-dom";
import { GetAllProducts } from "../../../store/Slices/ProductSlice.js";
import moment from "moment";
import { MenuItem } from "primereact/menuitem";
export const Products = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const getProducts = async () => {
    try {
      const response = await GetAllProducts();
      let latestArray;
      latestArray = response.products.map((item: any, index: number) => {
        let newObj = {
          ...item,
          category: item.category.name,
          Brand: item.brand.title,
          listing: item.properties.listings,
          addedon: moment(item.created_on).format("DD,MMM,YYYY"),
          availibility: item.is_active ? "Active" : "InActive",
        };
        return newObj;
      });
      setFilterData(latestArray);
    } catch (e) {}
  };
  useEffect(() => {
    getProducts();
  }, []);
  const [MenuLabel, setMenuLabel] = useState("");
  const menuLeft: any = useRef(null);
  const [selectedProducts, setSelectedProducts] = useState<any>([]);
  const [LoadMore, setLoadMore] = useState(true);
  const [CurrSelectedProduct, setCurrSelectedProduct] = useState({});
  const SwitchTemplate = (option: any) => {
    const [checked, setChecked] = useState(
      option.availibility.toLowerCase() == "active" ? true : false
    );
    return (
      <>
        <CustomSwitch checked={checked} setChecked={setChecked} />
      </>
    );
  };
  const viewItem = (event: React.MouseEvent, item: any) => {
    event.stopPropagation();
    console.log(event,"EVENT")
    console.log(item,"EVENT")
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  };
  const ViewItem = (event: React.MouseEvent, item: any) => {
    console.log(CurrSelectedProduct, "VALUE");
    event.stopPropagation();
    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
    // navigate("/ProductDetail");
  };

  const items = [
    {
      label: "View",
      template: (item:MenuItem) => {
        return (
          <div
          onClick={(event: any) => viewItem(event, item)}
            style={{ backgroundColor: "rgba(255, 245, 0, 0.05)" }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
          >
            <SVGIcon
              width="9px"
              height="6px"
              fillcolor={"#212121"}
              src={IMAGES.eye}
            />{" "}
            View
          </div>
        );
      },
    },
    {
      label: "Delete",
      template: (item: any, options: any) => {
        return (
          <div
            onClick={(event: any) => viewItem(event, item)}
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
      template: (item: any, options: any) => {
        return (
          <div
            // onClick={(event: any) => ViewItem(event, item)}
            style={{ background: "rgba(46, 102, 194, 0.05)" }}
            className="flex gap-1 items-center  text-[10px] font-[400] text-[#21212]"
          >
            <SVGIcon fillcolor={"#212121"} src={IMAGES.Select} /> Select
          </div>
        );
      },
    },
  ];
  const MenuBodyTemplate = (rowData: any) => {
    const handleClick = (event: any) => {
      event.preventDefault();
      setCurrSelectedProduct(rowData.id);
      menuLeft.current.toggle(event);
    };
useEffect(()=>{

          console.log(
            "Menu",
            MenuLabel,
            "product",
            selectedProducts,
            "CurrSelectedProduct",
            CurrSelectedProduct
          );
        
},[MenuLabel])
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
  const [columnData] = useState([
    { field: "id", header: "ID" },
    { field: "title", header: "Title" },
    { field: "category", header: "Category" },
    { field: "Brand", header: "Brand" },
    { field: "addedon", header: "Added On" },
    { field: "listing", header: "Listing" },
    { field: "availibility", header: "Availibility", body: SwitchTemplate },

    { field: "", header: "", body: MenuBodyTemplate },
  ]);

  return (
    <div>
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      <div className="flex flex-wrap gap-6 mt-[28px]">
        <DashCard
          title={"Total Products"}
          totalNumber={"4500"}
          myImg={IMAGES.ProductBox}
          imgColor={"bg-yellow-dash"}
          textDash={" !w-full "}
          textColor={"#3C82D6"}
          txt="Last Updated 24,aug,2020"
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"Product Sold in march"}
          totalNumber={"350"}
          myImg={IMAGES.ProductBox}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-blue !w-[63px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          title={"Product Sold In 6 Months"}
          totalNumber={"3500"}
          myImg={IMAGES.ProductBox}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-blue !w-[63px] "}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses="w-[284px] h-[140px]"
        />
        <DashCard
          onClick={() => navigate("/AddProduct")}
          Add={true}
          txt="Add New Product"
          outerclasses="w-[284px] h-[140px]"
          txtclasses={"text-[#212121]"}
          Addimg={IMAGES.AddItem}
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
    </div>
  );
};
