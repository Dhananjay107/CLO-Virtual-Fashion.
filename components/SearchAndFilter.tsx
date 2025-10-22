import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { PricingOption } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  setKeyword, 
  togglePricingOption, 
  setPriceRange, 
  resetFilters 
} from '../store/slices/filterSlice';

const SearchAndFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  // Use separate selectors to avoid creating new object references
  const keyword = useAppSelector((state) => state.filter.keyword);
  const pricingOptions = useAppSelector((state) => state.filter.pricingOptions);
  const priceRange = useAppSelector((state) => state.filter.priceRange);
  const isPriceSliderActive = useAppSelector((state) => state.filter.isPriceSliderActive);
  const sortBy = useAppSelector((state) => state.filter.sortBy);

  const [isPriceDropdownOpen, setIsPriceDropdownOpen] = useState(false);

  // Sync filters to URL whenever they change
  useEffect(() => {
    if (router.isReady) {
      const query: Record<string, string> = {};
      
      // Only add non-default values to URL
      if (keyword.trim()) {
        query.keyword = keyword.trim();
      }
      if (pricingOptions.length > 0) {
        query.pricing = pricingOptions.join(',');
      }
      if (priceRange.min !== 0) {
        query.minPrice = priceRange.min.toString();
      }
      if (priceRange.max !== 999) {
        query.maxPrice = priceRange.max.toString();
      }
      if (sortBy !== 'name') {
        query.sort = sortBy;
      }
      
      // Only update URL if query has changed
      const currentQuery = new URLSearchParams(window.location.search);
      const newQuery = new URLSearchParams(query);
      
      if (currentQuery.toString() !== newQuery.toString()) {
        router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
      }
    }
  }, [keyword, pricingOptions, priceRange, sortBy, router.isReady, router.pathname]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isPriceDropdownOpen && !(event.target as Element).closest('.price-dropdown-container')) {
        setIsPriceDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isPriceDropdownOpen]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handlePricingOptionChange = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
    if (option === 'paid') {
      setIsPriceDropdownOpen(!isPriceDropdownOpen);
    }
  };

  const handleReset = () => {
    dispatch(resetFilters());
  };

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    dispatch(setPriceRange({ ...priceRange, [type]: value }));
  };

  return (
    <div className="px-6 py-6">
      {/* Search Bar */}
      <div className="shadow-lg">
        <div className="relative shadow-lg">
          <input
            type="text"
            placeholder="Find the Items you're lookng for"
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full px-5 py-5 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400"
          />
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
            <svg className="w-5 h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      {/* Contents Filter */}
      <div className="bg-gray-800 rounded-lg  pt-4 pb-0 mb-0">
        <div className="flex items-center">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <h3 className="text-green-400 text-sm font-medium">Contents Filter</h3>
        </div>
        
        {/* Green bordered container */}
        <div className="border border-green-400 rounded-lg p-5 bg-black">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-6">
              <span className="text-white text-sm">Pricing Option</span>
              <div className="flex items-center space-x-4">
                {[
                  { key: 'paid' as PricingOption, label: 'Paid' },
                  { key: 'free' as PricingOption, label: 'Free' },
                  { key: 'viewOnly' as PricingOption, label: 'View Only' }
                ].map(({ key, label }) => (
                  <label key={key} className="flex items-center space-x-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={pricingOptions.includes(key)}
                      onChange={() => handlePricingOptionChange(key)}
                      className="w-4 h-4 bg-gray-800 border-gray-600 rounded focus:ring-green-400 focus:ring-2"
                    />
                    <span className="text-white text-sm">{label}</span>
                  </label>
                ))}
              </div>
            </div>
            <button
              onClick={handleReset}
              className="text-green-400 text-sm font-medium hover:text-green-300 transition-colors"
            >
              RESET
            </button>
          </div>
        </div>

        {/* Price Range Dropdown - Only show when Paid is selected */}
        {isPriceSliderActive && (
          <div className="mt-1 relative price-dropdown-container">
            {isPriceDropdownOpen && (
              <div className="absolute top-full left-22  w-64 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10 p-3">
                <div className="text-center mb-2">
                </div>
                <div className="flex items-center space-x-2">
                  <span className="text-white text-xs">$0</span>
                  <div className="flex-1">
                    <input
                      type="range"
                      min="0"
                      max="999"
                      value={priceRange.min}
                      onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
                      className="w-full h-1 bg-gray-700 rounded-lg appearance-none cursor-pointer"
                    />
                  </div>
                  <span className="text-white text-xs">$999</span>
                </div>
                <div className="text-center mt-1">
                  <span className="text-green-400 text-xs">Minimum Price: ${priceRange.min}</span>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchAndFilter;