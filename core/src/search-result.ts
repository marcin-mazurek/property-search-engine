import Property from './property';

interface SearchResult {
  properties: Property[];
  resultTrimmed: boolean;
}

export default SearchResult;