import React from 'react';
import { StationCardSkeleton } from './StationCardSkeleton';

export const StationsGridSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {Array.from({ length: 8 }, (_, i) => (
        <StationCardSkeleton key={i} />
      ))}
    </div>
  );
};
