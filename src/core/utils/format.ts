export const formatReliability = (reliability: number): string => {
  return `${reliability}%`;
};

export const formatPopularity = (popularity?: number): string => {
  if (!popularity) return 'N/A';
  return popularity.toLocaleString();
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + '...';
};