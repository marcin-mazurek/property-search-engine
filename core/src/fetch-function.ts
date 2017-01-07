import Filters from './filters';
import SinglePageSearchResult from './single-page-search-result';

interface FetchFunction {
  (filters: Filters, page: number): Promise<SinglePageSearchResult>;
}

export default FetchFunction;