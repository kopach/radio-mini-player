import type React from 'react';
import { useState, useMemo, useCallback } from 'react';
import { useStations } from '../hooks/useStations';
import { StationModal } from '../components/StationModal';
import { StationsGridSkeleton } from '../components/SkeletonLoader';
import type { Station } from '../../core/models/station';
import {
  ErrorDisplay,
  Header,
  NoResults,
  SearchBar,
  StationsGrid,
} from '../components/homepage';

export const Homepage: React.FC = () => {
  const { stations, isLoading, error, refetch } = useStations();
  const [selectedStation, setSelectedStation] = useState<Station | null>(null);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredStations = useMemo(() => {
    if (!stations) return null;
    return stations.filter(
      (station) =>
        station.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        station.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [stations, searchTerm]);

  const selectStation = useCallback((station: Station) => {
    setSelectedStation(station);
  }, []);

  const closeModal = useCallback(() => {
    setSelectedStation(null);
  }, []);

  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  if (error) {
    return (
      <ErrorDisplay error={error} isLoading={isLoading} onRetry={refetch} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      <Header stationsCount={stations?.length} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <SearchBar searchTerm={searchTerm} onSearchTermChange={setSearchTerm} />

        {isLoading && <StationsGridSkeleton />}

        {!isLoading && filteredStations && filteredStations.length > 0 && (
          <StationsGrid
            stations={filteredStations}
            onStationClick={selectStation}
            searchTerm={searchTerm}
          />
        )}

        {!isLoading &&
          filteredStations &&
          filteredStations.length === 0 &&
          searchTerm && <NoResults onClearSearch={clearSearch} />}
      </main>

      {selectedStation && (
        <StationModal station={selectedStation} onClose={closeModal} />
      )}
    </div>
  );
};
