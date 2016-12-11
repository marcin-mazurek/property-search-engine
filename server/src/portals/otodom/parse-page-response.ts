import SinglePageSearchResult from '../../../../core/src/single-page-search-result';
import Property from '../../../../core/src/property';
import { load as parseHtml } from 'cheerio';
import parseListingPrice from '../shared/parse-listing-price';
import parseThumbnailCss from './parse-thumbnail-css';
import parseLocation from './parse-location';
import cleanUrl from '../../../../core/src/clean-url';

export default function parsePageResponse(html: string): SinglePageSearchResult {
  const $ = parseHtml(html);
  const offers = $('.col-md-content').eq(0).find('.offer-item:not([data-featured-name="promo_top_ads"])');
  const moreResultsAvailable = $('.pager [data-dir="next"]').length > 0;

  let properties: Property[] = [];

  offers.each((index, offerDomElement) => {
    const offer = $(offerDomElement);

    properties.push({
      title: offer.find('.offer-item-title').text().trim(),
      added: '', // TODO: fetch from page details
      price: parseListingPrice(offer.find('.offer-item-price').text().trim()),
      offerUrl: cleanUrl(offer.find('h3 a').attr('href')),
      location: parseLocation(offer.find('.offer-item-header p.text-nowrap').text()),
      thumbnailUrl: parseThumbnailCss(offer.find('.img-cover').attr('style'))
    });
  });


  return { properties, moreResultsAvailable };
}