import {
  DashCard,
  StaticCard,
  PlatformEarning,
  RevenueChart,
  DashTable,
} from "../../components";
import IMAGES from "../../assets/Images";
export const Dashboard = () => {
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
      name:{number :"62",status:"sold"},
      email: {number :"62",status:"sold"},
      Date: {number :"$542132",status:"Profit"},
    },
    {
      img: `${IMAGES.Iphone2}`,
      id: "Iphone Pro Max",
      name:{number :"62",status:"pending"},
      email: {number :"62",status:"sold"},
      Date: {number :"$542132",status:"Profit"},
    },
    {
      img: `${IMAGES.Iphone1}`,
      id: "Iphone Pro Max",
      name:{number :"62",status:"sold"},
      email: {number :"62",status:"sold"},
      Date: {number :"$542132",status:"Profit"},
    },
  ];

  return (
    <div className="ml-5 ">
      <div className="flex flex-wrap justify-start gap-2">
        <DashCard
          title={"Net Revenue"}
          totalNumber={"$ 450,000"}
          myImg={IMAGES.coin}
          imgColor={"bg-blue-dash"}
          textDash={"bg-custom-blue"}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
        />
        <DashCard
          title={"Products Sold"}
          totalNumber={"3500"}
          myImg={IMAGES.box}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-blue"}
          textColor={"#3C82D6"}
          arrowImg={IMAGES.uparrow}
        />
        <DashCard
          title={"Total Users"}
          totalNumber={"3500"}
          myImg={IMAGES.person}
          imgColor={"bg-custom-grey"}
          textDash={"bg-custom-red"}
          textColor={"#b50000"}
          arrowImg={IMAGES.downarrow}
        />
        <DashCard
          title={"Total Listings"}
          totalNumber={"350"}
          myImg={IMAGES.box}
          imgColor={"bg-yellow-dash"}
          textDash={"bg-custom-red"}
          textColor={"#b50000"}
          arrowImg={IMAGES.downarrow}
        />
      </div>
      <div className="flex mt-3 gap-4 ">
        <div>
          <StaticCard />
          <PlatformEarning />
        </div>

        <div className="overflow-hidden">
          <RevenueChart />
          <DashTable
          customHeader="User Registrations"
          tableHeaderColor="#FCFCFC"
          data={data} header={true} />
        </div>
      </div>
      <div className="flex justify-start gap-10 mb-6 ">
        <div className="w-[50%] ">
          <DashTable data={data2}
           tableHeaderColor="#FCFCFC"
          imginData={true} selling={true} customHeader="Best Selling Product"/>
        </div>
        <div className=" w-[50%]">
          <DashTable data={data2}
           tableHeaderColor="#FCFCFC"
            imginData={true} selling={true} customHeader="Best Selling Product"/>
        </div>
      </div>
    </div>
  );
};
