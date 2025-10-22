import React, { useState } from 'react';
import Image from 'next/image';
import { ContentItem } from '../types';
import { getPricingOptionLabel } from '../services/api';

interface ContentCardProps {
  item: ContentItem;
  priority?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pricingLabel = getPricingOptionLabel(item.pricingOption, item.price);
  const isPaid = item.pricingOption === 0;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-gray-900/50">
      {/* Floating Image Container */}
      <div className="p-4">
        <div 
          className="aspect-square relative rounded-lg overflow-hidden shadow-xl shadow-gray-900/60"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            src={item.imagePath}
            alt={item.title}
            fill
            className={`object-cover transition-all duration-300 ${
              isHovered ? 'transform scale-110' : 'transform scale-100'
            }`}
            sizes="(max-width: 480px) 100vw, (max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            priority={priority}
          />
          
          {/* Overlay on Hover */}
          {isHovered && (
            <div className="absolute inset-0 bg-green-400/10 transition-opacity duration-300" />
          )}
        </div>
      </div>
      
      {/* Content Container */}
      <div className="px-4 pb-4 bg-gray-800">
        <h3 className="text-white text-lg font-medium mb-2 leading-[100%]">
          {item.title}
        </h3>
        <p className="text-gray-400 text-sm mb-3 leading-[100%]">
          {item.creator}
        </p>
        <div className="flex justify-end">
          <span className={`text-sm font-medium ${
            isPaid ? 'text-green-400' : 
            item.pricingOption === 1 ? 'text-blue-400' : 'text-yellow-400'
          }`}>
            {pricingLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
