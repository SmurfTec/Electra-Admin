import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import "./index.css";
import IMAGES from "../../assets/Images";
type PropType = {
  statData: any;
};
export const RevenueChart = (props: PropType) => {
  console.log(props.statData)
  const [series, setSeries] = React.useState({
    name: "Series 1",
    data: [],
  });
  useEffect(() => {
    setSeries({
      name: "Series 1",
      data: props.statData,
    });
  }, [props.statData]);

  const options: any = {
    chart: {
      toolbar: {
        show: false,
      },
    },

    stroke: {
      show: true,
      colors: ["#000000"],
    },
    markers: {
      colors: ["#212121"],
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    yaxis: {
      labels: {
        formatter: function (value: any) {
          return `$${value}k`;
        },
      },
    },

    fill: {
      type: "gradient",
      gradient: {
        shadeIntensity: 0.2,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
      colors: ["#000000"],
    },
  };

  return (
    <div className=" h-[427px]   bg-[#FCFCFC] rounded  w-[100%] ">
      <div className="">
        <div className="flex justify-between px-2">
          <p className="font-semibold pt-3 pl-3 overflow-hidden ">Revenue</p>
          <div
            className={`px-[14px] py-[4px]
          text-center
          mt-4
          h-[33px]
            text-[black]
        w-[100px]
         border-2
            flex justify-center gap-1 items-center rounded-[25px] text-[12px] overflow-hidden`}
          >
            <p className="font-bold ">6 months</p>
            <img src={IMAGES.dropdown} />
          </div>
        </div>
        <div className="overflow-x-auto">
          <Chart
            options={options}
            series={[series]}
            type="area"
            height={350}
            style={{ width: "74rem", marginLeft: "14px" }}
          />
        </div>
      </div>
    </div>
  );
};

// [
//   {
//     x: "Jan",
//     y: 0,
//   },
//   {
//     x: "Feb",
//     y: 10,
//   },
//   {
//     x: "Mar",
//     y: 20,
//   },
//   {
//     x: "Apr",
//     y: 50,
//   },
//   {
//     x: "May",
//     y: 80,
//   },
//   {
//     x: "Jun",
//     y: 100,
//   },
//   {
//     x: "July",
//     y: 70,
//   },
//   {
//     x: "Aug",
//     y: 95,
//   },
//   {
//     x: "Sep",
//     y: 45,
//   },
//   {
//     x: "Oct",
//     y: 20,
//   },
//   {
//     x: "Nov",
//     y: 90,
//   },
//   {
//     x: "Dec",
//     y: 100,
//   },
//   {
//     x:"jan",
//     y:80
//   }
// ],
