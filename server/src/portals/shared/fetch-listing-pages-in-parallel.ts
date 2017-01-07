import Filters from '../../../../core/src/filters';
import Property from '../../../../core/src/property';
import FetchFunction from '../../../../core/src/fetch-function';
import SearchResult from '../../../../core/src/search-result';
import { resultsLimit } from '../../config';

export default async function fetchListingPagesInParallel(
  filters: Filters, fetchFunction: FetchFunction
): Promise<SearchResult> {
  const properties: Property[] = [];
  
  const firstPageResult = await fetchFunction(filters, 1);
  properties.push(...firstPageResult.properties);

  if (!firstPageResult.moreResultsAvailable) {
    return { properties, resultTrimmed: false };
  }
  
  const resultsPerPage = properties.length;
  const maxPagesToDownload = Math.ceil(resultsLimit / resultsPerPage);

  const pagesToDownload = Math.min(firstPageResult.totalPages, maxPagesToDownload);
  const fetchPagePromises = [];

  for (let page = 2; page <= pagesToDownload; page++) {
    fetchPagePromises.push(
      fetchFunction(filters, page)
    );
  }

  const results = await Promise.all(fetchPagePromises);
  results.forEach(result => properties.push(...result.properties));

  return {
    properties,
    resultTrimmed: firstPageResult.totalPages > maxPagesToDownload
  };
}