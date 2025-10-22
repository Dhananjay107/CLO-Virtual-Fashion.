import React from 'react';
import Image from 'next/image';

const Header: React.FC = () => {
  return (
    <header className="flex justify-between items-center px-6 py-2 bg-black">
      <div className="flex items-center">
        <Image
          src="https://storagefiles.clo-set.com/public/connect/common/connect-desktop-header-bi.svg"
          alt="CONNECT Logo"
          width={150}
          height={40}
          priority
        />
      </div>
      <button className="px-4 py-2 bg-green-300 text-gray-900 text-sm font-medium rounded hover:bg-green-500 transition-colors">
        REQUIRED FEATURE
      </button>
    </header>
  );
};

export default Header;
