import { ContentItem, PricingOption, SortOption } from '../types';
import { getPricingOptionType } from '../services/api';

export const filterItems = (
  items: ContentItem[],
  pricingOptions: PricingOption[],
  keyword: string,
  priceRange: { min: number; max: number }
): ContentItem[] => {
  return items.filter(item => {
    // Filter by pricing options
    if (pricingOptions.length > 0) {
      const itemPricingType = getPricingOptionType(item.pricingOption);
      if (!pricingOptions.includes(itemPricingType)) {
        return false;
      }
    }

    // Filter by keyword (search in title and creator)
    if (keyword.trim()) {
      const searchTerm = keyword.toLowerCase();
      const matchesTitle = item.title.toLowerCase().includes(searchTerm);
      const matchesCreator = item.creator.toLowerCase().includes(searchTerm);
      if (!matchesTitle && !matchesCreator) {
        return false;
      }
    }

    // Filter by price (only for paid items and only when paid is selected)
    if (pricingOptions.includes('paid') && item.pricingOption === 0) {
      // Show items from the selected price and higher
      if (item.price < priceRange.min) {
        return false;
      }
    }

    return true;
  });
};

export const sortItems = (items: ContentItem[], sortBy: SortOption): ContentItem[] => {
  const sortedItems = [...items];
  
  switch (sortBy) {
    case 'name':
      return sortedItems.sort((a, b) => a.title.localeCompare(b.title));
    case 'price-high':
      return sortedItems.sort((a, b) => b.price - a.price);
    case 'price-low':
      return sortedItems.sort((a, b) => a.price - b.price);
    default:
      return sortedItems;
  }
};

export const getGridColumns = (width: number): number => {
  if (width < 480) return 1;
  if (width < 768) return 2;
  if (width < 1200) return 3;
  return 4;
};