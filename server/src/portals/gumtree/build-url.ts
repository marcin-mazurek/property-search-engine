import Filters, { Type, Category } from '../../../../core/src/filters';
import URLBuilder from '../../../../core/src/url-builder';
import slugify from '../shared/slugify';
import buildCategoryLocationPageSegment from './build-category-location-page-segment';
import buildQueryString from './build-query-string';

const basePath = 'https://www.gumtree.pl';

export default async function buildUrl(filters: Filters, page: number) : Promise<string> {
  const url = new URLBuilder(basePath);

  filters.type = Number(filters.type);
  filters.category = Number(filters.category);

  if (filters.type === Type.Apartment || filters.type === Type.House) {
    url.addSegment('s-mieszkania-i-domy-sprzedam-i-kupie');
  } else if (filters.type === Type.Room) {
    url.addSegment('s-pokoje-do-wynajecia');
  } else {
    throw new Error('Property type not supported');
  }

  url.addSegment(slugify(filters.location));

  if (filters.type === Type.Apartment) {
    url.addSegment('mieszkanie');
  } else if (filters.type === Type.House) {
    url.addSegment('dom');
  }

  if (page > 1) {
    url.addSegment(`page-${page}`);
  }

  const categoryLocationPageSegment = await buildCategoryLocationPageSegment(filters, page);
  url.addSegment(categoryLocationPageSegment);
  url.addQueryStringParts(buildQueryString(filters));

  return url.build();
}