import Filters from '../../../core/src/filters';
import Property from '../../../core/src/property';
import SearchResult from '../../../core/src/search-result';
import PaginatedSearchResult from '../../../core/src/paginated-search-result';
import fetchFromWebsites from './fetch-from-websites';
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

  const paginatedProperties = result.properties.slice((page - 1) * resultsPerPage, page * resultsPerPage);

  return {
    properties: paginatedProperties,
    resultTrimmed: result.resultTrimmed,
    totalPages: Math.ceil(result.properties.length / resultsPerPage)
  };
}