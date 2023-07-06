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
export const Dashboard = () => {
  const [visible, setvisible] = useState(false);
  const data = [
    {
      id: "#123",
      name: "John Doe",
      email: "huzayfah@gmail.com",
      Date: "20,aug,2022",
    },
    {
      id: "#123",
      name: "Jane Smith",
      email: "info@gmail.com",
      Date: "20,aug,2022",
    },
    {
      id: "#123",
      name: "Bob Johnson",
      email: "Gfa@gmail.com",
      Date: "20,aug,2022",
    }, 
  ];
  const data2 = [
    {
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "sold" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },
    {
      img: `${IMAGES.Iphone2}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "pending" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },
    {
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "sold" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },
    {
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "sold" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },
    {
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "sold" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },{
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name: { number: "62", status: "sold" },
      email: { number: "62", status: "sold" },
      Date: { number: "$542132", status: "Profit" },
    },
  ];

  return (
    <div>
      <Header
      dropdown={true}
      UserBox={true} typeSearch={true} chooseDate={true} />
      <div className="flex flex-wrap justify-start gap-2">
        <DashCard
        onClick={()=>setvisible(true)}  
          title={"Net Revenue"}
          totalNumber={"$ 450,000"}
          myImg={IMAGES.coin}
          imgColor={"bg-blue-dash"}
          textDash={"bg-custom-blue"}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses={`!w-[400px]`}
        />
        <DashCard
          title={"Products Sold"}
          totalNumber={"3500"}
          myImg={IMAGES.box}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-blue"}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
          outerclasses={`!w-[400px] `}

        />
        <DashCard
          title={"Total Users"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-red"}
          textColor={"#FF0000"}
          arrowImg={IMAGES.downarrow}
          outerclasses={`!w-[400px]`}

        />
        <DashCard
          title={"Total Listings"}
          totalNumber={"350"}
          myImg={IMAGES.box}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-red"}
          textColor={"#FF0000"}
          arrowImg={IMAGES.downarrow}
          outerclasses={`!w-[400px]`}

        />
      </div>
      <div className="flex mt-3 gap-2 w-full   ">
        <div>
          <StaticCard />
          <PlatformEarning />
        </div>

        <div className="overflow-hidden">
          <RevenueChart />
          <DashTable
            customHeader="User Registrations"
            tableHeaderColor="#FCFCFC "
            data={data}
            header={true}
            classess={"!px-[3px] !mt-4 !rounded !overflow-x-auto "}
          />
       
          
        </div>
      </div>
      <div className="flex justify-start gap-10 mb-6 ">
        <div className="w-[50%] ">
          <DashTable
            data={data2}
            tableHeaderColor="#FCFCFC"
            imginData={true}
            selling={true}
            customHeader="Best Selling Product"
            pagination={true}
          />
        </div>
        <div className=" w-[50%]">
          <DashTable
            data={data2}
            tableHeaderColor="#FCFCFC"
            imginData={true}
            selling={true}
            customHeader="Best Selling Product"
            pagination={true}

          />
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
