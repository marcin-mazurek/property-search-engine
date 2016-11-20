import { Category, Type, Market } from '../../core/filters';

export default {
  properties: {
    category: {
      description: 'Category - sale, rental or exchange',
      default: 'sale',
      before: value => {
        if (value === 'rental') return Category.Rental;
        if (value === 'exchange') return Category.Exchange;
        return Category.Sale;
      }
    },
    type: {
      description: 'Property type - apartment, house or room (rental only)',
      default: 'apartment',
      before: value => {
        if (value === 'house') return Type.House;
        if (value === 'room') return Type.Room;
        return Type.Apartment;
      },
    },
    location: {
      description: 'Location - city name',
      type: 'string',
      required: true
    },
    market: {
      description: 'Market type - any, primary or secondary',
      default: 'any',
      before: value => {
        if (value === 'primary') return Market.Primary;
        if (value === 'secondary') return Market.Secondary;
        return 0;
      }
    },
    priceFrom: {
      description: 'Price from',
      type: 'number',
    },
    priceTo: {
      description: 'Price to',
      type: 'number',
    },
    areaFrom: {
      description: 'Area from (in m2)',
      type: 'number',
    },
    areaTo: {
      description: 'Area to (in m2)',
      type: 'number',
    }
  }
};