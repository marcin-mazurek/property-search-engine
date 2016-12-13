import Property from './property';

interface SinglePageSearchResult {
  properties: Property[];
  moreResultsAvailable: boolean;
  totalPages?: number;
}

export default SinglePageSearchResult;