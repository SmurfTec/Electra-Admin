import { OrderStatus } from "../index";
import { ViewAll } from "../../atoms";
import moment from "moment";
export const PlatformEarning = (props: any) => {
  return (
    <div className="bg-[#FCFCFC] mt-2 rounded px-4 pt-4 h-90">
      <div className="flex justify-between">
        <p className="font-bold text-[16px]">Platform Earning</p>
        <div className="flex gap-2">
          <ViewAll route={"/Orders"} />
        </div>
      </div>
      {props.data?.slice(0, 8)?.map((item: any, index: any) => {
        console.log(moment(item.updated_on).format("hh:mm A - dddd"), "ITEM");
        return <OrderStatus
        id={item.id}
        status={item.status}
        name={item.product.title}  time={moment(item.updated_on).format("hh:mm A - dddd")}  />;
      })}
    </div>
  );
};
