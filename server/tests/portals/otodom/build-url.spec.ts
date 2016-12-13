import 'mocha';
import { expect } from 'chai';
import buildUrl from '../../../src/portals/otodom/build-url';
import Filters, { Type, Category, Market } from '../../../../core/src/filters';
import buildOlxOtodomQueryString from '../../../src/portals/shared/build-olx-otodom-query-string';
import { getQueryStringFromUrl, getURLSegments } from '../../_helpers/url';

const defaultFilters = {
  type: Type.House,
  category: Category.Sale,
  location: 'Kraków'
};

function mergeFilterOptionsWithDefaults(options): any {
  return Object.assign({}, defaultFilters, options);
}

describe('buildUrl() for Otodom', () => {
  it('builds a URL containing the Otodom host', () => {
    const url = buildUrl(defaultFilters, 1);
    expect(url).to.contain('https://otodom.pl/');
  });

  it('builds a URL with an offer category', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ category: Category.Rental }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[0]).to.equal('wynajem');
  });

  it('builds a URL with a property type', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ type: Type.Apartment }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[1]).to.equal('mieszkanie');
  });

  it('builds a URL with location for a single word city', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Warszawa' }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[2]).to.equal('warszawa');
  });

  it('builds a URL with location for a multiple word city with custom characters', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Siemianowice Śląskie' }), 1
    );
    const segments = getURLSegments(url);
    expect(segments[2]).to.equal('siemianowice-slaskie');
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

  it('builds a URL with nrAdsPerPage=72 param to maximalise number of ads per page', () => {
    const queryString = getQueryStringFromUrl(
      buildUrl(defaultFilters, 2)
    );
    expect(queryString).to.contain('nrAdsPerPage=72');
  });
});