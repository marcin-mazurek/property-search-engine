import { Category, Type, Market } from '../../../core/filters';

export const CategoryMap = {
  [Category.Rental]: 'wynajem',
  [Category.Sale]: 'sprzedaz',
  [Category.Exchange]: 'zamiana'
};

export const TypeMap = {
  [Type.Apartment]: 'mieszkania',
  [Type.House]: 'domy',
  [Type.Room]: 'stancje-pokoje'
};

export const MarketMap = {
  [Market.Primary]: 'primary',
  [Market.Secondary]: 'secondary'
};