import type React from 'react';
import { AlertCircle, RefreshCw } from 'lucide-react';

interface ErrorDisplayProps {
  error: string;
  isLoading: boolean;
  onRetry: () => void;
}

export const ErrorDisplay: React.FC<ErrorDisplayProps> = ({
  error,
  isLoading,
  onRetry,
}) => {
  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
        <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
        <h2 className="text-2xl font-semibold text-gray-900 mb-4">
          Failed to Load Stations
        </h2>
        <p className="text-gray-600 mb-6">{error}</p>
        <button
          onClick={onRetry}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white px-6 py-2 rounded-lg font-medium flex items-center justify-center space-x-2 w-full transition-colors"
        >
          <RefreshCw
            className={`w-4 h-4 ${isLoading ? 'animate-spin' : ''}`}
          />
          <span>{isLoading ? 'Retrying...' : 'Try Again'}</span>
        </button>
      </div>
    </div>
  );
};
