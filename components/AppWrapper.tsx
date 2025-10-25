import React, { useEffect } from 'react';
import { useRouter } from 'next/router';
import { useAppDispatch } from '../store/hooks';
import { fetchContentData } from '../services/api';
import { setLoading, setAllItems, setError } from '../store/slices/contentSlice';
import { setKeyword, setPricingOptions, setPriceRange, setSortBy } from '../store/slices/filterSlice';
import { PricingOption, SortOption } from '../types';
import { getStringParam } from '../utils/helpers';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import ContentGrid from './ContentGrid';

const AppWrapper: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();

  useEffect(() => {
    if (router.isReady) {
      const { keyword, pricing, minPrice, maxPrice, sort } = router.query;
      
      const keywordValue = getStringParam(keyword);
      if (keywordValue) {
        dispatch(setKeyword(keywordValue));
      }
      
      const pricingValue = getStringParam(pricing);
      if (pricingValue) {
        const pricingArray = pricingValue.split(',').filter(p => 
          ['paid', 'free', 'viewOnly'].includes(p)
        ) as PricingOption[];
        if (pricingArray.length > 0) {
          dispatch(setPricingOptions(pricingArray));
        }
      }
      
      const minPriceValue = getStringParam(minPrice);
      const maxPriceValue = getStringParam(maxPrice);
      if (minPriceValue || maxPriceValue) {
        const min = minPriceValue ? parseInt(minPriceValue, 10) : 0;
        const max = maxPriceValue ? parseInt(maxPriceValue, 10) : 999;
        
        if (!isNaN(min) && !isNaN(max) && min >= 0 && max <= 999 && min <= max) {
          dispatch(setPriceRange({ min, max }));
        }
      }
      
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