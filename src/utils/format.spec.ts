import {formatCategory} from './format';

describe('formatCategory', () => {
  test('converts mean_temp to Mean Temp', () => {
    expect(formatCategory('mean_temp')).toBe('Mean Temp');
  });

  test('converts wind_speed to Wind Speed', () => {
    expect(formatCategory('wind_speed')).toBe('Wind Speed');
  });

  test('converts date to Date', () => {
    // @ts-ignore
    expect(formatCategory('date')).toBe('Date');
  });

  test('handles falsey values', () => {
    // @ts-ignore
    expect(formatCategory()).toBe('');
  });

  test('handles non-string values', () => {
    // @ts-ignore
    expect(formatCategory(true)).toBe('');
  });
});
