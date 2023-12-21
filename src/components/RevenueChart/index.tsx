import React, { useEffect } from 'react';
import Chart from 'react-apexcharts';
import IMAGES from '../../assets/Images';
import { CustomDropdown2 } from '../../atoms';
import './index.css';
type PropType = {
  statData: any;
  setData?: any;
  monthsData: any;
  dropdownVal: any;
};
export const RevenueChart = (props: PropType) => {
  const series2 = Array.isArray(props.statData) ? [...props.statData] : [];
  const monthOrder: any = {
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
  const uniqueData = series2.reduce((acc, curr) => {
    const found = acc.find((item: any) => item.x === curr.x);
    if (!found) {
      acc.push(curr);
    }
    return acc;
  }, []);

  const series = [
    {
      name: 'Series 1',
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
      curve: 'smooth',
      colors: ['#000000'],
    },
    markers: {
      colors: ['#212121'],
      shape: 'circle',
      radius: 2,
    },
    dataLabels: {
      enabled: false,
    },
    grid: {
      show: true,
    },
    yaxis: {
      min: Math.min(...series[0].data),
      max: Math.max(40, Math.max(...series[0].data)),
      labels: {
        formatter: function (value: any) {
          return `$${value}k`;
        },
      },
    },

    fill: {
      type: 'gradient',
      gradient: {
        shadeIntensity: 0.2,
        opacityFrom: 0.4,
        opacityTo: 0.1,
        stops: [0, 90, 100],
      },
      colors: ['#000000'],
    },
  };
  console.log('series', series);

  return (
    <div className=" h-[427px]   bg-[#FCFCFC] rounded  w-[100%] ">
      <div className="">
        <div className="flex justify-between px-2">
          <p className="font-semibold pt-3 pl-3 overflow-hidden ">Revenue</p>

          <CustomDropdown2
            setValue={(value: any) => {
              props.setData(value);
            }}
            placeholder="1 Year"
            options={props.monthsData}
            value={props.dropdownVal}
            mainclasses={`
            !px-[14px] !py-[4px]
            !text-center
            !mt-4
            !h-[33px]
            text-[black]
            !w-[180px]
            !border-2
            !border-black
            !bg-white
            !flex !justify-center gap-1 !items-center !rounded-[25px] !text-[12px] overflow-hidden
          `}
          />
        </div>
        <div className="overflow-x-auto">
          <Chart
            options={options}
            series={series}
            type="area"
            height={350}
            style={{ width: '74rem', marginLeft: '14px' }}
          />
        </div>
      </div>
    </div>
  );
};
