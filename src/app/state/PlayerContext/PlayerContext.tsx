import React, { createContext, ReactNode } from 'react';
import type { Station } from '../../../core/models/station';
import { usePlayerEngine } from './hooks/usePlayerEngine';

export interface PlayerContextType {
  currentStation: Station | null;
  isPlaying: boolean;
  error: string | null;
  isLoading: boolean;
  toggleStationPlayback: (station: Station) => Promise<void>;
  clearError: () => void;
}

export const PlayerContext = createContext<PlayerContextType | null>(null);

interface PlayerProviderProps {
  children: ReactNode;
}

export const PlayerProvider: React.FC<PlayerProviderProps> = ({ children }) => {
  const playerEngine = usePlayerEngine();

  return (
    <PlayerContext.Provider value={playerEngine}>
      {children}
    </PlayerContext.Provider>
  );
};
