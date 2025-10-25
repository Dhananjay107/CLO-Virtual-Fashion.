import { ContentItem, PricingOption, SortOption, PricingOptionEnum } from '../types';

const API_URL = 'https://closet-recruiting-api.azurewebsites.net/api/data';

export const fetchContentData = async (): Promise<ContentItem[]> => {
  try {
    const response = await fetch(API_URL);
    const data: ContentItem[] = await response.json();
    return data;
  } catch (error) {
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

  if (keyword.trim()) {
    const searchTerm = keyword.toLowerCase();
    filteredItems = filteredItems.filter(item =>
      item.creator.toLowerCase().includes(searchTerm) ||
      item.title.toLowerCase().includes(searchTerm)
    );
  }

  if (pricingOptions.length > 0) {
    filteredItems = filteredItems.filter(item => {
      const itemPricingType = getPricingOptionType(item.pricingOption);
      return pricingOptions.includes(itemPricingType);
    });
  }

  if (pricingOptions.includes('paid')) {
    filteredItems = filteredItems.filter(item => {
      if (item.pricingOption === PricingOptionEnum.PAID) {
        return item.price >= priceRange.min;
      }
      return true;
    });
  }

  const sortedItems = [...filteredItems].sort((a, b) => {
    switch (sortBy) {
      case 'relevance':
        return 0;
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
    case PricingOptionEnum.PAID:
      return `$${price.toFixed(2)}`;
    case PricingOptionEnum.FREE:
      return 'FREE';
    case PricingOptionEnum.VIEW_ONLY:
      return 'View Only';
    default:
      return 'Unknown';
  }
};

export const getPricingOptionType = (pricingOption: number): PricingOption => {
  switch (pricingOption) {
    case PricingOptionEnum.PAID:
      return 'paid';
    case PricingOptionEnum.FREE:
      return 'free';
    case PricingOptionEnum.VIEW_ONLY:
      return 'viewOnly';
    default:
      return 'viewOnly';
  }
};
