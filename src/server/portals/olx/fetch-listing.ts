import fetch from 'node-fetch';
import Property from '../../../../src/core/property';
import Filters from '../../../../src/core/filters';
import buildUrl from '../../../../src/server/portals/olx/build-url';
import parsePageResponse from './parse-page-response';

export default function fetchListing(filters: Filters, page: number = 1): Promise<Property[]> {
  const url = buildUrl(filters, page);
  return fetch(url)
    .then(response => response.text())
    .then(parsePageResponse);
}