import fetch from 'node-fetch';
import SinglePageSearchResult from '../../../../core/src/single-page-search-result';
import Filters from '../../../../core/src/filters';
import buildUrl from './build-url';
import parsePageResponse from './parse-page-response';

export default function fetchListing(filters: Filters, page: number = 1): Promise<SinglePageSearchResult> {
  const url = buildUrl(filters, page);
  
  return fetch(url)
    .then(response => response.text())
    .then(parsePageResponse);
}