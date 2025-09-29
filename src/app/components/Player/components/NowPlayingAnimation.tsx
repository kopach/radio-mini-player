import React from 'react';

export const NowPlayingAnimation: React.FC = () => (
  <div className="flex items-center text-green-600 h-3">
    <div className="flex space-x-1 mr-2 mb-1 items-end h-4">
      <div className="w-1 h-4 bg-green-600 animate-bar-pulse-delay-0 origin-bottom"></div>
      <div className="w-1 h-4 bg-green-600 animate-bar-pulse-delay-3 origin-bottom"></div>
      <div className="w-1 h-4 bg-green-600 animate-bar-pulse-delay-1 origin-bottom"></div>
      <div className="w-1 h-4 bg-green-600 animate-bar-pulse-delay-4 origin-bottom"></div>
    </div>
    <span className="text-sm font-medium">Now Playing</span>
  </div>
);
