import Filters from '../../../../core/src/filters';
import { MarketMap } from '../../../../server/src/portals/shared/olx-otodom-filter-maps';

export default function(filters: Filters): any {
  const queryString = {};

  if (filters.priceFrom) {
    queryString['search[filter_float_price:from]'] = (filters.priceFrom * 1000).toString();
  }
  if (filters.priceTo) {
    queryString['search[filter_float_price:to]'] = (filters.priceTo * 1000).toString();
  }
  if (filters.areaFrom) {
    queryString['search[filter_float_m:from]'] = filters.areaFrom.toString();
  }
  if (filters.areaTo) {
    queryString['search[filter_float_m:to]'] = filters.areaTo.toString();
  }
  if (filters.market) {
    queryString['[filter_enum_market][0]'] = MarketMap[filters.market];
  }

  return queryString;
};