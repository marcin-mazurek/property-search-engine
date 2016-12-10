import 'mocha';
import { expect } from 'chai';
import buildUrl from '../../../src/portals/olx/build-url';
import Filters, { Type, Category, Market } from '../../../../core/src/filters';

const defaultFilters = {
  type: Type.House,
  category: Category.Sale,
  location: 'Kraków'
};

function mergeFilterOptionsWithDefaults(options) {
  return Object.assign({}, defaultFilters, options);
}

function getSearchParamsFromURL(url) {
  return url.split('?')[1].split('&');
}

function getURLSegments(url) {
  return url.split('?')[0].split('/').slice(3);
}

describe('buildUrl()', () => {
  it('builds a URL containing the OLX host', () => {
    const url = buildUrl(defaultFilters, 1);
    expect(url).to.contain('https://www.olx.pl/nieruchomosci/');
  });

  it('builds a URL with a property type', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ type: Type.Apartment }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[1]).to.equal('mieszkania');
  });

  it('builds a URL with an offer category', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ category: Category.Rental }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[2]).to.equal('wynajem');
  });

  it('builds a URL with location for a single word city', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Warszawa' }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[3]).to.equal('warszawa');
  });

  it('builds a URL with location for a multiple word city with custom characters', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Siemianowice Śląskie' }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[3]).to.equal('siemianowice-slaskie');
  });

  it('builds a URL with filter search params', () => {
    const queryString = getQueryStringFromUrl(
      buildUrl(defaultFilters, 2)
    );
    const expectedQueryStringParams = buildOlxOtodomQueryString(defaultFilters, 2);

    expectedQueryStringParams.forEach((value, key) => {
      expect(queryString).to.contain(`${key}=${value}`);
    });
  });
});