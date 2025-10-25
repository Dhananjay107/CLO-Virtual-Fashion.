import React, { useState } from 'react';
import Image from 'next/image';
import { ContentItem, PricingOptionEnum } from '../types';
import { getPricingOptionLabel } from '../services/api';

interface ContentCardProps {
  item: ContentItem;
  priority?: boolean;
}

const ContentCard: React.FC<ContentCardProps> = ({ item, priority = false }) => {
  const [isHovered, setIsHovered] = useState(false);
  const pricingLabel = getPricingOptionLabel(item.pricingOption, item.price);
  const isPaid = item.pricingOption === PricingOptionEnum.PAID;

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);
  const handleTouchStart = () => setIsHovered(true);
  const handleTouchEnd = () => setIsHovered(false);

  return (
    <div className="bg-gray-800 rounded-lg overflow-hidden shadow-lg shadow-gray-900/50">
      <div className="p-2 sm:p-3 md:p-4">
        <div 
          className="aspect-[3/4] relative rounded-lg overflow-hidden shadow-xl shadow-gray-900/60"
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
          
          {isHovered && (
            <div className="absolute inset-0 bg-green-400/10 transition-opacity duration-300" />
          )}
        </div>
      </div>
      
      <div className="px-2 sm:px-3 md:px-4 pb-2 sm:pb-3 md:pb-4 bg-gray-800">
        <div className="flex justify-between items-end">
          <div>
            <p className="text-gray-300 text-xs mb-1 leading-tight">
              {item.creator}
            </p>
            <h3 className="text-white text-xs font-medium leading-tight">
              {item.title}
            </h3>
          </div>
          <span className={`text-xs sm:text-sm font-medium ${
            isPaid ? 'text-green-400' : 
            item.pricingOption === PricingOptionEnum.FREE ? 'text-blue-400' : 'text-yellow-400'
          }`}>
            {pricingLabel}
          </span>
        </div>
      </div>
    </div>
  );
};

export default ContentCard;
