import Filters, { Category, Market, Type } from '../../../../core/src/filters';

const categoryMap = {
  rental: Category.Rental,
  sale: Category.Sale,
  exchange: Category.Exchange
};

const typeMap = {
  apartment: Type.Apartment,
  house: Type.House,
  Room: Type.Room
};

const marketMap = {
  primary: Market.Primary,
  secondary: Market.Secondary
};

export default function buildFilters(params: any): Filters {
  const category = categoryMap[params.category];
  if (!category) {
    throw new Error('Invalid category param');
  }

  const type = typeMap[params.type];
  if (!type) {
    throw new Error('Invalid type param');
  }

  const market = marketMap[params.market] || null;

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