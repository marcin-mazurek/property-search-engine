import Filters, { Category, Type } from '../../../../core/src/filters';
import * as nock from 'nock';
import * as proxyquire from 'proxyquire';
import gumtreeSinglePageResponse from '../../_fixtures/gumtree-single-page';
import gumtreeMultiPageResponse from '../../_fixtures/gumtree-multi-page';
import { expect } from 'chai';
import { stub } from 'sinon';

const filters: Filters = {
  category: Category.Sale,
  type: Type.Apartment,
  location: 'Warszawa'
};

const buildUrlStub = stub()
  .withArgs(filters, 1)
  .returns('https://www.gumtree.pl/s-mieszkania-i-domy-do-wynajecia/rembertow/v1c9008l3200016p1');

const fetchListingPage = proxyquire('../../../../server/src/portals/gumtree/fetch-listing-page', {
  './build-url': { default: buildUrlStub }
}).default;

describe('fetchListingPage() for OLX', () => {
  context('one page result', () => {
    beforeEach(() => {
      nock('https://www.gumtree.pl')
        .get('/s-mieszkania-i-domy-do-wynajecia/rembertow/v1c9008l3200016p1')
        .reply(200, gumtreeSinglePageResponse);
    });

    it('fetches the Gumtree listing page with given filters and returns a list of properties excluding promoted and from other locations', async () => {
      const result = await fetchListingPage(filters);

      expect(result.properties).to.have.lengthOf(6);

      expect(result.properties[0]).to.deep.equal({
        title: 'Ładną kawalerkę wynajmę',
        location: 'Rembertów',
        added: '6 godz temu',
        price: 999,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/ładną-kawalerkę-wynajmę/1001868686220910489036809',
        thumbnailUrl: null
      });
      
      expect(result.properties[1]).to.deep.equal({
        title: 'Kawalerka do wynajecia w Rembertowie! Bezposrednio',
        location: 'Rembertów',
        added: '4-01',
        price: 700,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/kawalerka-do-wynajecia-w-rembertowie-bezposrednio/1001869941470910471765709',
        thumbnailUrl: 'https://img.classistatic.com/crop/75x50/i.ebayimg.com/00/s/NjAwWDgwMA==/z/m30AAOSwopRYbXaK/$_19.JPG'
      });

      expect(result.properties[2]).to.deep.equal({
        title: 'Piękne mieszkanie do wynajęcia - Stary Rembertów',
        location: 'Rembertów',
        added: '4-01',
        price: 1300,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/piękne-mieszkanie-do-wynajęcia-+-stary-rembertów/1001869864610911049121809',
        thumbnailUrl: 'https://img.classistatic.com/crop/75x50/i.ebayimg.com/00/s/NjAwWDQ1MA==/z/V80AAOSwUKxYbUYh/$_19.JPG'
      });

      expect(result.properties[3]).to.deep.equal({
        title: 'Mieszkanie Warszawa Rembertów 51m2 (nr: 392675W)',
        location: 'Rembertów',
        added: '3-01',
        price: 1800,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/mieszkanie-warszawa-rembertów-51m2-nr-392675w/1001869023150910468792809',
        thumbnailUrl: 'https://img.classistatic.com/crop/75x50/i.ebayimg.com/00/s/NDgwWDY0MA==/z/XB4AAOSwEzxYbAkj/$_19.JPG?set_id=8800005007'
      });

      expect(result.properties[4]).to.deep.equal({
        title: 'Mieszkane do wynajęcia - Stary Rembertów',
        location: 'Rembertów',
        added: '2-01',
        price: 1600,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/mieszkane-do-wynajęcia-+-stary-rembertów/1001867983610911093436309',
        thumbnailUrl: 'https://img.classistatic.com/crop/75x50/i.ebayimg.com/00/s/ODAwWDUzMw==/z/yjkAAOSwa~BYamsc/$_19.JPG'
      });

      expect(result.properties[5]).to.deep.equal({
        title: 'Obok AON w samodzielnym mieszkaniu w bloku.',
        location: 'Rembertów',
        added: '29-12',
        price: 500,
        offerUrl: 'https://www.gumtree.pl/a-mieszkania-i-domy-do-wynajecia/rembertow/obok-aon-w-samodzielnym-mieszkaniu-w-bloku/1001865941540910495904909',
        thumbnailUrl: 'https://img.classistatic.com/crop/75x50/i.ebayimg.com/00/s/NjAwWDgwMA==/z/R60AAOSw5cNYZVVO/$_19.JPG'
      });
    });

    it('indicates that no more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.moreResultsAvailable).to.be.false;
    });
  });

  context('multiple pages result', () => {
    beforeEach(() => {
      nock('https://www.gumtree.pl')
        .get('/s-mieszkania-i-domy-do-wynajecia/rembertow/v1c9008l3200016p1')
        .reply(200, gumtreeMultiPageResponse);
    });

    it('fetches the Gumtree listing page with given filters and returns a list of properties', async () => {
      const result = await fetchListingPage(filters);
      expect(result.properties).to.have.lengthOf(20);
    });

    it('indicates that more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.totalPages).to.equal(668);
      expect(result.moreResultsAvailable).to.be.true;
    });
  });
});