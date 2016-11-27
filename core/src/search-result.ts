import Property from './property';

interface SearchResult {
  properties: Property[];
  moreResultsAvailable: boolean;
}

export default SearchResult;