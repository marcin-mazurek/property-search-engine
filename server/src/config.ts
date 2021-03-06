import fetchOlxListing from './portals/olx/fetch-listing';
import fetchOtodomListing from './portals/otodom/fetch-listing';
import fetchGumtreeListing from './portals/gumtree/fetch-listing';
import FetchFunction from '../../core/src/fetch-function';

export const resultsPerPage = 25;
export const resultsLimit = 1000;

export const fetchFunctions = [
  fetchGumtreeListing,
  fetchOlxListing,
  fetchOtodomListing
];
