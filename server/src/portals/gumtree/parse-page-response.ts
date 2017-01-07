import SinglePageSearchResult from '../../../../core/src/single-page-search-result';
import Property from '../../../../core/src/property';
import { load as parseHtml } from 'cheerio';
import parseListingPrice from '../shared/parse-listing-price';

const host = 'https://www.gumtree.pl';

export default function parsePageResponse(html: string): SinglePageSearchResult {
  const $ = parseHtml(html);
  const offers = $('.view:not(.top-listings)').eq(0).find('> ul > li');
  const properties: Property[] = [];

  offers.each((index, offerDomElement) => {
    const offer = $(offerDomElement);
    const thumbnail = offer.find('#img-cnt img');
    let thumbnailUrl = thumbnail.attr('src') || null;

    if (thumbnailUrl === 'https://securet9.classistatic.com/1.1.336/images//loading.gif') {
      thumbnailUrl = thumbnail.attr('data-src') || null;
    }

    properties.push({
      title: offer.find('.title').text().trim(),
      location: offer.find('.category-location').text().split(' , ')[1].trim(),
      added: offer.find('.creation-date').text().trim(),
      price: parseListingPrice(offer.find('.amount').text().trim()),
      offerUrl: decodeURIComponent(host + offer.find('.href-link').attr('href').trim()),
      thumbnailUrl
    });
  });

  const perPageCount = Number(
    $('.pagination-results-count')
      .text()
      .split(' do ')[1]
      .split(' z ')[0]
      .replace(new RegExp(',', 'g'), '')
  );
  const totalCount = Number(
    $('.pagination-results-count')
      .text()
      .split(' z ')[1]
      .split(' ogłoszeń')[0]
      .replace(new RegExp(',', 'g'), '')
  );
  const totalPages = Math.ceil(totalCount / perPageCount);

  return {
    properties,
    moreResultsAvailable: $('.pagination .after a').length > 0,
    totalPages
  };
}