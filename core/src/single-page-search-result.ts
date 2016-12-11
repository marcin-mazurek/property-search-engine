import Property from './property';

interface SinglePageSearchResult {
  properties: Property[];
  moreResultsAvailable: boolean;
}

export default SinglePageSearchResult;