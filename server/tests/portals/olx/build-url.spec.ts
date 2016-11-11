import 'mocha';
import { expect } from 'chai';
import buildUrl from '../../../src/portals/olx/build-url';
import Filters, { Type, Category, Market } from '../../../../core/filters';

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
    const url = buildUrl(defaultFilters);
    expect(url).to.contain('https://www.olx.pl/nieruchomosci/');
  });

  it('builds a URL with a property type', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ type: Type.Apartment })
    );
    const segments = getURLSegments(url);
    expect(segments[1]).to.equal('mieszkania');
  });

  it('builds a URL with an offer category', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ category: Category.Rental })
    );
    const segments = getURLSegments(url);
    expect(segments[2]).to.equal('wynajem');
  });

  it('builds a URL with location for a single word city', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Warszawa' })
    );
    const segments = getURLSegments(url);
    expect(segments[3]).to.equal('warszawa');
  });

  it('builds a URL with location for a multiple word city with custom characters', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ location: 'Siemianowice Śląskie' })
    );
    const segments = getURLSegments(url);
    expect(segments[3]).to.equal('siemianowice-slaskie');
  });

  it('builds a URL with a "price from" parameter if specified', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ priceFrom: 80000 })
    );
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('search[filter_float_price:from]=80000');
  });

  it('builds a URL without "price from" parameter if not specified', () => {
    const url = buildUrl(defaultFilters);
    expect(url).not.to.contain('search[filter_float_price:from]');
  });
  
  it('builds a URL with a "price to" parameter if specified', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ priceTo: 150000 })
    );
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('search[filter_float_price:to]=150000');
  });

  it('builds a URL without "price to" parameter if not specified', () => {
    const url = buildUrl(defaultFilters);
    expect(url).not.to.contain('search[filter_float_price:to]');
  });

  it('builds a URL with a "area from" parameter if specified', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ areaFrom: 20 })
    );
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('search[filter_float_m:from]=20');
  });

  it('builds a URL without "area from" parameter if not specified', () => {
    const url = buildUrl(defaultFilters);
    expect(url).not.to.contain('search[filter_float_m:from]');
  });

  it('builds a URL with a "area to" parameter if specified', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ areaTo: 20 })
    );
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('search[filter_float_m:to]=20');
  });

  it('builds a URL without "area to" parameter if not specified', () => {
    const url = buildUrl(defaultFilters);
    expect(url).not.to.contain('search[filter_float_m:to]');
  });

  it('builds a URL with given market type if specified', () => {
    const url = buildUrl(
      mergeFilterOptionsWithDefaults({ market: Market.Secondary })
    );
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('[filter_enum_market][0]=secondary');
  });

  it('builds a URL without market parameter if not specified', () => {
    const url = buildUrl(defaultFilters);
    expect(url).not.to.contain('search[filter_enum_market]');
  });

  it('builds a URL with page param if specified', () => {
    const url = buildUrl(defaultFilters, 2);
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('page=2');
  });

  it('builds a URL with default page param if page is not specified', () => {
    const url = buildUrl(defaultFilters);
    const searchParams = getSearchParamsFromURL(url);
    expect(searchParams).to.contain('page=1');
  });
});