import 'mocha';
import Filters, { Type, Category, Market } from '../../../../core/src/filters';
import { expect } from 'chai';
import buildQueryString from '../../../src/portals/gumtree/build-query-string';

const defaultFilters = {
  type: Type.House,
  category: Category.Sale,
  location: 'Kraków'
};

function mergeFilterOptionsWithDefaults(options) {
  return Object.assign({}, defaultFilters, options);
}

describe('buildQueryString()', () => {
  it('builds a query string with a "price from" parameter if specified', () => {
    const qs = buildQueryString(
      mergeFilterOptionsWithDefaults({ priceFrom: 80 })
    );
    expect(qs.get('pr')).to.equal('80000,');
  });
  
  it('builds a query string with a "price to" parameter if specified', () => {
    const qs = buildQueryString(
      mergeFilterOptionsWithDefaults({ priceTo: 150 })
    );
    expect(qs.get('pr')).to.equal(',150000');
  });
  
  it('builds a query string with a "price from" and "price to" parameters if specified', () => {
    const qs = buildQueryString(
      mergeFilterOptionsWithDefaults({ priceFrom: 90, priceTo: 140 })
    );
    expect(qs.get('pr')).to.equal('90000,140000');
  });

  it('does not include price parameter if not specified', () => {
    const qs = buildQueryString(
      mergeFilterOptionsWithDefaults({ priceFrom: undefined, priceTo: undefined })
    );
    expect(qs.has('pr')).to.be.false;
  });

  it('throws if "area from" parameter is set', () => {
    expect(() => buildQueryString(
      mergeFilterOptionsWithDefaults({ areaFrom: 20 })
    )).to.throw('Unsupported parameter - area from');
  });

  it('throws if "area to" parameter is set', () => {
    expect(() => buildQueryString(
      mergeFilterOptionsWithDefaults({ areaTo: 50 })
    )).to.throw('Unsupported parameter - area to');
  });
});