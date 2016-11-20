import Property from '../../../../src/core/property';
import { load as parseHtml } from 'cheerio';
import parseListingPrice from './parse-listing-price';

export default function parsePageResponse(html: string): Property[] {
  const $ = parseHtml(html);
  const offers = $('#offers_table td.offer, #offers_table td.recommended-distance-with-ads');

  let properties: Property[] = [];

  offers.each((index, offerDomElement) => {
    const offer = $(offerDomElement);

    // Stop iterating through offers if listing is showing offers outside of specified area
    if (offer.is('.recommended-distance-with-ads')) {
      return false;
    }
    
    properties.push({
      title: offer.find('a strong').text().trim(),
      location: offer.find('small span').text().trim(),
      additionDate: offer.find('.color-9.lheight16.marginbott5.x-normal').text().trim(), // TODO
      price: parseListingPrice(offer.find(".price").text().trim()),
      thumbnailUrl: offer.find('img.fleft').attr('src')
    });
  });

  return properties;
}