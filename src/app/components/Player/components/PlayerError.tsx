import React from 'react';
import { AlertCircle, X } from 'lucide-react';

interface PlayerErrorProps {
  error: string;
  onClear: () => void;
}

export const PlayerError: React.FC<PlayerErrorProps> = ({ error, onClear }) => (
  <div className="bg-red-50 border-b border-red-200 px-4 py-2">
    <div className="flex items-center justify-between">
      <div className="flex items-center text-red-800">
        <AlertCircle className="w-4 h-4 mr-2" />
        <span className="text-sm">{error}</span>
      </div>
      <button onClick={onClear} className="text-red-600 hover:text-red-800">
        <X className="w-4 h-4" />
      </button>
    </div>
  </div>
);
