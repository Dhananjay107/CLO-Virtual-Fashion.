import { ContentItem, PricingOption, SortOption } from '../types';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export const fetchContentData = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(API_URL);
    const data: ContentItem[] = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching data:', error);
    return [];
  }
};

export const filterAndSortContent = (
  items: ContentItem[],
  keyword: string,
  pricingOptions: PricingOption[],
  priceRange: { min: number; max: number },
  sortBy: SortOption
): ContentItem[] => {
  let filteredItems = items;

  // Filter by keyword
  if (keyword.trim()) {
    const searchTerm = keyword.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.creator.toLowerCase().includes(searchTerm) ||
      item.title.toLowerCase().includes(searchTerm)
    );
  }

  // Filter by pricing options
  if (pricingOptions.length > 0) {
    filteredItems = filteredItems.filter(item => {
      const itemPricingType = getPricingOptionType(item.pricingOption);
      return pricingOptions.includes(itemPricingType);
    });
  }

  // Filter by price (only for paid items and only when paid is selected)
  if (pricingOptions.includes('paid')) {
    filteredItems = filteredItems.filter(item => {
      if (item.pricingOption === 0) { // Paid items
        // Show items from the selected price and higher
        return item.price >= priceRange.min;
      }
      return true; // Non-paid items are not affected by price filter
    });
  }

  // Sort items
  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'name':
        return a.title.localeCompare(b.title);
      case 'price-high':
        return b.price - a.price;
      case 'price-low':
        return a.price - b.price;
      default:
        return 0;
    }
  });

  return sortedItems;
};

export const getPricingOptionLabel = (pricingOption: number, price: number): string => {
  switch (pricingOption) {
    case 0:
      return `$${price.toFixed(2)}`;
    case 1:
      return 'FREE';
    case 2:
      return 'View Only';
    default:
      return 'Unknown';
  }
};

export const getPricingOptionType = (pricingOption: number): 'paid' | 'free' | 'viewOnly' => {
  switch (pricingOption) {
    case 0:
      return 'paid';
    case 1:
      return 'free';
    case 2:
      return 'viewOnly';
    default:
      return 'viewOnly';
  }
};
