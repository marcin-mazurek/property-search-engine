export enum Category { Rental = 1, Sale = 2, Exchange = 3 }

export enum Type { Apartment = 1, House = 2, Room = 3 }

export enum Market { Primary = 1, Secondary = 2 }

interface Filters {
  category: Category,
  type: Type,
  location: string,
  market?: Market,
  priceFrom?: number,
  priceTo?: number,
  areaFrom?: number,
  areaTo?: number,
  excludeKeyword?: string
}

export default Filters;