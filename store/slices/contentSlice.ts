import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentItem } from '../../types';
import type { ContentState } from '../types';

const ITEMS_PER_PAGE = 20;

const initialState: ContentState = {
  items: [],
  allItems: [],
  filteredItems: [],
  loading: false,
  hasMore: true,
  page: 1,
  error: null,
  itemsPerPage: ITEMS_PER_PAGE,
};

const contentSlice = createSlice({
  name: 'content',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setAllItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.allItems = action.payload;
      state.filteredItems = action.payload;
      // Load first page
      state.items = action.payload.slice(0, state.itemsPerPage);
      state.page = 1;
      state.hasMore = action.payload.length > state.itemsPerPage;
    },
    setFilteredItems: (state, action: PayloadAction<ContentItem[]>) => {
      state.filteredItems = action.payload;
      // Reset to page 1 with new filtered results
      state.items = action.payload.slice(0, state.itemsPerPage);
      state.page = 1;
      state.hasMore = action.payload.length > state.itemsPerPage;
    },
    loadMoreItems: (state) => {
      const startIndex = state.page * state.itemsPerPage;
      const endIndex = startIndex + state.itemsPerPage;
      // Load from filtered items, not all items
      const newItems = state.filteredItems.slice(startIndex, endIndex);
      
      if (newItems.length > 0) {
        state.items = [...state.items, ...newItems];
        state.page = state.page + 1;
        state.hasMore = endIndex < state.filteredItems.length;
      } else {
        state.hasMore = false;
      }
    },
    setHasMore: (state, action: PayloadAction<boolean>) => {
      state.hasMore = action.payload;
    },
    setPage: (state, action: PayloadAction<number>) => {
      state.page = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
    resetContent: (state) => {
      state.items = [];
      state.allItems = [];
      state.filteredItems = [];
      state.page = 1;
      state.hasMore = true;
      state.error = null;
    },
  },
});

export const {
  setLoading,
  setAllItems,
  setFilteredItems,
  loadMoreItems,
  setHasMore,
  setPage,
  setError,
  resetContent,
} = contentSlice.actions;

export default contentSlice.reducer;
