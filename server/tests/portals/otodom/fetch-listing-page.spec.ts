import Filters, { Category, Type } from '../../../../core/src/filters';
import * as nock from 'nock';
import { parse } from 'url';
import buildUrl from '../../../../server/src/portals/otodom/build-url';
import fetchListingPage from '../../../../server/src/portals/otodom/fetch-listing-page';
import singlePageResponse from '../../_fixtures/otodom-single-page';
import multiPageResponse from '../../_fixtures/otodom-multi-page';
import { expect } from 'chai';

const filters: Filters = {
  category: Category.Sale,
  type: Type.Apartment,
  location: 'Warszawa'
};

const url = parse(buildUrl(filters, 1));

describe('fetchListingPage() for Otodom', () => {
  context('one page result', () => {
    beforeEach(() => {
      nock(url.protocol + '//' + url.host)
        .get(url.path)
        .reply(200, singlePageResponse);
    });

    it('fetches the Otodom listing page with given filters and returns a list of properties excluding promoted', async () => {
      const result = await fetchListingPage(filters);

      expect(result.properties).to.have.lengthOf(5);

      expect(result.properties[0]).to.deep.equal({
        title: 'Bródno- kawalerka 27,5m2- do remontu',
        location: 'Warszawa, Bródno, Ogińskiego 9',
        added: '',
        price: 159000,
        offerUrl: 'https://otodom.pl/oferta/brodno-kawalerka-27-5m2-do-remontu-ID2VR6p.html',
        thumbnailUrl: 'https://img42.otodom.pl/images_otodompl/8892579_10_314x236_brodno-kawalerka-275m2-do-remontu-_rev010.jpg'
      });
      
      expect(result.properties[1]).to.deep.equal({
        title: 'Mieszkanie, 28 m², Warszawa',
        location: 'Warszawa, Bródno, Piotra Wysockiego',
        added: '',
        price: 160000,
        offerUrl: 'https://otodom.pl/oferta/mieszkanie-28-m-warszawa-ID37z12.html',
        thumbnailUrl: 'https://img40.otodom.pl/images_otodompl/12551066_1_314x236_rev012.jpg'
      });

      expect(result.properties[2]).to.deep.equal({
        title: 'Okazja**Najtańsza duża kawalerka na Bródnie',
        location: 'Warszawa, Bródno, Piotra Wysockiego',
        added: '',
        price: 160000,
        offerUrl: 'https://otodom.pl/oferta/okazjanajtansza-duza-kawalerka-na-brodnie-ID33eZM.html',
        thumbnailUrl: 'https://img41.otodom.pl/images_otodompl/11050332_1_314x236_okazjanajtansza-duza-kawalerka-na-brodnie-warszawa.jpg'
      });

      expect(result.properties[3]).to.deep.equal({
        title: 'Ciszewska',
        location: 'Warszawa, Włochy, Ciszewska',
        added: '',
        price: 160000,
        offerUrl: 'https://otodom.pl/oferta/ciszewska-ID30Zsa.html',
        thumbnailUrl: 'https://img40.otodom.pl/images_otodompl/10100840_2_314x236_ciszewska-dodaj-zdjecia.jpg'
      });

      expect(result.properties[4]).to.deep.equal({
        title: 'Kawalerka na Bródnie!!!',
        location: 'Warszawa, Targówek, Piotra Wysockiego',
        added: '',
        price: 160000,
        offerUrl: 'https://otodom.pl/oferta/kawalerka-na-brodnie-ID30bHa.html',
        thumbnailUrl: 'https://img40.otodom.pl/images_otodompl/9792498_1_314x236_kawalerka-na-brodnie-warszawa_rev005.jpg'
      });
    });

    it('returns the number of pages and indicates that no more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.totalPages).to.equal(1);
      expect(result.moreResultsAvailable).to.be.false;
    });
  });

  context('multiple pages result', () => {
    beforeEach(() => {
      nock(url.protocol + '//' + url.host)
        .get(url.path)
        .reply(200, multiPageResponse);
    });

    it('fetches the Otodom listing page with given filters and returns a list of properties', async () => {
      const result = await fetchListingPage(filters);
      expect(result.properties).to.have.lengthOf(24);
    });

    it('returns the number of pages and indicates that more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.totalPages).to.equal(2);
      expect(result.moreResultsAvailable).to.be.true;
    });
  });
});