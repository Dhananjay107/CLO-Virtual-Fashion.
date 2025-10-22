export interface ContentItem {
  id: string;
  creator: string;
  title: string;
  pricingOption: number; // 0: Paid, 1: Free, 2: View Only
  imagePath: string;
  price: number;
}

export type PricingOption = 'paid' | 'free' | 'viewOnly';

export type SortOption = 'name' | 'price-high' | 'price-low';

export interface FilterState {
  keyword: string;
  pricingOptions: PricingOption[];
  priceRange: { min: number; max: number };
  sortBy: SortOption;
  isPriceSliderActive: boolean;
}
