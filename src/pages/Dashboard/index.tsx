import React from "react";
import {
  DashCard,
  StaticCard,
  PlatformEarning,
  RevenueChart,
  DashTable,
  Header,
  DashboardModal,
} from "../../components";
import IMAGES from "../../assets/Images";
import { useState } from "react";
import {
  useGetDashStats,
  useGetBestSelling,
} from "../../custom-hooks/DashHooks";
import { useGetAllUsers } from "../../custom-hooks/UserHooks";
import { useGetProducts } from "../../custom-hooks";
import { BaseURL } from "../../config";
import moment from "moment";
import { useGetOrderAll } from "../../custom-hooks/OrderHooks";
import { ProgressSpinner } from "primereact/progressspinner";

export const Dashboard = () => {
  const [visible, setvisible] = useState(false);
  const months = [
    { value: "year", label: "Year" },
    { value: "sixMonths", label: "6 months" },
    { value: "threeMonths", label: "3 months" },
  ];
  const [monthValue, setMonthValue] = useState("year");
  const [productsParam, setProductParams] = useState({
    rowsPerPage: 4,
    currentPage: 1,
  });
  const [bestProductParams, setBestProductParams] = useState({
    rowsPerPage: 4,
    currentPage: 1,
  });

  const { orderData, orderLoading }: any = useGetOrderAll({
    status: "completed",
  });
  const { users, userLoading }: any = useGetAllUsers();
  const { bestSelling, bestLoading }: any =
    useGetBestSelling(bestProductParams);
  const { productsAdded, prodLoading }: any = useGetProducts(productsParam);
  const [newData, setNewData] = useState<any>();
  const { dashStats, loading }: any = useGetDashStats();
  let convertedArray = dashStats?.revenueStats?.year?.data ?? {};
  React.useEffect(() => {
    if (!loading) {
      let period;
      if (monthValue === "year") {
        period = dashStats?.revenueStats?.year?.data;
      } else if (monthValue === "sixMonths") {
        period = dashStats?.revenueStats?.sixMonths?.data;
      } else if (monthValue === "threeMonths") {
        period = dashStats?.revenueStats?.threeMonths?.data;
      }
      convertedArray = Object.entries(period)?.map(
        ([date, { sales }]: any) => ({
          x: date.split("-")[0],
          y: sales,
        })
      );
      setNewData(convertedArray);
    }
  }, [dashStats, loading, monthValue]);
  let latestArr = users?.users?.slice(0, 4).map((item: any) => {
    let newObj = {
      id: item.id,
      name: item?.profile?.firstname + item?.profile?.lastname || "",
      phone: item?.profile?.mobile_no || "",
      email: item?.email || "",
      Date: moment(item.created_at).format("DD,MM,YYYY"),
    };

    return newObj;
  });
  latestArr?.sort((a: any, b: any) => a.id - b.id);
  const data = latestArr;
  const data2 =
    !prodLoading &&
    productsAdded?.products &&
    productsAdded?.products.length > 0 &&
    productsAdded?.products?.map((item: any, index: any) => {
      return {
        img: item?.images?.length > 0 ? BaseURL + item?.images[0].filename : "",
        id: item.title,
        name: { number: item.product_properties.sold, status: "sold" },
        email: { number: item.product_properties.listings, status: "sold" },
        Date: { number: `$ ${item.highest_offer ?? "0"}`, status: "Profit" },
      };
    });
  const data3 =
    !bestLoading &&
    bestSelling?.products &&
    bestSelling?.products.length > 0 &&
    bestSelling?.products?.map((item: any, index: any) => {
      return {
        img: BaseURL + item.image.filename,
        id: item.title,
        name: { number: item.sold, status: "sold" },
        email: { number: item.listings, status: "sold" },
        Date: { number: `$ ${item.profit ?? "0"}`, status: "Profit" },
      };
    });
  return (
    <div>
      <Header
        dropdown={true}
        UserBox={true}
        typeSearch={true}
        chooseDate={true}
      />
      {!loading && !prodLoading && !bestLoading && !userLoading ? (
        <>
          <div className="flex flex-wrap justify-start gap-2">
            {!loading && (
              <>
                {" "}
                <DashCard
                  // onClick={() => setvisible(true)}
                  title={"Net Revenue"}
                  totalNumber={`$ ${dashStats?.revenueStats?.total_revenue?.toFixed(
                    2
                  )}`}
                  myImg={IMAGES.coin}
                  imgColor={"bg-blue-dash"}
                  textDash={
                    dashStats?.revenueStats?.revenue_percentage < 0
                      ? "bg-custom-red"
                      : "bg-custom-blue"
                  }
                  textColor={
                    dashStats?.revenueStats?.revenue_percentage < 0
                      ? "#FF0000"
                      : "#3C82D6"
                  }
                  arrowImg={
                    dashStats?.revenueStats?.revenue_percentage < 0
                      ? IMAGES.downarrow
                      : IMAGES.uparrow
                  }
                  outerclasses={`!w-[400px]`}
                  percentageTxt={`$ ${dashStats?.revenueStats?.revenue_percentage?.toFixed(
                    2
                  )}`}
                />
                <DashCard
                  title={"Products Sold"}
                  totalNumber={`${dashStats?.productStats?.total_products_sold}`}
                  myImg={IMAGES.box}
                  imgColor={"bg-yellow-dash"}
                  outerclasses={`!w-[400px] `}
                  textDash={
                    dashStats?.productStats?.products_percentage < 0
                      ? "bg-custom-red"
                      : "bg-custom-blue"
                  }
                  textColor={
                    dashStats?.productStats?.products_percentage < 0
                      ? "#FF0000"
                      : "#3C82D6"
                  }
                  arrowImg={
                    dashStats?.productStats?.products_percentage < 0
                      ? IMAGES.downarrow
                      : IMAGES.uparrow
                  }
                  percentageTxt={`$ ${dashStats?.productStats?.products_percentage?.toFixed(
                    2
                  )}`}
                />
                <DashCard
                  title={"Total Users"}
                  totalNumber={dashStats?.userStats?.total_users_registered}
                  myImg={IMAGES.person}
                  imgColor={"bg-custom-grey"}
                  outerclasses={`!w-[400px]`}
                  textDash={
                    dashStats?.userStats?.users_years_percentage < 0
                      ? "bg-custom-red"
                      : "bg-custom-blue"
                  }
                  textColor={
                    dashStats?.userStats?.users_years_percentage < 0
                      ? "#FF0000"
                      : "#3C82D6"
                  }
                  arrowImg={
                    dashStats?.userStats?.users_years_percentage < 0
                      ? IMAGES.downarrow
                      : IMAGES.uparrow
                  }
                  percentageTxt={`$ ${dashStats?.userStats?.users_years_percentage?.toFixed(
                    2
                  )??"-"}`}
                />
                <DashCard
                  title={"Total Listings"}
                  totalNumber={`${dashStats?.listingStats?.total_listings}`}
                  myImg={IMAGES.box}
                  imgColor={"bg-yellow-dash"}
               
                  outerclasses={`!w-[400px]`}
                  textDash={
                    dashStats?.listingStats?.total_listings_percentage < 0
                      ? "bg-custom-red"
                      : "bg-custom-blue"
                  }
                  textColor={
                    dashStats?.listingStats?.total_listings_percentage < 0
                      ? "#FF0000"
                      : "#3C82D6"
                  }
                  arrowImg={
                    dashStats?.listingStats?.total_listings_percentage < 0
                      ? IMAGES.downarrow
                      : IMAGES.uparrow
                  }
                  percentageTxt={`$ ${dashStats?.listingStats?.total_listings_percentage?.toFixed(
                    1
                  )??"-"}`}
                />
              </>
            )}
          </div>
          <div className="flex mt-3 gap-2 w-full   ">
            <div>
              <StaticCard
                listing={dashStats?.listingStats?.total_listings_for_last_month}
                Products={
                  dashStats?.productStats?.total_products_sold_last_month
                }
              />
              {!orderLoading && <PlatformEarning data={orderData.orders} />}
            </div>

            <div className="overflow-hidden">
              {!loading && newData && (
                <RevenueChart
                  statData={newData}
                  monthsData={months}
                  setData={setMonthValue}
                />
              )}
              {!userLoading && (
                <DashTable
                  customHeader="User Registrations"
                  tableHeaderColor="#FCFCFC "
                  data={data}
                  header={true}
                  classess={"!px-[3px] !mt-4 !rounded !overflow-x-auto "}
                  route={"/Users"}
                />
              )}
            </div>
          </div>
          <div className="flex justify-start gap-10 mb-6 ">
            <div className="w-[50%] ">
              {data3 && (
                <DashTable
                  data={data3}
                  tableHeaderColor="#FCFCFC"
                  imginData={true}
                  selling={true}
                  customHeader="Best Selling Product"
                  pagination={true}
                  route={"/Products"}
                  totalProducts={bestSelling?.stats?.total_products}
                  setParams={setBestProductParams}
                  page={bestProductParams?.currentPage}
                  param={bestProductParams}
                />
              )}
            </div>
            <div className=" w-[50%]">
              {data2 && (
                <DashTable
                  data={data2}
                  tableHeaderColor="#FCFCFC"
                  imginData={true}
                  selling={true}
                  customHeader="Recently Added Product"
                  pagination={true}
                  route={"/Products"}
                  totalProducts={productsAdded?.stats?.total_products}
                  setParams={setProductParams}
                  page={productsParam?.currentPage}
                  param={productsParam}
                />
              )}
            </div>
          </div>
        </>
      ) : (
        <div className="w-full h-full flex justify-start items-center overflow-y-hidden">
          <ProgressSpinner style={{ overflow: "hidden" }} />
        </div>
      )}
      <DashboardModal
        PopupHeader="Filter Dashboard"
        visible={visible}
        setVisible={setvisible}
        text={"Select Date to show statistics  until selected Date"}
        cnfrmbtnText={"Confirm"}
        classes={"!h-[310px]"}
      />
    </div>
  );
};
