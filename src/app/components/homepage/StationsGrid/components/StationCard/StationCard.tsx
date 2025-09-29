import React, { useCallback } from 'react';
import { Play, Pause, Loader2 } from 'lucide-react';
import type { Station } from '../../../../../../core/models/station';
import { usePlayer } from '../../../../../state';
import {
  truncateText,
  formatReliability,
} from '../../../../../../core/utils/format';
import { useImageLoader } from './hooks/useImageLoader';
import { PopularityStars } from '../../../../PopularityStars';

interface StationCardProps {
  station: Station;
  onClick: (station: Station) => void;
}

export const StationCard: React.FC<StationCardProps> = React.memo(
  ({ station, onClick }) => {
    const { currentStation, isPlaying, isLoading, toggleStationPlayback } =
      usePlayer();
    const { imageError, imageLoading, handleImageLoad, handleImageError } =
      useImageLoader();

    const isCurrentStation = currentStation?.id === station.id;
    const isCurrentPlaying = isCurrentStation && isPlaying;
    const isCurrentLoading = isCurrentStation && isLoading;

    const handlePlayClick = useCallback(
      async (e: React.MouseEvent): Promise<void> => {
        e.stopPropagation();
        await toggleStationPlayback(station);
      },
      [toggleStationPlayback, station]
    );

    return (
      <div
        className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer overflow-hidden"
        onClick={() => onClick(station)}
      >
        <div className="relative aspect-square">
          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse flex items-center justify-center">
              <div className="w-8 h-8 bg-gray-300 rounded"></div>
            </div>
          )}

          {!imageError ? (
            <img
              src={station.imgUrl}
              alt={station.name}
              className={`w-full h-full object-cover ${
                imageLoading ? 'opacity-0' : 'opacity-100'
              } transition-opacity`}
              onLoad={handleImageLoad}
              onError={handleImageError}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
              <span className="text-white font-semibold text-lg">
                {station.name.charAt(0).toUpperCase()}
              </span>
            </div>
          )}

          <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group">
            <button
              onClick={handlePlayClick}
              className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-3 hover:bg-opacity-100"
              disabled={isCurrentLoading}
            >
              {isCurrentLoading ? (
                <Loader2 className="w-6 h-6 text-gray-800 animate-spin" />
              ) : isCurrentPlaying ? (
                <Pause className="w-6 h-6 text-gray-800" />
              ) : (
                <Play className="w-6 h-6 text-gray-800 ml-0.5" />
              )}
            </button>
          </div>

          {isCurrentPlaying && (
            <div className="absolute top-2 right-2 bg-green-500 text-white px-2 py-1 rounded-full text-xs font-medium">
              Playing
            </div>
          )}
        </div>

        <div className="p-4">
          <h3 className="font-semibold text-gray-900 mb-2">
            {truncateText(station.name, 50)}
          </h3>

          <p className="text-gray-600 text-sm mb-3 line-clamp-2">
            {truncateText(station.description, 100)}
          </p>

          <div className="flex items-center justify-between mb-3">
            <span className="text-xs text-gray-500">
              Reliability: {formatReliability(station.reliability)}
            </span>
            {station.popularity !== undefined && (
              <PopularityStars popularity={station.popularity} />
            )}
          </div>

          <div className="flex flex-wrap gap-1">
            {station.tags.slice(0, 3).map((tag, index) => (
              <span
                key={index}
                className="inline-block bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full"
              >
                {tag}
              </span>
            ))}
            {station.tags.length > 3 && (
              <span className="text-xs text-gray-500 mt-1">
                +{station.tags.length - 3} more
              </span>
            )}
          </div>
        </div>
      </div>
    );
  }
);
