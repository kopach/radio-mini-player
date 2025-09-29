import React from 'react';
import type { Station } from '../../../../core/models/station';
import { StationCard } from './components/StationCard';

interface StationsGridProps {
  stations: Station[];
  onStationClick: (station: Station) => void;
  searchTerm: string;
}

export const StationsGrid: React.FC<StationsGridProps> = React.memo(
  ({ stations, onStationClick, searchTerm }) => {
    return (
      <>
        {searchTerm && (
          <p className="text-gray-600 mb-4">
            Found {stations.length} stations matching "{searchTerm}"
          </p>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {stations.map((station) => (
            <StationCard
              key={station.id}
              station={station}
              onClick={onStationClick}
            />
          ))}
        </div>
      </>
    );
  }
);
