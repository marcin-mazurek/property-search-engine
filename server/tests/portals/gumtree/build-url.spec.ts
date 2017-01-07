import 'mocha';
import { expect } from 'chai';
import * as proxyquire from 'proxyquire';
import Filters, { Type, Category, Market } from '../../../../core/src/filters';
import { getQueryStringFromUrl, getURLSegments } from '../../_helpers/url';
import { stub } from 'sinon';

const buildCategoryLocationPageSegmentStub = stub().returns(
  Promise.resolve('some-string')
);
const buildQueryStringStub = stub().returns(new Map());

const buildUrl = proxyquire('../../../src/portals/gumtree/build-url', {
  './build-category-location-page-segment': {
    default: buildCategoryLocationPageSegmentStub
  },
  './build-query-string': {
    default: buildQueryStringStub
  }
}).default;

const defaultFilters = {
  type: Type.House,
  category: Category.Sale,
  location: 'Kraków'
};

function mergeFilterOptionsWithDefaults(options): any {
  return Object.assign({}, defaultFilters, options);
}

describe.only('buildUrl()', () => {
  it('builds a URL containing the Gumtree host', async () => {
    const url = await buildUrl(defaultFilters, 1);
    expect(url).to.contain('https://www.gumtree.pl/');
  });

  it('builds a URL for house sale', async () => {
    const filters = mergeFilterOptionsWithDefaults({ type: Type.House });
    const url = await buildUrl(filters, 1);
    expect(getURLSegments(url)[0]).to.equal('s-mieszkania-i-domy-sprzedam-i-kupie');
    expect(getURLSegments(url)[2]).to.equal('dom');
  });

  it('builds a URL for apartment sale', async () => {
    const filters = mergeFilterOptionsWithDefaults({ type: Type.Apartment });
    const url = await buildUrl(filters, 1);
    expect(getURLSegments(url)[0]).to.equal('s-mieszkania-i-domy-sprzedam-i-kupie');
    expect(getURLSegments(url)[2]).to.equal('mieszkanie');
  });

  it('builds a URL for room rental', async () => {
    const filters = mergeFilterOptionsWithDefaults({ type: Type.Room });
    const url = await buildUrl(filters, 1);
    expect(getURLSegments(url)[0]).to.equal('s-pokoje-do-wynajecia');
  });

  it('builds a URL with location for a single word city', async () => {
    const filters = mergeFilterOptionsWithDefaults({ location: 'Warszawa' });
    const url = await buildUrl(filters, 1);
    expect(getURLSegments(url)[1]).to.equal('warszawa');
  });

  it('builds a URL with location for a multiple word city with custom characters', async () => {
    const filters = mergeFilterOptionsWithDefaults({ location: 'Siemianowice Śląskie' });
    const url = await buildUrl(filters, 1);
    expect(getURLSegments(url)[1]).to.equal('siemianowice-slaskie');
  });

  it('builds a URL with page segment if page is greater than 1', async () => {
    const url = await buildUrl(defaultFilters, 5);
    expect(getURLSegments(url)[3]).to.equal('page-5');
  });

  it('builds a URL without page segment if page is 1', async () => {
    const url = await buildUrl(defaultFilters, 1);
    expect(getURLSegments(url)[3]).not.to.equal('page-1');
  });

  it('builds a URL with a category ID, location ID and page number segment (for 1st page)',
    async () => {
      buildCategoryLocationPageSegmentStub
        .withArgs(defaultFilters, 1)
        .returns(
          Promise.resolve('v1c9073l3200171p1')
        );

      const url = await buildUrl(defaultFilters, 1);
      expect(getURLSegments(url)[3]).to.equal('v1c9073l3200171p1');
    }
  );

  it('builds a URL with a category ID, location ID and page number segment (for 2nd+ page)',
    async () => {
      buildCategoryLocationPageSegmentStub
        .withArgs(defaultFilters, 4)
        .returns(
          Promise.resolve('v1c9073l3200171p4')
        );

      const url = await buildUrl(defaultFilters, 4);
      expect(getURLSegments(url)[4]).to.equal('v1c9073l3200171p4');
    }
  );

  it('builds a URL with filters', async () => {
    buildQueryStringStub.withArgs(defaultFilters).returns(
      new Map().set('pr', '80000,150000')
    );

    const url = await buildUrl(defaultFilters, 1);
    expect(getQueryStringFromUrl(url)).to.contain('pr=80000,150000');
  });
});