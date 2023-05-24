import { DashCard ,StaticCard,PlatformEarning,RevenueChart} from "../../components";
import IMAGES from "../../assets/Images";
export const Dashboard = () => {
  return (
    <div className="ml-5 ">
      <div className="flex justify-start gap-2">
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
      <div className="flex mt-3 ">
        <div>
        <StaticCard />
        <PlatformEarning />
        </div>
        {/* Graph section will be here */}
        <div>
<RevenueChart />
        </div>
      </div>
    </div>
  );
};
