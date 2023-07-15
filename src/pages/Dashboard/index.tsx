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
export const Dashboard = () => {
  const [visible, setvisible] = useState(false);
  const [months, setMonth] = useState("year");
  const [productsParam, setProductParams] = useState({
    limit: 5,
    page: 1,
  });
  const [bestProductParams, setBestProductParams] = useState({
    limit: 5,
    page: 1,
  });
  const { orderData, orderLoading }: any = useGetOrderAll();
  const { users, userLoading }: any = useGetAllUsers();
  const { bestSelling, bestLoading }: any = useGetBestSelling(bestProductParams);
  const { productsAdded, prodLoading }: any = useGetProducts(productsParam);
  const [newData, setNewData] = useState<any>();
  const { dashStats, loading }: any = useGetDashStats();
  let convertedArray = dashStats?.revenueStats?.year?.data ?? {};
  React.useEffect(() => {
    if (!loading) {
      convertedArray = Object.entries(dashStats?.revenueStats?.year?.data)?.map(
        ([date, { sales }]: any) => ({
          x: date.split("-")[0],
          y: sales,
        })
      );
      setNewData(convertedArray);
    }
  }, [dashStats, loading]);
  let latestArr = users?.users?.slice(0, 10).map((item: any) => {
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
        img: BaseURL + item.images[0].filename,
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
      <div className="flex flex-wrap justify-start gap-2">
        {!loading && (
          <>
            {" "}
            <DashCard
              onClick={() => setvisible(true)}
              title={"Net Revenue"}
              totalNumber={`$ ${dashStats?.revenueStats?.total_revenue?.toFixed(
                2
              )}`}
              myImg={IMAGES.coin}
              imgColor={"bg-blue-dash"}
              textDash={"bg-custom-blue"}
              textColor={"#3C82D6"}
              arrowImg={IMAGES.uparrow}
              outerclasses={`!w-[400px]`}
            />
            <DashCard
              title={"Products Sold"}
              totalNumber={`${dashStats?.productStats?.total_products_sold}`}
              myImg={IMAGES.box}
              imgColor={"bg-yellow-dash"}
              textDash={"bg-custom-blue"}
              textColor={"#3C82D6"}
              arrowImg={IMAGES.uparrow}
              outerclasses={`!w-[400px] `}
            />
            <DashCard
              title={"Total Users"}
              totalNumber={dashStats?.userStats?.total_users_registered}
              myImg={IMAGES.person}
              imgColor={"bg-custom-grey"}
              textDash={"bg-custom-red"}
              textColor={"#FF0000"}
              arrowImg={IMAGES.downarrow}
              outerclasses={`!w-[400px]`}
            />
            <DashCard
              title={"Total Listings"}
              totalNumber={`${dashStats?.listingStats?.total_listings}`}
              myImg={IMAGES.box}
              imgColor={"bg-yellow-dash"}
              textDash={"bg-custom-red"}
              textColor={"#FF0000"}
              arrowImg={IMAGES.downarrow}
              outerclasses={`!w-[400px]`}
            />
          </>
        )}
      </div>
      <div className="flex mt-3 gap-2 w-full   ">
        <div>
          <StaticCard
            listing={dashStats?.listingStats?.total_listings_for_last_month}
            Products={dashStats?.productStats?.total_products_sold_last_month}
          />
          {!orderLoading && <PlatformEarning data={orderData.orders} />}
        </div>

        <div className="overflow-hidden">
          {!loading && newData && <RevenueChart statData={newData} />}
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
              page={bestProductParams?.page}
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
              page={productsParam?.page}
            />
          )}
        </div>
      </div>
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
