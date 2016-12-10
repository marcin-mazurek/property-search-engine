import 'mocha';
import { expect } from 'chai';
import buildOlxOtodomQueryString from '../../../src/portals/shared/build-olx-otodom-query-string';
import Filters, { Type, Category, Market } from '../../../../core/src/filters';

const defaultFilters = {
  type: Type.House,
  category: Category.Sale,
  location: 'Kraków'
};

function mergeFilterOptionsWithDefaults(options) {
  return Object.assign({}, defaultFilters, options);
}

describe('buildOlxOtodomQueryString', () => {
  it('builds a query string with a "price from" parameter if specified', () => {
    const qs = buildOlxOtodomQueryString(
      mergeFilterOptionsWithDefaults({ priceFrom: 80 }), 1
    );
    expect(qs.get('search[filter_float_price:from]')).to.equal('80000');
  });

  it('builds a query string without "price from" parameter if not specified', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 1);
    expect(qs.has('search[filter_float_price:from]')).to.be.false;
  });
  
  it('builds a query string with a "price to" parameter if specified', () => {
    const qs = buildOlxOtodomQueryString(
      mergeFilterOptionsWithDefaults({ priceTo: 150 }), 1
    );
    expect(qs.get('search[filter_float_price:to]')).to.equal('150000');
  });

  it('builds a query string without "price to" parameter if not specified', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 1);
    expect(qs.has('search[filter_float_price:to]')).to.be.false;
  });

  it('builds a query string with a "area from" parameter if specified', () => {
    const qs = buildOlxOtodomQueryString(
      mergeFilterOptionsWithDefaults({ areaFrom: 20 }), 1
    );
    expect(qs.get('search[filter_float_m:from]')).to.equal('20');
  });

  it('builds a query string without "area from" parameter if not specified', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 1);
    expect(qs.has('search[filter_float_m:from]')).to.be.false;
  });

  it('builds a query string with a "area to" parameter if specified', () => {
    const qs = buildOlxOtodomQueryString(
      mergeFilterOptionsWithDefaults({ areaTo: 20 }), 1
    );
    expect(qs.get('search[filter_float_m:to]')).to.equal('20');
  });

  it('builds a query string without "area to" parameter if not specified', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 1);
    expect(qs.has('search[filter_float_m:to]')).to.be.false;
  });

  it('builds a query string with given market type if specified', () => {
    const qs = buildOlxOtodomQueryString(
      mergeFilterOptionsWithDefaults({ market: Market.Secondary }), 1
    );
    expect(qs.get('search[filter_enum_market][0]')).to.equal('secondary');
  });

  it('builds a query string without market parameter if not specified', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 1);
    expect(qs.has('search[filter_enum_market]')).to.be.false;
  });

  it('builds a query string with page parameter', () => {
    const qs = buildOlxOtodomQueryString(defaultFilters, 3);
    expect(qs.get('page')).to.equal('3');
  })
});