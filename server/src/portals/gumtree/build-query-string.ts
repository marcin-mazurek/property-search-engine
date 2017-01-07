import Filters from '../../../../core/src/filters';

export default function buildQueryString(filters: Filters): Map<string, string> {
  const queryParams = new Map<string, string>();

  if (filters.priceFrom || filters.priceTo) {
    const value = (filters.priceFrom * 1000 || '') + ',' + (filters.priceTo * 1000 || '');
    queryParams.set('pr', value);
  }

  if (filters.areaFrom) {
    throw new Error('Unsupported parameter - area from');
  }
  if (filters.areaTo) {
    throw new Error('Unsupported parameter - area to');
  }

  return queryParams;
}