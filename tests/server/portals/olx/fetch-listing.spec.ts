import Filters, { Category, Type } from '../../../../src/core/filters';
import * as nock from 'nock';
import { parse } from 'url';
import buildUrl from '../../../../src/server/portals/olx/build-url';
import fetchListing from '../../../../src/server/portals/olx/fetch-listing';
import olxResponse from '../../_fixtures/olx';
import { expect } from 'chai';

describe('fetchListing()', () => {
  it('fetches the OLX listing page with given filters and returns a list of properties excluding promoted and from other locations', async () => {
    const filters: Filters = {
      category: Category.Sale,
      type: Type.Apartment,
      location: 'Warszawa'
    };
    const url = parse(buildUrl(filters, 1));

    nock(url.protocol + '//' + url.host)
      .get(url.path)
      .reply(200, olxResponse);

    const properties = await fetchListing(filters);

    expect(properties).to.have.lengthOf(6);

    expect(properties[0]).to.deep.equal({
      title: 'Mieszkanie, 19 m², Warszawa',
      location: 'Warszawa, Ochota',
      additionDate: '18  lis',
      price: 141000,
      thumbnailUrl: 'https://olxpl-ring11.akamaized.net/images_tablicapl/454635397_1_261x203_mieszkanie-19-m-warszawa-warszawa.jpg'
    });
    
    expect(properties[1]).to.deep.equal({
      title: 'mieszkanie w prestiżowej lokalizacji ul. Al. Jerozolimskie',
      location: 'Warszawa, Śródmieście',
      additionDate: '17  lis',
      price: 230000,
      thumbnailUrl: 'https://olxpl-ring09.akamaized.net/images_tablicapl/439334925_4_261x203_mieszkanie-w-prestizowej-lokalizacji-ul-al-jerozolimskie-nieruchomosci.jpg'
    });

    expect(properties[2]).to.deep.equal({
      title: 'Mieszkanie 18m2, Ochota, ul. Wiślicka',
      location: 'Warszawa, Ochota',
      additionDate: '16  lis',
      price: 199000,
      thumbnailUrl: 'https://olxpl-ring03.akamaized.net/images_tablicapl/430517783_1_261x203_mieszkanie-18m2-ochota-ul-wislicka-warszawa.jpg'
    });

    expect(properties[3]).to.deep.equal({
      title: 'Śliczna Kawalerka w Centrum ul. Spiska',
      location: 'Warszawa, Śródmieście',
      additionDate: '15  lis',
      price: 235000,
      thumbnailUrl: 'https://olxpl-ring11.akamaized.net/images_tablicapl/453616139_7_261x203_sliczna-kawalerka-w-centrum-ul-spiska-_rev001.jpg'
    });

    expect(properties[4]).to.deep.equal({
      title: 'WYKOŃCZONE _1/2 pokoje na start lub Inwestycja',
      location: 'Warszawa, Śródmieście',
      additionDate: '10  lis',
      price: 194000,
      thumbnailUrl: 'https://olxpl-ring02.akamaized.net/images_tablicapl/451171887_1_261x203_wykonczone-1-2-pokoje-na-start-lub-inwestycja-warszawa.jpg'
    });

    expect(properties[5]).to.deep.equal({
      title: 'Piękne mieszkanie Warszawa Mokotów / Śródmieście',
      location: 'Warszawa, Mokotów',
      additionDate: '26  paź',
      price: 246000,
      thumbnailUrl: 'https://olxpl-ring09.akamaized.net/images_tablicapl/445158369_1_261x203_piekne-mieszkanie-warszawa-mokotow-srodmiescie-warszawa_rev091.jpg'
    });
  });
});