export enum Category { Rental, Sale, Exchange }

export enum Type { Apartment, House, Room }

export enum Market { Any, Primary, Secondary }

interface Filters {
  category: Category,
  type: Type,
  location: string,
  priceFrom?: number,
  priceTo?: number,
  areaFrom?: number,
  areaTo?: number,
  market?: Market,
  excludeKeyword?: string
}

export default Filters;