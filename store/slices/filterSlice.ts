import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PricingOption, SortOption, FilterState } from '../../types';

const initialState: FilterState = {
  keyword: '',
  pricingOptions: [],
  priceRange: { min: 0, max: 999 },
  sortBy: 'relevance',
  isPriceSliderActive: false,
};

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setKeyword: (state, action: PayloadAction<string>) => {
      state.keyword = action.payload;
    },
    setPricingOptions: (state, action: PayloadAction<PricingOption[]>) => {
      state.pricingOptions = action.payload;
      state.isPriceSliderActive = action.payload.includes('paid');
    },
    togglePricingOption: (state, action: PayloadAction<PricingOption>) => {
      const option = action.payload;
      if (state.pricingOptions.includes(option)) {
        state.pricingOptions = state.pricingOptions.filter((opt: PricingOption) => opt !== option);
      } else {
        state.pricingOptions = [...state.pricingOptions, option];
      }
      state.isPriceSliderActive = state.pricingOptions.includes('paid');
    },
    setPriceRange: (state, action: PayloadAction<{ min: number; max: number }>) => {
      state.priceRange = action.payload;
    },
    setSortBy: (state, action: PayloadAction<SortOption>) => {
      state.sortBy = action.payload;
    },
    resetFilters: (state) => {
      state.keyword = '';
      state.pricingOptions = [];
      state.priceRange = { min: 0, max: 999 };
      state.sortBy = 'relevance';
      state.isPriceSliderActive = false;
    },
  },
});

export const {
  setKeyword,
  setPricingOptions,
  togglePricingOption,
  setPriceRange,
  setSortBy,
  resetFilters,
} = filterSlice.actions;

export default filterSlice.reducer;
