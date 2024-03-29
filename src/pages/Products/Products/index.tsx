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
import { Paginatior } from "../../../components/index.js";
import { ProgressSpinner } from "primereact/progressspinner";
export const Products = () => {
  const navigate = useNavigate();
  const [filterData, setFilterData] = useState([]);
  const [initial, setInitial] = useState(true);
  const [loading, setLoading] = useState(true);
  const [initialPageData, setInitialPageData] = useState({
    rowsPerPage: 10,
    currentPage: 1,
  });
  const [totalProducts, setTotalProducts] = useState();
  const [stats, setStats] = useState<any>();
  const getProducts = async () => {
    try {
      const response = await GetAllProducts(initialPageData);
      setTotalProducts(response.stats.total_products);
      setStats(response.stats);
      let latestArray;
      latestArray = response.products.map((item: any, index: number) => {
        let newObj = {
          ...item,
          category: item.category.name,
          Brand: item.brand.title,
          listing: item.product_properties.listings,
          addedon: moment(item.created_on).format("DD,MMM,YYYY"),
          availibility: item.is_active ? "Active" : "InActive",
        };
        return newObj;
      });
      setFilterData(latestArray);
      setLoading(false);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getProducts();
  }, [initialPageData]);
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
  3;
  const viewItem = (event: React.MouseEvent, item: any, vaaluue?: any) => {
    event.stopPropagation();
    console.log(vaaluue);

    setMenuLabel((prevLabel) => (prevLabel === item.label ? "" : item.label));
  };

  const items = [
    {
      label: "View",
      template: (item: MenuItem) => {
        return (
          <div
            onClick={(event: any) => viewItem(event, item, CurrSelectedProduct)}
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
  ];
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
        console.log(
          "Menu",
          MenuLabel,
          "product",
          selectedProducts,
          "CurrSelectedProduct",
          CurrSelectedProduct
        );
      }
    }, [MenuLabel, CurrSelectedProduct]);
    return (
      <>
        <div
          className={`px-[14px] py-[4px] text-[white] relative  flex justify-center items-center rounded-[5px] text-[12px]`}
        >
          <SVGIcon onClick={handleClick} src={IMAGES.Dots} />

          <CustomMenu
            model={items}
            height={"auto"}
            popup
            ref={menuLeft}
            id="popup_menu_left"
          />
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
  useEffect(() => {
    if (MenuLabel == "View") {
      navigate(`/ProductDetail/${CurrSelectedProduct}`);
    } else {
      console.log(
        "Menu",
        MenuLabel,
        "product",
        selectedProducts,
        "CurrSelectedProduct",
        CurrSelectedProduct
      );
    }
  }, [MenuLabel]);
  return (
    <div>
      <Header typeSearch={true} chooseFilter={true} UserBox={true} />
      {!loading ? (
        <>
          {" "}
          <div className="flex flex-wrap gap-6 mt-[28px]">
            <DashCard
              title={"Total Products"}
              totalNumber={stats?.total_products}
              myImg={IMAGES.ProductBox}
              imgColor={"bg-yellow-dash"}
              textDash={" !w-full "}
              textColor={"#3C82D6"}
              txt="Last Updated 24,aug,2020"
              outerclasses="w-[284px] h-[140px]"
            />
            <DashCard
              title={"Product Sold in march"}
              totalNumber={stats?.total_products_sold_last_month}
              myImg={IMAGES.ProductBox}
              imgColor={"bg-yellow-dash"}
              textDash={
                stats?.products_percentage < 0
                  ? "bg-custom-red !w-[80px]"
                  : "bg-custom-blue !w-[80px]"
              }
              textColor={
                stats?.products_percentage < 0
                  ? "#FF0000"
                  : "#3C82D6"
              }
              arrowImg={
                stats?.products_percentage < 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
              percentageTxt={`% ${ stats?.products_percentage?.toFixed(
                1
              )}`}
              outerclasses="w-[284px] h-[140px]"
            />
            <DashCard
              title={"Product Sold In 6 Months"}
              totalNumber={stats?.total_products_sold_last_Six_months}
              myImg={IMAGES.ProductBox}
              imgColor={"bg-yellow-dash"}
              textDash={
                stats?.products_percentage < 0
                  ? "bg-custom-red !w-[80px]"
                  : "bg-custom-blue !w-[80px]"
              }
              textColor={
                stats?.products_percentage < 0
                  ? "#FF0000"
                  : "#3C82D6"
              }
              arrowImg={
                stats?.products_percentage < 0
                  ? IMAGES.downarrow
                  : IMAGES.uparrow
              }
              percentageTxt={`% ${ stats?.products_percentage?.toFixed(
                1
              )}`}
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
              // MultipleSelect={true}
              LoadMore={LoadMore}
              setLoadMore={setLoadMore}
              // pagination={true}
            />
            <Paginatior
              totalRecords={Number(totalProducts)}
              initialPageData={initialPageData}
              setInitialPageData={setInitialPageData}
              recordShowing={filterData?.length}
            />
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: "hidden" }} />
        </div>
      )}
    </div>
  );
};
