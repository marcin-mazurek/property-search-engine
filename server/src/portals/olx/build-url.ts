import Filters from '../../../../core/src/filters';
import { TypeMap, CategoryMap, MarketMap } from '../../portals/shared/olx-otodom-filter-maps';
import URLBuilder from '../../../../core/src/url-builder';
import slugify from './slugify';
import buildOlxOtodomQueryString from '../shared/build-olx-otodom-query-string';

const basePath = 'https://www.olx.pl/nieruchomosci';

export default function buildUrl(filters: Filters, page: number) : string {
  const url = new URLBuilder(basePath);

  url.addSegment(TypeMap[filters.type]);
  url.addSegment(CategoryMap[filters.category]);
  url.addSegment(slugify(filters.location));
  url.addQueryStringPart('page', page.toString());
  url.addQueryStringParts(buildOlxOtodomQueryString(filters));

  return url.build();
}