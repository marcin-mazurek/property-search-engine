import Filters, { Category, Market, Type } from '../../../../core/src/filters';

export default function buildFilters(params: any): Filters {
  const category = <Category>params.category;

  if (!category) {
    throw new Error('Invalid category param');
  }

  const type = <Type>params.type;
  if (!type) {
    throw new Error('Invalid type param');
  }

  const market = <Market>params.market || null;

  return {
    category: category,
    type: type,
    market: market,
    location: params.location,
    priceFrom: Number(params.priceFrom),
    priceTo: Number(params.priceTo),
    areaFrom: Number(params.areaFrom),
    areaTo: Number(params.areaTo)
  };
}