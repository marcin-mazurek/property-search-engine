import fetch from 'node-fetch';
import SearchResult from '../../../../src/core/search-result';
import Filters from '../../../../src/core/filters';
import buildUrl from '../../../../src/server/portals/olx/build-url';
import parsePageResponse from './parse-page-response';

export default function fetchListing(filters: Filters, page: number = 1): Promise<SearchResult> {
  const url = buildUrl(filters, page);
  return fetch(url)
    .then(response => response.text())
    .then(parsePageResponse);
}