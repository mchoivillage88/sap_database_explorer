// Helper function to get size category and color
export const getSizeInfo = (recordCount: string) => {
  const numericValue = recordCount.toLowerCase();
  
  if (numericValue.includes('1b+') || numericValue.includes('billion')) {
    return { label: 'XL', color: 'bg-red-600', textColor: 'text-red-600' };
  }
  if (numericValue.includes('200m') || numericValue.includes('500m')) {
    return { label: 'L+', color: 'bg-orange-600', textColor: 'text-orange-600' };
  }
  if (numericValue.includes('50m') || numericValue.includes('100m')) {
    return { label: 'L', color: 'bg-orange-500', textColor: 'text-orange-500' };
  }
  if (numericValue.includes('1m') || numericValue.includes('5m') || numericValue.includes('10m') || numericValue.includes('20m')) {
    return { label: 'M', color: 'bg-yellow-600', textColor: 'text-yellow-600' };
  }
  if (numericValue.includes('100k') || numericValue.includes('500k')) {
    return { label: 'S', color: 'bg-green-600', textColor: 'text-green-600' };
  }
  if (numericValue.includes('10k') || numericValue.includes('50k') || numericValue.includes('20k')) {
    return { label: 'XS', color: 'bg-blue-600', textColor: 'text-blue-600' };
  }
  return { label: 'M', color: 'bg-gray-600', textColor: 'text-gray-600' };
};
