import Property from './property';

interface PaginatedSearchResult {
  properties: Property[];
  resultTrimmed: boolean;
  totalPages: number;
}

export default PaginatedSearchResult;