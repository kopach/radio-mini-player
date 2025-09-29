import { useState, useEffect, useCallback } from 'react';
import { createWebAudioPlayerService } from '../../../../core/player/audio-player';
import type { Station } from '../../../../core/models/station';

export const usePlayerEngine = () => {
  const [audioService] = useState(() => createWebAudioPlayerService());
  const [currentStation, setCurrentStation] = useState<Station | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const handleStateChange = (playing: boolean) => {
      setIsPlaying(playing);
      setIsLoading(false);
    };

    const handleError = (err: string) => {
      setError(err);
      setIsPlaying(false);
      setIsLoading(false);
    };

    audioService.onStateChange(handleStateChange);
    audioService.onError(handleError);
  }, [audioService]);

  const toggleStationPlayback = useCallback(
    async (station: Station) => {
      const isSameStation = currentStation?.id === station.id;
      if (!isSameStation || !isPlaying) {
        setIsLoading(true);
      }
      setError(null);

      if (!isSameStation) {
        setCurrentStation(station);
      }

      try {
        await audioService.togglePlay(station.streamUrl);
      } catch (err) {
        const errorMessage =
          err instanceof Error ? err.message : 'Failed to play station';
        setError(errorMessage);
        setIsLoading(false);
      }
    },
    [audioService, currentStation, isPlaying]
  );

  const clearError = useCallback(() => {
    setError(null);
  }, []);

  return {
    currentStation,
    isPlaying,
    error,
    isLoading,
    toggleStationPlayback,
    clearError,
  };
};