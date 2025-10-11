export type ProductCategory = 'flower' | 'prerolls' | 'edibles' | 'concentrates';

export type SortOption = 'name' | 'price-low' | 'price-high' | 'potency';

export type PotencyFilter = 'all' | 'low' | 'medium' | 'high';

export interface ProductFilters {
  category?: ProductCategory | 'all';
  search?: string;
  minPrice?: number;
  maxPrice?: number;
  minThc?: number;
  maxThc?: number;
  sortBy?: SortOption;
  potency?: PotencyFilter;
}