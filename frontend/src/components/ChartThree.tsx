import { ApexOptions } from 'apexcharts';
import React, { useState } from 'react';
import ReactApexChart from 'react-apexcharts';
import { ICattlesInfo } from '../pages/Dashboard/ECommerce';

interface ChartThreeState {
  series: number[];
}

const options: ApexOptions = {
  chart: {
    type: 'donut',
  },
  colors: ['#10B981', '#375E83'],
  labels: ['نر', 'ماده'],
  legend: {
    show: true,
    position: 'bottom',
  },

  plotOptions: {
    pie: {
      donut: {
        size: '65%',
        background: 'transparent',
      },
    },
  },
  dataLabels: {
    enabled: false,
  },
  responsive: [
    {
      breakpoint: 2600,
      options: {
        chart: {
          width: 380,
        },
      },
    },
    {
      breakpoint: 640,
      options: {
        chart: {
          width: 200,
        },
      },
    },
  ],
};

interface IChartThree {
  cattlesInfo: ICattlesInfo;
}

const ChartThree: React.FC<IChartThree> = ({ cattlesInfo }) => {
  return (
    <div className="col-span-12 rounded-sm border border-stroke bg-white px-5 pt-7.5 pb-5 shadow-default dark:border-strokedark dark:bg-boxdark sm:px-7.5 xl:col-span-4">
      <div className="mb-3 justify-between gap-4 sm:flex">
        <div>
          <h5 className="text-xl font-semibold text-black dark:text-white">
            آمار دام ها
          </h5>
        </div>
      </div>

      <div className="mb-2">
        <div id="chartThree" className="mx-auto flex justify-center">
          <ReactApexChart
            options={options}
            series={[
              cattlesInfo.total_number_of_bulls,
              cattlesInfo.total_number_of_cows,
            ]}
            type="donut"
          />
        </div>
      </div>

      <div className="-mx-8 flex flex-wrap items-center justify-center gap-y-3">
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-primary"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> نر </span>
              <span>
                {' '}
                {Math.round(
                  (cattlesInfo.total_number_of_bulls /
                    cattlesInfo.total_number_of_cattles) *
                    100,
                )}
                %{' '}
              </span>
            </p>
          </div>
        </div>
        <div className="w-full px-8 sm:w-1/2">
          <div className="flex w-full items-center">
            <span className="mr-2 block h-3 w-full max-w-3 rounded-full bg-[#6577F3]"></span>
            <p className="flex w-full justify-between text-sm font-medium text-black dark:text-white">
              <span> ماده </span>
              <span>
                {' '}
                {Math.round(
                  (cattlesInfo.total_number_of_cows /
                    cattlesInfo.total_number_of_cattles) *
                    100,
                )}
                %{' '}
              </span>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChartThree;
