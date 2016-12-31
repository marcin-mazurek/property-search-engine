import Filters from '../../../core/src/filters';
import Property from '../../../core/src/property';
import SearchResult from '../../../core/src/search-result';
import PaginatedSearchResult from '../../../core/src/paginated-search-result';
import fetchFromWebsites from './fetch-from-websites';
import sortResult from './sort-result';
import paginateResult from './paginate-result';
import { resultsPerPage } from '../config';
import getRedisClient from '../db/get-redis-client';
import createCacheKey from './create-cache-key';

export default async function search(filters: Filters, page: number): Promise<PaginatedSearchResult> {
  let result: SearchResult;
  let cacheKey = buildCacheKey(filters);

  const cacheClient = await getRedisClient();
  const cachedResult = await cacheClient.getAsync(cacheKey);

  if (cachedResult) {
    result = JSON.parse(cachedResult);
  } else {
    result = await fetchFromWebsites(filters);
    cacheClient.set(cacheKey, JSON.stringify(result));
    cacheClient.expire(cacheKey, 60*60);
  }

  cacheClient.quit();

  return {
    properties: paginateResult(sortResult(result.properties, 'price'), page),
    resultTrimmed: result.resultTrimmed,
    totalPages: Math.ceil(result.properties.length / resultsPerPage)
  };
}