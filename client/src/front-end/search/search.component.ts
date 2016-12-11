import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import Filters, { Category, Type } from '../../../../core/src/filters';
import SearchResult from '../../../../core/src/search-result';
import SearchService from './search.service';

@Component({
  selector: 'app-layout',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export default class SearchComponent {
  result: SearchResult;

  loading: boolean = false;

  filters: Filters = {
    category: Category.Sale,
    type: Type.Apartment,
    location: 'Warszawa',
    excludeKeyword: 'tbs'
  };

  constructor(private searchService: SearchService) { }

  page: number = 1;

  async onSearchSubmit(filters: Filters): Promise<void> {
    this.filters = filters;
    this.fetchResults();
  }

  async onPageChange(page: number): Promise<void> {
    this.page = page;
    this.fetchResults();
  }

  async fetchResults() {
    this.loading = true;
    this.error = false;

    try {
      this.result = await this.searchService.search(this.filters, this.page);
    } catch (e) {
      this.result = undefined;
      this.error = true;
    } finally {
      this.loading = false;
    }
  }
}