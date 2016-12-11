import Property from './property';

interface FetchResult {
  properties: Property[];
  resultTrimmed: boolean;
}

export default FetchResult;