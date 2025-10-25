export const getStringParam = (param: string | string[] | undefined): string | undefined => {
  if (typeof param === 'string') return param;
  if (Array.isArray(param) && param.length > 0) return param[0];
  return undefined;
};

export const getCurrentSortLabel = (sortBy: string, sortOptions: Array<{ value: string; label: string }>): string => {
  return sortOptions.find(option => option.value === sortBy)?.label || 'Relevance';
};

export const getGridClass = (gridColumns: number): string => {
  const columnClasses = ['grid-cols-1', 'grid-cols-2', 'grid-cols-3', 'grid-cols-4'];
  const columnClass = columnClasses[Math.min(gridColumns - 1, 3)];
  return `grid gap-6 ${columnClass}`;
};

export const isNearBottom = (scrollThreshold: number = 500): boolean => {
  const scrollTop = document.documentElement.scrollTop;
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  
  return scrollTop + clientHeight >= scrollHeight - scrollThreshold;
};