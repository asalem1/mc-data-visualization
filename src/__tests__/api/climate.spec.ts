import {getClimateDataByCategory} from '../../api/climate';
import {categories} from '../../types/category';
import {ChartType} from '../../types/chart';

const validCategory = Array.from(categories)[0];
const invalidCategory = 'invalid_category';
const validCell = {
  chartType: ChartType.LINE,
  category: validCategory,
  id: 'vasdkuz1-1;asdf=1',
  name: 'Valid Cell',
};

describe('getClimateDataByCategory', () => {
  it('should return climate data for a valid category', () => {
    const result = getClimateDataByCategory(validCell);

    expect(result).toHaveProperty('data');
    expect(result).toHaveProperty('dates');
    expect(result.data).toHaveLength(1462);
  });

  it('should throw an error for an invalid category', () => {
    const invalidCell = {
      ...validCell,
      category: invalidCategory,
    };
    // @ts-ignore
    expect(() => getClimateDataByCategory(invalidCell)).toThrowError(
      `Please include a valid category of ${categories.join(', ')}`
    );
  });
});
