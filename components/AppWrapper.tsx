import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../store/hooks';
import { fetchContentData } from '../services/api';
import { setLoading, setAllItems, setError } from '../store/slices/contentSlice';
import { setKeyword, setPricingOptions, setPriceRange, setSortBy } from '../store/slices/filterSlice';
import { PricingOption, SortOption } from '../types';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import ContentGrid from './ContentGrid';

const AppWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  // Initialize filters from URL on mount
  useEffect(() => {
    if (router.isReady) {
      const { keyword, pricing, minPrice, maxPrice, sort } = router.query;
      
      // Helper to get single string value from query param
      const getStringParam = (param: string | string[] | undefined): string | undefined => {
        if (typeof param === 'string') return param;
        if (Array.isArray(param) && param.length > 0) return param[0];
        return undefined;
      };
      
      // Set keyword from URL
      const keywordValue = getStringParam(keyword);
      if (keywordValue) {
        dispatch(setKeyword(keywordValue));
      }
      
      // Set pricing options from URL
      const pricingValue = getStringParam(pricing);
      if (pricingValue) {
        const pricingArray = pricingValue.split(',').filter(p => 
          ['paid', 'free', 'viewOnly'].includes(p)
        ) as PricingOption[];
        if (pricingArray.length > 0) {
          dispatch(setPricingOptions(pricingArray));
        }
      }
      
      // Set price range from URL
      const minPriceValue = getStringParam(minPrice);
      const maxPriceValue = getStringParam(maxPrice);
      if (minPriceValue || maxPriceValue) {
        const min = minPriceValue ? parseInt(minPriceValue, 10) : 0;
        const max = maxPriceValue ? parseInt(maxPriceValue, 10) : 999;
        
        // Validate range
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max <= 999 && min <= max) {
          dispatch(setPriceRange({ min, max }));
        }
      }
      
      // Set sort from URL
      const sortValue = getStringParam(sort);
      if (sortValue && ['name', 'price-high', 'price-low'].includes(sortValue)) {
        dispatch(setSortBy(sortValue as SortOption));
      }
    }
  }, [router.isReady, router.query, dispatch]);

  useEffect(() => {
    const loadData = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchContentData();
        // setAllItems will automatically load the first batch
        dispatch(setAllItems(data));
      } catch (error) {
        dispatch(setError('Failed to load content'));
      } finally {
        dispatch(setLoading(false));
      }
    };

    loadData();
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <SearchAndFilter />
      <ContentGrid />
    </div>
  );
};

export default AppWrapper;