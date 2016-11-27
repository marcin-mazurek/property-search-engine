import SearchResult from '../../../../src/core/search-result';
import Property from '../../../../src/core/property';
import { load as parseHtml } from 'cheerio';
import parseListingPrice from './parse-listing-price';
import cleanUrl from '../../../../src/core/clean-url';

export default function parsePageResponse(html: string): SearchResult {
  const $ = parseHtml(html);
  const offers = $('#offers_table td.offer, #offers_table td.recommended-distance-with-ads');
  const moreResultsAvailable = $('.pager .next').length > 0;

  let properties: Property[] = [];

  offers.each((index, offerDomElement) => {
    const offer = $(offerDomElement);

    // Stop iterating through offers if listing is showing offers outside of specified area
    if (offer.is('.recommended-distance-with-ads')) {
      return false;
    }
    
    properties.push({
      title: offer.find('h3 a strong').text().trim(),
      location: offer.find('small span').text().trim(),
      added: offer.find('.color-9.lheight16.marginbott5.x-normal').text().trim(), // TODO: parse date to Date object
      price: parseListingPrice(offer.find(".price").text().trim()),
      offerUrl: cleanUrl(offer.find('h3 a').attr('href')),
      thumbnailUrl: offer.find('img.fleft').attr('src')
    });
  });


  return { properties, moreResultsAvailable };
}