import Filters from '../../../../core/src/filters';
import { MarketMap } from '../../../../server/src/portals/shared/olx-otodom-filter-maps';

export default function(filters: Filters, page: number): Map<string, string> {
  const queryString = new Map<string, string>();
  queryString.set('page', page.toString());

  if (filters.priceFrom) {
    queryString.set('search[filter_float_price:from]', (filters.priceFrom * 1000).toString());
  }
  if (filters.priceTo) {
    queryString.set('search[filter_float_price:to]', (filters.priceTo * 1000).toString());
  }
  if (filters.areaFrom) {
    queryString.set('search[filter_float_m:from]', filters.areaFrom.toString());
  }
  if (filters.areaTo) {
    queryString.set('search[filter_float_m:to]', filters.areaTo.toString());
  }
  if (filters.market) {
    queryString.set('search[filter_enum_market][0]', MarketMap[filters.market]);
  }

  return queryString;
};