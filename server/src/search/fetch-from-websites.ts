import Filters from '../../../core/src/filters';
import SinglePageSearchResult from '../../../core/src/single-page-search-result';
import Property from '../../../core/src/property';
import SearchResult from '../../../core/src/search-result';
import removeDuplicates from './remove-duplicates';
import { fetchFunctions } from '../config';

export default async function fetchFromWebsites(filters: Filters): Promise<SearchResult> {
  let properties: Property[] = [];
  let resultTrimmed = false;

  const promises = fetchFunctions.map(fn => fn(filters));
  const results = await Promise.all(promises);

  results.forEach(result => {
    properties.push(...result.properties);

    if (result.resultTrimmed === true) {
      resultTrimmed = true;
    }
  });

  return {
    properties: removeDuplicates(properties),
    resultTrimmed
  };
}