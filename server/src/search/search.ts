import Filters from '../../../core/src/filters';
import Property from '../../../core/src/property';
import SearchResult from '../../../core/src/search-result';
import PaginatedSearchResult from '../../../core/src/paginated-search-result';
import fetchFromWebsites from './fetch-from-websites';
import sortResult from './sort-result';
import paginateResult from './paginate-result';
import { resultsPerPage } from '../config';

// TODO: replace with Redis cache
const cache = {};

export default async function search(filters: Filters, page: number): Promise<PaginatedSearchResult> {
  let result: SearchResult;
  let cacheKey = JSON.stringify(filters);

  if (cache[cacheKey]) {
    result = cache[cacheKey];
  } else {
    result = await fetchFromWebsites(filters);
    cache[cacheKey] = result;
  }

  return {
    properties: paginateResult(sortResult(result.properties, 'price'), page),
    resultTrimmed: result.resultTrimmed,
    totalPages: Math.ceil(result.properties.length / resultsPerPage)
  };
}