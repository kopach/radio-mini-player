import React from 'react';
import { usePlayer } from '../../state';
import { PlayerError } from './components/PlayerError';
import { PlayerContent } from './components/PlayerContent';

export const Player: React.FC = () => {
  const {
    error,
    clearError,
    currentStation,
    isPlaying,
    isLoading,
    toggleStationPlayback,
  } = usePlayer();

  if (!currentStation && !error) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 shadow-lg z-50">
      {error && <PlayerError error={error} onClear={clearError} />}

      {currentStation && (
        <PlayerContent
          currentStation={currentStation}
          isCurrentPlaying={isPlaying}
          isCurrentLoading={isLoading}
          togglePlayPause={() => toggleStationPlayback(currentStation)}
        />
      )}
    </div>
  );
};
