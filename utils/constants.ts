import { PricingOption, SortOption } from '../types';

export const PRICING_OPTIONS: Array<{ key: PricingOption; label: string }> = [
  { key: 'paid', label: 'Paid' },
  { key: 'free', label: 'Free' },
  { key: 'viewOnly', label: 'View Only' }
];

export const SORT_OPTIONS: Array<{ value: SortOption; label: string }> = [
  { value: 'relevance', label: 'Relevance' },
  { value: 'name', label: 'Item Name' },
  { value: 'price-high', label: 'Higher Price' },
  { value: 'price-low', label: 'Lower Price' }
];

export const GRID_COLUMN_CLASSES = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];

export const PRICE_RANGE = {
  MIN: 0,
  MAX: 999
};

export const SCROLL_THRESHOLD = 500;
export const LOADING_DELAY = 300;
