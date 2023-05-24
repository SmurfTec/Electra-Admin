import React from "react";
import Chart from "react-apexcharts";
export const RevenueChart = () => {
  const options:any = {
    chart: {
      toolbar: {
        show: false,
      },
    },
    stroke: {
        show: true,
        colors: ['#000000']
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
          stops: [0, 90, 100]
        },
        colors: ['#000000']
      }
      
     
  };

  const series = [
    {
      name: "Series 1",
      data: [
        {
          x: "Jan",
          y: 0,
        },
        {
          x: "Feb",
          y: 10,
        },
        {
          x: "Mar",
          y: 20,
        },
        {
          x: "Apr",
          y: 50,
        },
        {
          x: "May",
          y: 80,
        },
        {
          x: "Jun",
          y: 100,
        },
        {
          x: "July",
          y: 70,
        },
        {
          x: "Aug",
          y: 95,
        },
        {
          x: "Sep",
          y: 45,
        },
        {
          x: "Oct",
          y: 20,
        },
        {
          x: "Nov",
          y: 90,
        },
        {
          x: "Dec",
          y: 100,
        },
      ],
    },
  ];
  return (
    <div className="ml-5 mt-3 bg-[#FCFCFC] rounded">
        <div>
            <div>
                <p className="font-semibold pt-3 pl-3">
                    Revenue
                </p>
            </div>
        <Chart
        options={options}
        series={series}
        type="area"
        height={350}
        width={1000}
      />
        </div>
     
    </div>
  );
};
