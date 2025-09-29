import { useState, useEffect } from 'react';
import { fetchStations as fetchStationsApi } from '../../core/api/stations';
import type { Station } from '../../core/models/station';

interface UseStationsResult {
  stations: Station[] | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export const useStations = (): UseStationsResult => {
  const [stations, setStations] = useState<UseStationsResult['stations']>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStations = async (): Promise<void> => {
    try {
      setIsLoading(true);
      setError(null);
      const data = await fetchStationsApi();
      setStations(data);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Failed to load stations';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStations();
  }, []);

  return {
    stations,
    isLoading,
    error,
    refetch: fetchStations,
  };
};