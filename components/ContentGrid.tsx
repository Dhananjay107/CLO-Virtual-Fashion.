import React, { useEffect, useState, useCallback, useRef } from 'react';
import { ContentItem, SortOption } from '../types';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setSortBy } from '../store/slices/filterSlice';
import { loadMoreItems, setFilteredItems } from '../store/slices/contentSlice';
import { filterAndSortContent } from '../services/api';
import { getGridColumns } from '../utils/filterUtils';
import ContentCard from './ContentCard';
import SkeletonCard from './SkeletonCard';

const ContentGrid: React.FC = () => {
  const dispatch = useAppDispatch();
  
  // Redux State
  const items = useAppSelector((state) => state.content.items);
  const allItems = useAppSelector((state) => state.content.allItems);
  const loading = useAppSelector((state) => state.content.loading);
  const hasMore = useAppSelector((state) => state.content.hasMore);
  const keyword = useAppSelector((state) => state.filter.keyword);
  const pricingOptions = useAppSelector((state) => state.filter.pricingOptions);
  const priceRange = useAppSelector((state) => state.filter.priceRange);
  const sortBy = useAppSelector((state) => state.filter.sortBy);

  // Local State
  const [gridColumns, setGridColumns] = useState(4);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const loadingRef = useRef(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (isDropdownOpen && !(event.target as Element).closest('.dropdown-container')) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  const sortOptions = [
    { value: 'name' as SortOption, label: 'Item Name' },
    { value: 'price-high' as SortOption, label: 'Higher Price' },
    { value: 'price-low' as SortOption, label: 'Lower Price' },
  ];

  const getCurrentSortLabel = () => {
    return sortOptions.find(option => option.value === sortBy)?.label || 'Item Name';
  };

  const handleSortSelect = (sortOption: SortOption) => {
    dispatch(setSortBy(sortOption));
    setIsDropdownOpen(false);
  };

  // Handle window resize for responsive grid
  useEffect(() => {
    const handleResize = () => setGridColumns(getGridColumns(window.innerWidth));
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Apply filters to ALL items whenever filters change
  useEffect(() => {
    if (allItems.length > 0) {
      const filtered = filterAndSortContent(allItems, keyword, pricingOptions, priceRange, sortBy);
      dispatch(setFilteredItems(filtered));
    }
  }, [allItems, keyword, pricingOptions, priceRange, sortBy, dispatch]);

  // Infinite Scroll Handler
  const handleScroll = useCallback(() => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = window.innerHeight;
    const scrollThreshold = 500;
    
    const isNearBottom = scrollTop + clientHeight >= scrollHeight - scrollThreshold;
    const canLoadMore = hasMore && !loading && !loadingRef.current;
    
    if (isNearBottom && canLoadMore) {
      loadingRef.current = true;
      setIsLoadingMore(true);
      
      setTimeout(() => {
        dispatch(loadMoreItems());
        setIsLoadingMore(false);
        loadingRef.current = false;
      }, 300);
    }
  }, [hasMore, loading, dispatch]);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [handleScroll]);

  // Generate responsive grid classes
  const getGridClass = () => {
    const columnClasses = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];
    const columnClass = columnClasses[Math.min(gridColumns - 1, 3)];
    return `grid gap-6 ${columnClass}`;
  };

  return (
    <div className="px-6 py-0 bg-gray-900">
      {/* Header Section */}
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-green-400 text-sm font-medium">Contents List</h3>
        
        <div className="flex items-center space-x-4">
          {/* Item Count */}
          <div className="text-white text-sm">
            {allItems.length} items
          </div>
          
          {/* Sort Dropdown */}
          <div className="relative inline-block dropdown-container">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg border border-gray-700 hover:bg-gray-750 focus:outline-none focus:border-green-400 flex items-center space-x-2"
            >
              <span>{getCurrentSortLabel()}</span>
              <svg 
                className={`w-4 h-4 text-green-400 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {isDropdownOpen && (
              <div className="absolute top-full right-0 mt-1 w-48 bg-gray-800 border border-gray-700 rounded-lg shadow-lg z-10">
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
                        isActive ? 'bg-green-400 text-black' : 'text-white'
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

      {/* Content Grid Section */}
      <div className="border-2 border-green-400 rounded-lg p-6">
        <div className={getGridClass()}>
          {/* Content Items */}
          {items.map((item: ContentItem, index: number) => (
            <ContentCard 
              key={item.id} 
              item={item} 
              priority={index < 4}
            />
          ))}
          
          {/* Initial Loading Skeleton */}
          {loading && Array.from({ length: gridColumns }).map((_, index) => (
            <SkeletonCard key={`skeleton-${index}`} />
          ))}
          
          {/* Load More Skeleton */}
          {isLoadingMore && Array.from({ length: gridColumns }).map((_, index) => (
            <SkeletonCard key={`skeleton-more-${index}`} />
          ))}
        </div>
        
        {/* End of List Message */}
        {!hasMore && items.length > 0 && !loading && (
          <div className="text-center text-gray-400 text-sm mt-6">
            No more items to load
          </div>
        )}
        
        {/* No Results Message */}
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
