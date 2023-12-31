import {Cell} from '../types/cell';
import {ChartType} from '../types/chart';

export function getOptionsByChartType(
  cell: Cell,
  data: number[],
  dates: string[]
) {
  const commonAttributes = {
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
  };
  if (cell.chartType === ChartType.LINE) {
    return Object.assign(commonAttributes, {
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
          data: data,
        },
      ],
      xaxis: {
        categories: dates,
      },
    });
  }
  if (cell.chartType === ChartType.BAR) {
    return Object.assign(commonAttributes, {
      chart: {
        type: 'bar',
        height: 350,
        grid: {
          padding: {
            left: 30,
            right: 30,
          },
        },
        zoom: {
          type: 'x',
          enabled: true,
          autoScaleYaxis: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      xaxis: {
        tickPlacement: 'on',
        categories: dates,
      },
      plotOptions: {
        bar: {
          horizontal: false,
        },
      },
      series: [
        {
          data,
        },
      ],
    });
  }
}
