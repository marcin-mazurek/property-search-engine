import Filters from '../../../../core/src/filters';
import { TypeMap, CategoryMap, MarketMap } from '../../portals/olx/filter-maps';
import URLBuilder from '../../../../core/src/url-builder';
import slugify from './slugify';

const basePath = 'https://www.olx.pl/nieruchomosci';

export default function buildUrl(filters: Filters, page: number) : string {
  const url = new URLBuilder(basePath);

  url.addSegment(TypeMap[filters.type]);
  url.addSegment(CategoryMap[filters.category]);
  url.addSegment(slugify(filters.location));
  url.addQueryStringPart('page', page.toString());

  if (filters.priceFrom) {
    url.addQueryStringPart('search[filter_float_price:from]', (filters.priceFrom * 1000).toString());
  }
  if (filters.priceTo) {
    url.addQueryStringPart('search[filter_float_price:to]', (filters.priceTo * 1000).toString());
  }
  if (filters.areaFrom) {
    url.addQueryStringPart('search[filter_float_m:from]', filters.areaFrom.toString());
  }
  if (filters.areaTo) {
    url.addQueryStringPart('search[filter_float_m:to]', filters.areaTo.toString());
  }
  if (filters.market) {
    url.addQueryStringPart('[filter_enum_market][0]', MarketMap[filters.market]);
  }

  return url.build();
}