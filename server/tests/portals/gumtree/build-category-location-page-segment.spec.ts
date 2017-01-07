import 'mocha';
import Filters, { Type, Category } from '../../../../core/src/filters';
import { expect } from 'chai';
import * as proxyquire from 'proxyquire';
import { stub } from 'sinon';

const getCityListStub = stub().returns(
  Promise.resolve({ 3200171: 'Zielona Góra' })
);
const buildCategoryLocationPageSegment = proxyquire('../../../src/portals/gumtree/build-category-location-page-segment', {
  './get-city-list': { default: getCityListStub }
}).default;

describe('buildCategoryLocationPageSegment()', () => {
  // https://www.gumtree.pl/s-mieszkania-i-domy-sprzedam-i-kupie/zielona-gora/mieszkanie/v1c9073l3200171a1dwp3
  it('builds the segment for apartment sale', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.Apartment,
      category: Category.Sale
    }, 3);

    expect(segment).to.equal('v1c9073l3200171a1dwp3');
  });

  // https://www.gumtree.pl/s-mieszkania-i-domy-sprzedam-i-kupie/zielona-gora/dom/v1c9073l3200171a1dwp2
  it('build the segment for house sale', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.House,
      category: Category.Sale
    }, 2);

    expect(segment).to.equal('v1c9073l3200171a1dwp2');
  });

  // https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/zielona-gora/dom/v1c9008l3200171a1dwp1
  it('builds the segment for house rental', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.House,
      category: Category.Rental
    }, 1);

    expect(segment).to.equal('v1c9008l3200171a1dwp1');
  });

  // https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/zielona-gora/mieszkanie/v1c9008l3200171a1dwp1
  it('builds the segment for apartment rental', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.Apartment,
      category: Category.Rental
    }, 1);

    expect(segment).to.equal('v1c9008l3200171a1dwp1');
  });

  // https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/zielona-gora/mieszkanie/v1c9008l3200171a1dwp1
  it('builds the segment for apartment rental', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.Apartment,
      category: Category.Rental
    }, 1);

    expect(segment).to.equal('v1c9008l3200171a1dwp1');
  });
  
  // https://www.gumtree.pl/s-pokoje-do-wynajecia/zielona-gora/v1c9000l3200171p1
  it('builds the segment for room rental', async () => {
    const segment = await buildCategoryLocationPageSegment({
      location: 'Zielona Góra',
      type: Type.Room,
      category: Category.Rental
    }, 1);

    expect(segment).to.equal('v1c9000l3200171p1');
  });

  it('throws when trying to build the segment for room sale', async () => {
    try {
      await buildCategoryLocationPageSegment({
        location: 'Zielona Góra',
        type: Type.Room,
        category: Category.Sale
      }, 1);

      expect.fail();
    } catch(e) {
      expect(e.message).to.equal('Invalid combination of filters - room and sale');
    }
  });
  
  it('throws when a city is unknown', async () => {
    try {
      await buildCategoryLocationPageSegment({
        location: 'Nieistniejewo',
        type: Type.Apartment,
        category: Category.Rental
      }, 1);

      expect.fail();
    } catch(e) {
      expect(e.message).to.equal('City not found');
    }
  });
});