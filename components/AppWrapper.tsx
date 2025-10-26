import React from 'react';
import { useUrlSync } from '../hooks/useUrlSync';
import { useContentData } from '../hooks/useContentData';
import Header from './Header';
import SearchAndFilter from './SearchAndFilter';
import ContentGrid from './ContentGrid';

const AppWrapper: React.FC = () => {

  useUrlSync();

  useContentData();

  return (
    <div className="min-h-screen bg-gray-900">
      <Header />
      <SearchAndFilter />
      <ContentGrid />
    </div>
  );
};

export default AppWrapper;