import React from 'react';

const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-700"></div>
      <div className="p-4">
        <div className="h-5 bg-gray-700 rounded mb-2"></div>
        <div className="h-4 bg-gray-700 rounded mb-3 w-3/4"></div>
        <div className="flex justify-end">
          <div className="h-4 bg-gray-700 rounded w-16"></div>
        </div>
      </div>
    </div>
  );
};

export default SkeletonCard;
