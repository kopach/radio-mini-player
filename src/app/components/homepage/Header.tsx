import type React from 'react';
import { Radio } from 'lucide-react';

interface HeaderProps {
  stationsCount?: number;
}

export const Header: React.FC<HeaderProps> = ({ stationsCount }) => {
  return (
    <header className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Radio className="w-8 h-8 text-blue-600" />
            <h1 className="text-3xl font-bold text-gray-900">TuneIn Player</h1>
          </div>
          <div className="text-sm text-gray-500">
            {stationsCount !== undefined &&
              `${stationsCount} stations available`}
          </div>
        </div>
      </div>
    </header>
  );
};
