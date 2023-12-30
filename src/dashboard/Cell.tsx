import React, {useCallback, useEffect, useRef, useState} from 'react';
import ApexCharts from 'apexcharts';
import type {Cell as CellType} from '../types/cell';
import {getClimateDataByCategory} from '../api/climate';

type Props = {
  cell: CellType;
};

export const Cell = ({cell}: Props) => {
  const chartRef = useRef(null);

  const [cellData, setCellData] = useState({
    data: [] as string[],
    dates: [] as string[],
  });

  const getCellData = useCallback(() => {
    const response = getClimateDataByCategory(cell.category);
    setCellData(response);
  }, [cell]);

  useEffect(() => {
    getCellData();
  }, [cell.id]);

  useEffect(() => {
    const options = {
      theme: {
        mode: 'dark',
      },
      title: {
        text: cell.name,
        margin: 10,
        style: {
          fontSize: '20px',
        },
      },
      chart: {
        type: 'line',
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
        toolbar: {
          autoSelected: 'zoom',
        },
        height: 350,
        fill: {
          type: 'gradient',
          gradient: {
            shadeIntensity: 1,
            inverseColors: false,
            opacityFrom: 0.5,
            opacityTo: 0,
            stops: [0, 90, 100],
          },
        },
        yaxis: {
          labels: {
            show: true,
          },
          title: {
            text: cell.category,
          },
        },
        xaxis: {
          type: 'datetime',
        },
        tooltip: {
          shared: false,
        },
      },
      series: [
        {
          name: cell.name,
          data: cellData.data,
        },
      ],
      xaxis: {
        categories: cellData.dates,
      },
    };
    const chart = new ApexCharts(chartRef.current, options);

    if (chart && cellData.dates.length) {
      chart.render();
    }
  }, [cellData, cell.name]);

  return <div ref={chartRef} />;
};
