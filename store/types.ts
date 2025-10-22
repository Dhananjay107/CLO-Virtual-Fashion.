import { ContentItem } from '../types';

export interface ContentState {
  items: ContentItem[]; // Currently displayed items (paginated)
  allItems: ContentItem[]; // All items loaded from API (raw data)
  filteredItems: ContentItem[]; // All filtered/sorted items (before pagination)
  loading: boolean;
  hasMore: boolean;
  page: number;
  error: string | null;
  itemsPerPage: number;
}

