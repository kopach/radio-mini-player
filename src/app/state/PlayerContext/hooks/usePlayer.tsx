import { useContext } from 'react';
import { PlayerContextType, PlayerContext } from '../PlayerContext';


export const usePlayer = (): PlayerContextType => {
  const context = useContext(PlayerContext);
  if (!context) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
