import { useState } from 'react';

export const useImageLoader = () => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  return {
    imageError,
    imageLoading,
    handleImageLoad,
    handleImageError,
  };
};
