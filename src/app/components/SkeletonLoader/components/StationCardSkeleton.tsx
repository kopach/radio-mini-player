import React from 'react';

export const StationCardSkeleton: React.FC = () => {
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
      <div className="aspect-square bg-gray-200"></div>
      <div className="p-4 space-y-4">
        <div className="h-5 bg-gray-200 rounded mb-2"></div>
        <div className="h-4 bg-gray-200 rounded mb-3 w-3/4"></div>
        <div className="flex justify-between items-center mb-3">
          <div className="h-3 bg-gray-200 rounded w-20"></div>
          <div className="h-3 bg-gray-200 rounded w-16"></div>
        </div>
        <div className="flex space-x-1">
          <div className="h-5 bg-gray-200 rounded w-12"></div>
          <div className="h-5 bg-gray-200 rounded w-16"></div>
          <div className="h-5 bg-gray-200 rounded w-10"></div>
        </div>
      </div>
    </div>
  );
};
