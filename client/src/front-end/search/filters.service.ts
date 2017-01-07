import { Injectable } from '@angular/core';
import Filters, { Category, Type } from '../../../../core/src/filters';

const defaultFilters = {
  category: Category.Sale,
  type: Type.Apartment,
  location: '',
  excludeKeyword: ''
};

const key = 'filters';

@Injectable()
export default class FiltersService {
  getInitialValue(): Filters {
    const lastFilters = localStorage.getItem(key);

    if (!lastFilters) {
      return defaultFilters;
    }

    try {
      return JSON.parse(lastFilters);
    } catch (e) {
      return defaultFilters;
    }
  }
  
  save(filters: Filters): void {
    localStorage.setItem(key, JSON.stringify(filters));
  }
}