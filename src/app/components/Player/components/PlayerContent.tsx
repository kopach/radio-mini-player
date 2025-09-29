import React from 'react';
import { NowPlayingAnimation } from './NowPlayingAnimation';
import { Station } from '../../../../core/models/station';
import { PlayerControls } from './PlayerControls';
import { StationInfo } from './StationInfo';

interface PlayerContentProps {
  currentStation: Station;
  isCurrentPlaying: boolean;
  isCurrentLoading: boolean;
  togglePlayPause: () => void;
}

export const PlayerContent: React.FC<PlayerContentProps> = ({
  currentStation,
  isCurrentPlaying,
  isCurrentLoading,
  togglePlayPause,
}) => {
  return (
    <div className="p-4">
      <div className="flex items-center space-x-4">
        <StationInfo currentStation={currentStation} />
        <PlayerControls
          isCurrentPlaying={isCurrentPlaying}
          isCurrentLoading={isCurrentLoading}
          togglePlayPause={togglePlayPause}
        />
      </div>
      <div className="mt-2 flex items-center text-green-600 h-3">
        {isCurrentPlaying && <NowPlayingAnimation />}
      </div>
    </div>
  );
};
