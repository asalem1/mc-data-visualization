import {Category} from '../types/category';

export function formatCategory(category: Category) {
  if (!category || typeof category !== 'string') {
    return '';
  }
  const words = category.split('_');

  const humanReadableString = words
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');

  return humanReadableString;
}
