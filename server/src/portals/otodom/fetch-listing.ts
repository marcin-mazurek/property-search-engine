import Filters from '../../../../core/src/filters';
import Property from '../../../../core/src/property';
import SearchResult from '../../../../core/src/search-result';
import fetchListingPage from './fetch-listing-page';
import { resultsLimit } from '../../config';

const resultsPerPage = 72;
const maxPagesToDownload = Math.ceil(resultsLimit / resultsPerPage);

export default async function fetchListing(filters: Filters): Promise<SearchResult> {
  const properties: Property[] = [];
  
  const firstPageResult = await fetchListingPage(filters, 1);
  properties.push(...firstPageResult.properties);

  if (!firstPageResult.moreResultsAvailable) {
    return { properties, resultTrimmed: false };
  }

  const pagesToDownload = Math.min(firstPageResult.totalPages, maxPagesToDownload);
  const fetchPagePromises = [];

  for (let page = 2; page <= pagesToDownload; page++) {
    fetchPagePromises.push(
      fetchListingPage(filters, page)
    );
  }

  const results = await Promise.all(fetchPagePromises);
  results.forEach(result => properties.push(...result.properties));

  return {
    properties,
    resultTrimmed: firstPageResult.totalPages > maxPagesToDownload
  };
}