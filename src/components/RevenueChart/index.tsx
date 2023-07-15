import React, { useEffect } from "react";
import Chart from "react-apexcharts";
import "./index.css";
import IMAGES from "../../assets/Images";
type PropType = {
  statData: any;
};
export const RevenueChart = (props: PropType) => {
 
  let series2 = Array.isArray(props.statData) ? [...props.statData] : [];
  const monthOrder:any = {
    Jan: 0,
    Feb: 1,
    Mar: 2,
    Apr: 3,
    May: 4,
    Jun: 5,
    Jul: 6,
    Aug: 7,
    Sep: 8,
    Oct: 9,
    Nov: 10,
    Dec: 11,
  };

  const sortedData = series2.sort((a: { x: string }, b: { x: string }) => {
    return monthOrder[a.x] - monthOrder[b.x];
  });
  // Remove duplicate objects with the same month
  const uniqueData = sortedData.reduce((acc, curr) => {
    const found = acc.find((item: any) => item.x === curr.x);
    if (!found) {
      acc.push(curr);
    }
    return acc;
  }, []);

  let series = [
    {
      name: "Series 1",
      data: uniqueData,
    },
  ];

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
            series={series}
            type="area"
            height={350}
            style={{ width: "74rem", marginLeft: "14px" }}
          />
        </div>
      </div>
    </div>
  );
};
