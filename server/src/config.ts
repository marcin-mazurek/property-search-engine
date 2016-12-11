import fetchOlxListing from './portals/olx/fetch-listing';
import fetchOtodomListing from './portals/otodom/fetch-listing';

export const resultsPerPage = 25;
export const resultsLimit = 200;

export const fetchFunctions = [
  fetchOlxListing,
  fetchOtodomListing
];
