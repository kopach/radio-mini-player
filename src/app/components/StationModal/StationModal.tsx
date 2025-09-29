import React, { useCallback } from 'react';
import { X, Play, Pause, Loader2 } from 'lucide-react';
import type { Station } from '../../../core/models/station';
import { usePlayer } from '../../state/PlayerContext/hooks/usePlayer';
import { formatReliability } from '../../../core/utils/format';
import { PopularityStars } from '../PopularityStars';

interface StationModalProps {
  station: Station;
  onClose: () => void;
}

export const StationModal: React.FC<StationModalProps> = React.memo(
  ({ station, onClose }) => {
    const { currentStation, isPlaying, isLoading, toggleStationPlayback } =
    usePlayer();

    const isCurrentStation = currentStation?.id === station.id;
    const isCurrentPlaying = isCurrentStation && isPlaying;
    const isCurrentLoading = isCurrentStation && isLoading;

    const handlePlayClick = useCallback(async (): Promise<void> => {
      await toggleStationPlayback(station);
    }, [toggleStationPlayback, station]);

    const handleBackdropClick = useCallback(
      (e: React.MouseEvent): void => {
        if (e.target === e.currentTarget) {
          onClose();
        }
      },
      [onClose]
    );

    return (
      <div
        className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
        onClick={handleBackdropClick}
      >
        <div className="bg-white rounded-lg max-w-lg w-full max-h-[80vh] overflow-y-auto mb-20">
          <div className="flex justify-between items-center p-6 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Station Details
            </h2>
            <button
              onClick={onClose}
              className="text-gray-500 hover:text-gray-700 p-1"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="p-6">
            <div className="relative mb-6">
              <img
                src={station.imgUrl}
                alt={station.name}
                className="w-full aspect-square object-cover rounded-lg"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="w-full aspect-square bg-gradient-to-br from-blue-400 to-purple-500 rounded-lg items-center justify-center text-white text-6xl font-semibold hidden">
                {station.name.charAt(0).toUpperCase()}
              </div>

              <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center group rounded-lg">
                <button
                  onClick={handlePlayClick}
                  disabled={isCurrentLoading}
                  className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 bg-white bg-opacity-90 rounded-full p-4 hover:bg-opacity-100"
                >
                  {isCurrentLoading ? (
                    <Loader2 className="w-8 h-8 text-gray-800 animate-spin" />
                  ) : isCurrentPlaying ? (
                    <Pause className="w-8 h-8 text-gray-800" />
                  ) : (
                    <Play className="w-8 h-8 text-gray-800 ml-1" />
                  )}
                </button>
              </div>

              {isCurrentPlaying && (
                <div className="absolute top-4 right-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                  Playing
                </div>
              )}
            </div>

            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-gray-900">
                {station.name}
              </h3>

              <p className="text-gray-600 leading-relaxed">
                {station.description}
              </p>

              <div className="grid grid-cols-2 gap-4 p-4 bg-gray-50 rounded-lg">
                <div>
                  <span className="text-sm text-gray-500 block">
                    Reliability
                  </span>
                  <span className="text-lg font-semibold text-gray-900">
                    {formatReliability(station.reliability)}
                  </span>
                </div>
                {station.popularity !== undefined && (
                  <div>
                    <span className="text-sm text-gray-500 block">
                      Popularity
                    </span>
                    <span className="text-lg font-semibold text-gray-900">
                      <PopularityStars
                        popularity={station.popularity}
                        size={5}
                      />
                    </span>
                  </div>
                )}
              </div>

              <div>
                <h4 className="text-sm font-medium text-gray-900 mb-2">Tags</h4>
                <div className="flex flex-wrap gap-2">
                  {station.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="inline-block bg-blue-100 text-blue-800 text-sm px-3 py-1 rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="p-6 border-t bg-gray-50 rounded-b-lg">
            <div className="flex space-x-3">
              <button
                onClick={handlePlayClick}
                disabled={isCurrentLoading}
                className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white py-2 px-4 rounded-lg font-medium flex items-center justify-center space-x-2 transition-colors"
              >
                {isCurrentLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Loading...</span>
                  </>
                ) : isCurrentPlaying ? (
                  <>
                    <Pause className="w-4 h-4" />
                    <span>Pause</span>
                  </>
                ) : (
                  <>
                    <Play className="w-4 h-4" />
                    <span>Play Station</span>
                  </>
                )}
              </button>

              <button
                onClick={onClose}
                className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
);
