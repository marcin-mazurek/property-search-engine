import Filters from '../../../../core/src/filters';
import { CategoryMap, MarketMap } from '../../portals/shared/olx-otodom-filter-maps';
import { TypeMap } from '../../portals/otodom/type-filter-map';
import URLBuilder from '../../../../core/src/url-builder';
import slugify from '../shared/slugify';
import buildOlxOtodomQueryString from '../shared/build-olx-otodom-query-string';

const basePath = 'https://otodom.pl';

export default function buildUrl(filters: Filters, page: number) : string {
  const url = new URLBuilder(basePath);

  url.addSegment(CategoryMap[filters.category]);
  url.addSegment(TypeMap[filters.type]);
  url.addSegment(slugify(filters.location));
  url.addQueryStringParts(buildOlxOtodomQueryString(filters, page));

  return url.build();
}