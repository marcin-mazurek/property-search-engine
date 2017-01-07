import Filters from '../../../../core/src/filters';
import SearchResult from '../../../../core/src/search-result';
import fetchListingPage from './fetch-listing-page';
import fetchListingPagesInParallel from '../shared/fetch-listing-pages-in-parallel';

export default function fetchListing(filters: Filters): Promise<SearchResult> {
  return fetchListingPagesInParallel(filters, fetchListingPage);
}