import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-3 sm:px-4 md:px-6 py-2 bg-black">
      <div className="flex items-center">
        <Image
          src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
          alt="CONNECT Logo"
          width={100}
          height={28}
          className="w-auto h-6 sm:h-7 md:h-8"
          priority
        />
      </div>
      <button className="px-2 sm:px-3 md:px-4 py-1 sm:py-2 bg-green-300 text-gray-900 text-xs sm:text-sm font-medium rounded hover:bg-green-500 transition-colors">
        REQUIRED FEATURE
      </button>
    </header>
  );
};

export default Header;
