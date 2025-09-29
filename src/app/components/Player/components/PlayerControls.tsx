import React from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';

interface PlayerControlsProps {
  isCurrentPlaying: boolean;
  isCurrentLoading: boolean;
  togglePlayPause: () => void;
}

export const PlayerControls: React.FC<PlayerControlsProps> = ({
  isCurrentPlaying,
  isCurrentLoading,
  togglePlayPause,
}) => {
  return (
    <div className="flex items-center space-x-2 flex-shrink-0">
      <button
        onClick={togglePlayPause}
        disabled={isCurrentLoading}
        className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white p-2 rounded-full transition-colors"
      >
        {isCurrentLoading ? (
          <Loader2 className="w-5 h-5 animate-spin" />
        ) : isCurrentPlaying ? (
          <Pause className="w-5 h-5" />
        ) : (
          <Play className="w-5 h-5 ml-0.5" />
        )}
      </button>
    </div>
  );
};
