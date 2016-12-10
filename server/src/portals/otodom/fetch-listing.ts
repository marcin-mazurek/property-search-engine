import fetch from 'node-fetch';
import SearchResult from '../../../../core/src/search-result';
import Filters from '../../../../core/src/filters';
import buildUrl from './build-url';
import parsePageResponse from './parse-page-response';

export default function fetchListing(filters: Filters, page: number = 1): Promise<SearchResult> {
  const url = buildUrl(filters, page);
  return fetch(url)
    .then(response => response.text())
    .then(parsePageResponse);
}