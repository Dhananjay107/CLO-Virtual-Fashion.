import React, { useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import { PricingOption } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { 
  setKeyword, 
  togglePricingOption, 
  setPriceRange, 
  resetFilters 
} from '../store/slices/filterSlice';
import { PRICING_OPTIONS, PRICE_RANGE } from '../utils/constants';
import { getStringParam } from '../utils/helpers';

const SearchAndFilter: React.FC = () => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  
  const keyword = useAppSelector((state) => state.filter.keyword);
  const pricingOptions = useAppSelector((state) => state.filter.pricingOptions);
  const priceRange = useAppSelector((state) => state.filter.priceRange);
  const isPriceSliderActive = useAppSelector((state) => state.filter.isPriceSliderActive);
  const sortBy = useAppSelector((state) => state.filter.sortBy);

  useEffect(() => {
    if (!router.isReady) return;
    
    const query: Record<string, string> = {};
    
    if (keyword.trim()) {
      query.keyword = keyword.trim();
    }
    if (pricingOptions.length > 0) {
      query.pricing = pricingOptions.join(',');
    }
    if (priceRange.min !== PRICE_RANGE.MIN) {
      query.minPrice = priceRange.min.toString();
    }
    if (priceRange.max !== PRICE_RANGE.MAX) {
      query.maxPrice = priceRange.max.toString();
    }
    if (sortBy !== 'relevance') {
      query.sort = sortBy;
    }
    
    const currentQuery = new URLSearchParams(window.location.search);
    const newQuery = new URLSearchParams(query);
    
    if (currentQuery.toString() !== newQuery.toString()) {
      router.push({ pathname: router.pathname, query }, undefined, { shallow: true });
    }
  }, [keyword, pricingOptions, priceRange, sortBy, router.isReady, router.pathname, router]);

  const handleKeywordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setKeyword(e.target.value));
  };

  const handlePricingOptionChange = (option: PricingOption) => {
    dispatch(togglePricingOption(option));
  };

  const handleReset = useCallback(() => {
    dispatch(resetFilters());
    router.push({ pathname: router.pathname }, undefined, { shallow: true });
  }, [dispatch, router]);

  const handlePriceRangeChange = (type: 'min' | 'max', value: number) => {
    dispatch(setPriceRange({ ...priceRange, [type]: value }));
  };

  return (
    <div className="px-3 sm:px-4 md:px-6 py-4 sm:py-6">
      <div className="shadow-lg">
        <div className="relative shadow-lg">
          <input
            type="text"
            placeholder="Find the Items you're lookng for"
            value={keyword}
            onChange={handleKeywordChange}
            className="w-full px-3 sm:px-4 md:px-5 py-3 sm:py-4 md:py-5 bg-gray-800 text-white placeholder-gray-400 border border-gray-700 rounded-lg focus:outline-none focus:border-green-400 text-sm sm:text-base"
          />
          <div className="absolute right-2 sm:right-3 top-1/2 transform -translate-y-1/2">
            <svg className="cursor-pointer w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-lg pt-3 sm:pt-4 pb-0 mb-0 mt-3 sm:mt-4">
        <div className="flex items-center px-3 sm:px-4">
          <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
          <h3 className="text-green-400 text-sm font-medium">Contents Filter</h3>
        </div>
        
        <div className="border border-green-400 rounded-lg p-3 sm:p-4 md:p-5 bg-black mx-3 sm:mx-4 mb-3 sm:mb-4">
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between space-y-3 lg:space-y-0">
            <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4 lg:space-x-6">
              <span className="text-sm" style={{ color: '#787878' }}>Pricing Option</span>
              <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
                <div className="flex flex-row items-center space-x-4">
                  {PRICING_OPTIONS.map(({ key, label }) => (
                    <label key={key} className="flex items-center space-x-2 cursor-pointer">
                      <div className="relative">
                        <input
                          type="checkbox"
                          checked={pricingOptions.includes(key)}
                          onChange={() => handlePricingOptionChange(key)}
                          className="w-4 h-4 rounded focus:ring-green-400 focus:ring-2 opacity-0 absolute"
                        />
                        <div 
                          className={`w-4 h-4 rounded border-2 flex items-center justify-center cursor-pointer ${
                            pricingOptions.includes(key) 
                              ? 'bg-gray-500 border-gray-500' 
                              : 'bg-transparent border-gray-500'
                          }`}
                        >
                          {pricingOptions.includes(key) && (
                            <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                              <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                            </svg>
                          )}
                        </div>
                      </div>
                      <span className="cursor-pointer text-sm" style={{ color: '#787878' }}>{label}</span>
                    </label>
                  ))}
                </div>
                
                <div className="w-full sm:w-64 pl-1">
                  {isPriceSliderActive ? (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-gray-300 text-xs">$0</span>
                        <span className="text-gray-300 text-xs">$999</span>
                      </div>
                      
                      <div className="relative">
                        <div className="w-full h-1 bg-gray-700 rounded-lg"></div>
                        <input
                          type="range"
                          min={PRICE_RANGE.MIN}
                          max={PRICE_RANGE.MAX}
                          value={priceRange.min}
                          onChange={(e) => handlePriceRangeChange('min', parseInt(e.target.value))}
                          className="absolute top-0 left-0 w-full h-1 bg-transparent appearance-none cursor-pointer slider-thumb"
                          style={{
                            background: `linear-gradient(to right, #10b981 0%, #10b981 ${(priceRange.min / PRICE_RANGE.MAX) * 100}%, #374151 ${(priceRange.min / PRICE_RANGE.MAX) * 100}%, #374151 100%)`
                          }}
                        />
                      </div>
                      
                      <div className="text-center mt-1">
                        <span className="text-green-400 text-xs font-medium">Minimum Price: ${priceRange.min}</span>
                      </div>
                    </>
                  ) : (
                    <>
                      <div className="flex justify-between items-center mb-1">
                        <div className="w-4 h-3"></div>
                        <div className="w-6 h-3"></div>
                      </div>
                      <div className="relative">
                        <div className="w-full h-1 bg-transparent"></div>
                      </div>
                      <div className="text-center mt-1">
                        <div className="w-24 h-3"></div>
                      </div>
                    </>
                  )}
                </div>
              </div>
            </div>
            <button
              onClick={handleReset}
              className="cursor-pointer text-green-400 text-sm font-medium hover:text-green-300 transition-colors self-start lg:self-auto"
            >
              RESET
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchAndFilter;