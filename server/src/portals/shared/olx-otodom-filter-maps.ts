import { Category, Market } from '../../../../core/src/filters';

export const CategoryMap = {
  [Category.Rental]: 'wynajem',
  [Category.Sale]: 'sprzedaz',
  [Category.Exchange]: 'zamiana'
};

export const MarketMap = {
  [Market.Primary]: 'primary',
  [Market.Secondary]: 'secondary'
};