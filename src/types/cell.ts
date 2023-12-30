import {Category} from './category';
import {ChartType} from './chart';

export interface Cell {
  chartType: ChartType;
  category: Category;
  id: string;
  name: string;
}
