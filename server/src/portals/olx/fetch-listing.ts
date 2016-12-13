import Filters from '../../../../core/src/filters';
import Property from '../../../../core/src/property';
import SearchResult from '../../../../core/src/search-result';

import fetchListingPage from './fetch-listing-page';
import { resultsLimit } from '../../config';

export default async function fetchListing(filters: Filters): Promise<SearchResult> {
  let page = 1;
  let properties: Property[] = [];
  let resultTrimmed = true;

  while (properties.length < resultsLimit) {
    const result = await fetchListingPage(filters, page);
    properties.push(...result.properties);

    if (result.moreResultsAvailable) {
      page++;
    } else {
      resultTrimmed = false;
      break;
    }
  }

  return { properties, resultTrimmed };
}