import React from 'react';
import { Star, StarHalf } from 'lucide-react';

interface PopularityStarsProps {
  popularity: number;
  size?: number;
}

export const PopularityStars: React.FC<PopularityStarsProps> = ({
  popularity,
  size = 4,
}) => {
  const fullStars = Math.floor(popularity);
  const hasHalfStar = popularity % 1 >= 0.5;

  return (
    <div className="flex items-center">
      {Array.from({ length: 5 }).map((_, i) => {
        if (i < fullStars) {
          return (
            <Star
              key={i}
              className={`w-${size} h-${size} text-yellow-400 fill-current`}
            />
          );
        } else if (i === fullStars && hasHalfStar) {
          return (
            <StarHalf
              key={i}
              className={`w-${size} h-${size} text-yellow-400 fill-current`}
            />
          );
        } else {
          return (
            <Star key={i} className={`w-${size} h-${size} text-gray-300`} />
          );
        }
      })}
    </div>
  );
};
