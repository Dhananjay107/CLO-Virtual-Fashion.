export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number;
  imagePath: string;
  price: number;
}

export type PricingOption = 'paid' | 'free' | 'viewOnly';

export enum PricingOptionEnum {
  PAID = 0,
  FREE = 1,
  VIEW_ONLY = 2,
}

export type SortOption = 'relevance' | 'name' | 'price-high' | 'price-low';

export interface FilterState {
  keyword: string;
  pricingOptions: PricingOption[];
  priceRange: { min: number; max: number };
  sortBy: SortOption;
  isPriceSliderActive: boolean;
}
