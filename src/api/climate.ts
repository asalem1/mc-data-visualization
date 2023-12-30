import {categories, Category} from '../types/category';
import {data} from '../db/data';

export const getClimateCategories = () => {
  return categories;
};

export const getClimateDataByCategory = (category: Category) => {
  console.log({category});
  if (!category) {
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
    if (headers[i] === category) {
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
    dates: [] as string[],
    data: [] as string[],
  };

  for (let i = 0; i < rows.length; i++) {
    const values = rows[i].split(',');
    result.dates.push(values[dateIndex]);
    result.data.push(Number(values[categoryIndex]).toFixed(2));
  }

  return result;
};
