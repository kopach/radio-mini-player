import type React from 'react';
import { Search } from 'lucide-react';

interface NoResultsProps {
  onClearSearch: () => void;
}

export const NoResults: React.FC<NoResultsProps> = ({ onClearSearch }) => {
  return (
    <div className="text-center py-12">
      <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
      <h3 className="text-lg font-medium text-gray-900 mb-2">
        No stations found
      </h3>
      <p className="text-gray-600">
        Try adjusting your search terms or browse all stations.
      </p>
      <button
        onClick={onClearSearch}
        className="mt-4 text-blue-600 hover:text-blue-700 font-medium"
      >
        Clear search
      </button>
    </div>
  );
};
