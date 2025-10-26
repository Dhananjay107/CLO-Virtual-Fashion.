import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ContentItem, SortOption } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy } from '../store/slices/filterSlice';
import { loadMoreItems, setFilteredItems } from '../store/slices/contentSlice';
import { filterAndSortContent } from '../services/api';
import { getGridColumns } from '../utils/filterUtils';
import { SORT_OPTIONS, SCROLL_THRESHOLD, LOADING_DELAY } from '../utils/constants';
import { getCurrentSortLabel, getGridClass, isNearBottom } from '../utils/helpers';
import ContentCard from './ContentCard';
import SkeletonCard from './SkeletonCard';

const ContentGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  
  const items = useAppSelector((state) => state.content.items);
  const allItems = useAppSelector((state) => state.content.allItems);
  const loading = useAppSelector((state) => state.content.loading);
  const hasMore = useAppSelector((state) => state.content.hasMore);
  const keyword = useAppSelector((state) => state.filter.keyword);
  const pricingOptions = useAppSelector((state) => state.filter.pricingOptions);
  const priceRange = useAppSelector((state) => state.filter.priceRange);
  const sortBy = useAppSelector((state) => state.filter.sortBy);

  const [gridColumns, setGridColumns] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loadingRef = useRef(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const sortOptions = SORT_OPTIONS;

  const getCurrentSortLabelValue = () => {
    return getCurrentSortLabel(sortBy, sortOptions);
  };

  const handleSortSelect = (sortOption: SortOption) => {
    dispatch(setSortBy(sortOption));
    setIsDropdownOpen(false);
  };

  useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns(window.innerWidth));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    if (allItems.length > 0) {
      const filtered = filterAndSortContent(allItems, keyword, pricingOptions, priceRange, sortBy);
      dispatch(setFilteredItems(filtered));
    }
  }, [allItems, keyword, pricingOptions, priceRange, sortBy, dispatch]);

  const handleScroll = useCallback(() => {
    const canLoadMore = hasMore && !loading && !loadingRef.current;
    
    if (isNearBottom(SCROLL_THRESHOLD) && canLoadMore) {
      loadingRef.current = true;
      setIsLoadingMore(true);
      
      setTimeout(() => {
        dispatch(loadMoreItems());
        setIsLoadingMore(false);
        loadingRef.current = false;
      }, LOADING_DELAY);
    }
  }, [hasMore, loading, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  return (
    <div className="px-6 py-0 bg-gray-900">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-green-400 text-sm font-medium">Contents List</h3>
        
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="text-gray-300 text-sm">Sort by</span>
            <div className="relative inline-block dropdown-container">
              <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="bg-transparent text-gray-300 px-3 py-1 border-b border-gray-500 hover:text-white focus:outline-none focus:border-gray-400 flex items-center space-x-2 min-w-[120px]"
              >
                <span className="text-left flex-1">{getCurrentSortLabelValue()}</span>
                <svg 
                  className={`w-3 h-3 text-gray-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {isDropdownOpen && (
                <div className="absolute top-full left-0 mt-1 w-full min-w-[120px] bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
                  {sortOptions.map((option, index) => {
                    const isFirst = index === 0;
                    const isLast = index === sortOptions.length - 1;
                    const isActive = sortBy === option.value;
                    
                    return (
                      <button
                        key={option.value}
                        onClick={() => handleSortSelect(option.value)}
                        className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-700 transition-colors ${
                          isFirst ? 'rounded-t-lg' : ''
                        } ${isLast ? 'rounded-b-lg' : ''} ${
                          isActive ? 'bg-green-400 text-white' : 'text-white'
                        }`}
                      >
                        {option.label}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="border-2 border-green-400 rounded-lg p-6">
        <div className={getGridClass(gridColumns)}>
          {items.map((item: ContentItem, index: number) => (
            <ContentCard 
              key={item.id} 
              item={item} 
              priority={index < 4}
            />
          ))}
          
          {loading && Array.from({ length: gridColumns }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
          
          {isLoadingMore && Array.from({ length: gridColumns }).map((_, index) => (
            <SkeletonCard key={`skeleton-more-${index}`} />
          ))}
        </div>
        
        {!hasMore && items.length > 0 && !loading && (
          <div className="text-center text-gray-400 text-sm mt-6">
            No more items to load
          </div>
        )}
        
        {!loading && items.length === 0 && allItems.length > 0 && (
          <div className="text-center text-gray-400 text-sm py-12">
            No items match your filters
          </div>
        )}
      </div>
    </div>
  );
};

export default ContentGrid;
