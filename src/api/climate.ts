import {categories} from '../types/category';
import {data} from '../db/data';
import {Cell} from '../types/cell';
import {ChartType} from '../types/chart';

export const getClimateCategories = () => {
  return categories;
};

export const getClimateDataByCategory = (cell: Cell) => {
  if (!cell.category) {
    throw new Error(
      `Please include a valid category of ${categories.join(', ')}`
    );
  }
  const [headerRow, ...rows] = data.split('\n');
  const headers = headerRow.split(',');

  let dateIndex = -1;
  let categoryIndex = -1;

  for (let i = 0; i < headers.length; i++) {
    if (headers[i] === 'date') {
      dateIndex = i;
    }
    if (headers[i] === cell.category) {
      categoryIndex = i;
    }
  }

  if (dateIndex === -1) {
    throw new Error(
      'There was an error finding the date range for the category'
    );
  }
  if (categoryIndex === -1) {
    throw new Error(
      `Please include a valid category of ${categories.join(', ')}`
    );
  }

  const result = {
    data: [] as any[],
  } as any;

  console.log({chartType: cell.chartType});

  for (let i = 0; i < rows.length; i++) {
    const values = rows[i].split(',');
    const date = values[dateIndex];
    const value = Number(values[categoryIndex]).toFixed(2);
    if (cell.chartType === ChartType.LINE) {
      if (result.dates) {
        result.dates.push(date);
      } else {
        result.dates = [date];
      }
      result.data.push(value);
    }
    if (cell.chartType === ChartType.BAR) {
      result.data.push({
        x: date,
        y: value,
      });
    }
  }

  return result;
};
