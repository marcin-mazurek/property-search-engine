import Filters, { Type, Category } from '../../../../core/src/filters';
import getCityList from './get-city-list';
import { findKey } from 'lodash';

export default async function buildCategoryLocationPageSegment(
  filters: Filters, page: number
) : Promise<string> {
  const isHouseOrApartment = (filters.type === Type.Apartment || filters.type === Type.House);
  const isRoom = (filters.type === Type.Room);
  const isSale = (filters.category === Category.Sale);
  const isRental = (filters.category === Category.Rental);
  
  const cities = await getCityList();
  const cityId = findKey(cities, city => city === filters.location);

  if (!cityId) {
    throw new Error('City not found');
  }

  const pagePrefix = filters.type === Type.Room ? 'p' : 'a1dwp';
  let categoryCode;

  if (isHouseOrApartment && isSale) {
    categoryCode = 'v1c9073l';
  } else if (isHouseOrApartment && isRental) {
    categoryCode = 'v1c9008l';
  } else if (isRoom && isRental) {
    categoryCode = 'v1c9000l';
  } else if (isRoom && isSale) {
    throw new Error("Invalid combination of filters - room and sale");
  }

  return categoryCode + cityId + pagePrefix + page;
}