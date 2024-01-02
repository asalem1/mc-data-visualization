import {useState, useEffect, useCallback} from 'react';
import {getClimateCategories} from '../api/climate';
import {Category} from '../types/category';

const useClimateCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);

  const getCategories = useCallback(() => {
    const climateCategories = getClimateCategories();
    setCategories(Array.from(climateCategories));
  }, []);

  useEffect(() => {
    getCategories();
  }, [getCategories]);

  return {categories, getCategories};
};

export default useClimateCategories;
