import Filters, { Category, Type } from '../../../../core/src/filters';
import * as nock from 'nock';
import { parse } from 'url';
import buildUrl from '../../../../server/src/portals/olx/build-url';
import fetchListingPage from '../../../../server/src/portals/olx/fetch-listing-page';
import olxSinglePageResponse from '../../_fixtures/olx-single-page';
import olxMultiPageResponse from '../../_fixtures/olx-multi-page';
import { expect } from 'chai';

const filters: Filters = {
  category: Category.Sale,
  type: Type.Apartment,
  location: 'Warszawa'
};

const url = parse(buildUrl(filters, 1));

describe('fetchListingPage() for OLX', () => {
  context('one page result', () => {
    beforeEach(() => {
      nock(url.protocol + '//' + url.host)
        .get(url.path)
        .reply(200, olxSinglePageResponse);
    });

    it('fetches the OLX listing page with given filters and returns a list of properties excluding promoted and from other locations', async () => {
      const result = await fetchListingPage(filters);

      expect(result.properties).to.have.lengthOf(6);

      expect(result.properties[0]).to.deep.equal({
        title: 'Mieszkanie, 19 m², Warszawa',
        location: 'Warszawa, Ochota',
        added: '18  lis',
        price: 141000,
        offerUrl: 'https://otodom.pl/oferta/mieszkanie-19-m-warszawa-ID37R00.html',
        thumbnailUrl: 'https://olxpl-ring11.akamaized.net/images_tablicapl/454635397_1_261x203_mieszkanie-19-m-warszawa-warszawa.jpg'
      });
      
      expect(result.properties[1]).to.deep.equal({
        title: 'mieszkanie w prestiżowej lokalizacji ul. Al. Jerozolimskie',
        location: 'Warszawa, Śródmieście',
        added: '17  lis',
        price: 230000,
        offerUrl: 'https://olx.pl/oferta/mieszkanie-w-prestizowej-lokalizacji-ul-al-jerozolimskie-CID3-IDi6Fcf.html',
        thumbnailUrl: 'https://olxpl-ring09.akamaized.net/images_tablicapl/439334925_4_261x203_mieszkanie-w-prestizowej-lokalizacji-ul-al-jerozolimskie-nieruchomosci.jpg'
      });

      expect(result.properties[2]).to.deep.equal({
        title: 'Mieszkanie 18m2, Ochota, ul. Wiślicka',
        location: 'Warszawa, Ochota',
        added: '16  lis',
        price: 199000,
        offerUrl: 'https://otodom.pl/oferta/mieszkanie-18m2-ochota-ul-wislicka-ID355Xe.html',
        thumbnailUrl: 'https://olxpl-ring03.akamaized.net/images_tablicapl/430517783_1_261x203_mieszkanie-18m2-ochota-ul-wislicka-warszawa.jpg'
      });

      expect(result.properties[3]).to.deep.equal({
        title: 'Śliczna Kawalerka w Centrum ul. Spiska',
        location: 'Warszawa, Śródmieście',
        added: '15  lis',
        price: 235000,
        offerUrl: 'https://olx.pl/oferta/sliczna-kawalerka-w-centrum-ul-spiska-CID3-IDiKtMP.html',
        thumbnailUrl: 'https://olxpl-ring11.akamaized.net/images_tablicapl/453616139_7_261x203_sliczna-kawalerka-w-centrum-ul-spiska-_rev001.jpg'
      });

      expect(result.properties[4]).to.deep.equal({
        title: 'WYKOŃCZONE _1/2 pokoje na start lub Inwestycja',
        location: 'Warszawa, Śródmieście',
        added: '10  lis',
        price: 194000,
        offerUrl: 'https://otodom.pl/oferta/wykonczone-1-2-pokoje-na-start-lub-inwestycja-ID37uwU.html',
        thumbnailUrl: 'https://olxpl-ring02.akamaized.net/images_tablicapl/451171887_1_261x203_wykonczone-1-2-pokoje-na-start-lub-inwestycja-warszawa.jpg'
      });

      expect(result.properties[5]).to.deep.equal({
        title: 'Piękne mieszkanie Warszawa Mokotów / Śródmieście',
        location: 'Warszawa, Mokotów',
        added: '26  paź',
        price: 246000,
        offerUrl: 'https://otodom.pl/oferta/piekne-mieszkanie-warszawa-mokotow-srodmiescie-ID36PFG.html',
        thumbnailUrl: 'https://olxpl-ring09.akamaized.net/images_tablicapl/445158369_1_261x203_piekne-mieszkanie-warszawa-mokotow-srodmiescie-warszawa_rev091.jpg'
      });
    });

    it('indicates that no more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.moreResultsAvailable).to.be.false;
    });
  });

  context('multiple pages result', () => {
    beforeEach(() => {
      nock(url.protocol + '//' + url.host)
        .get(url.path)
        .reply(200, olxMultiPageResponse);
    });

    it('fetches the OLX listing page with given filters and returns a list of properties', async () => {
      const result = await fetchListingPage(filters);
      expect(result.properties).to.have.lengthOf(39);
    });

    it('indicates that more results are available', async () => {
      const result = await fetchListingPage(filters);
      expect(result.moreResultsAvailable).to.be.true;
    });
  });
});