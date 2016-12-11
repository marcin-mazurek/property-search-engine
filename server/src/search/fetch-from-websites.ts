import Filters from '../../../core/src/filters';
import SinglePageSearchResult from '../../../core/src/single-page-search-result';

import Property from '../../../core/src/property';
import SearchResult from '../../../core/src/search-result';
import { fetchFunctions, resultsLimit } from '../config';

export default async function fetchFromWebsites(filters: Filters): Promise<SearchResult> {
  let page = 1;
  let portalIndex = 0;
  let properties: Property[] = [];
  let resultTrimmed = true;

  while (properties.length < resultsLimit) {
    const fetchFunction = fetchFunctions[portalIndex];
    const result = await fetchFunction(filters, page);
    properties.push(...result.properties);

    if (result.moreResultsAvailable) {
      page++;
    } else if (fetchFunctions[portalIndex + 1]) {
      page = 1;
      portalIndex++;
    } else {
      resultTrimmed = false;
      break;
    }
  }

  return { properties, resultTrimmed };
}