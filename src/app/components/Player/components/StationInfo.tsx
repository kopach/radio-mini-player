import React from 'react';
import { Station } from '../../../../core/models/station';
import { truncateText, formatReliability } from '../../../../core/utils/format';
import { PopularityStars } from '../../PopularityStars';

interface StationInfoProps {
  currentStation: Station;
}

export const StationInfo: React.FC<StationInfoProps> = ({ currentStation }) => {
  return (
    <>
      <div className="w-12 h-12 flex-shrink-0">
        <img
          src={currentStation.imgUrl}
          alt={currentStation.name}
          className="w-full h-full object-cover rounded"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
            const fallback = target.nextElementSibling as HTMLElement;
            if (fallback) fallback.style.display = 'flex';
          }}
        />
        <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500 rounded items-center justify-center text-white font-semibold hidden">
          {currentStation.name.charAt(0).toUpperCase()}
        </div>
      </div>

      <div className="flex-1 min-w-0">
        <h4 className="font-semibold text-gray-900 truncate">
          {currentStation.name}
        </h4>
        <p className="text-sm text-gray-600 truncate">
          {truncateText(currentStation.description, 60)}
        </p>
        <div className="flex items-center space-x-4 text-xs text-gray-500 mt-1">
          <span>
            Reliability: {formatReliability(currentStation.reliability)}
          </span>
          <div className="h-4 flex items-center">
            {currentStation.popularity !== undefined ? (
              <PopularityStars
                popularity={currentStation.popularity}
                size={3}
              />
            ) : null}
          </div>
        </div>
      </div>
    </>
  );
};
