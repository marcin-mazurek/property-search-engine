import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import Filters, { Category, Type } from '../../../../core/src/filters';
import PaginatedSearchResult from '../../../../core/src/paginated-search-result';
import SearchService from './search.service';
import FiltersService from './filters.service';
import preloadImages from '../helpers/preload-images';

@Component({
  selector: 'app-layout',
  templateUrl: 'search.component.html',
  styleUrls: ['search.component.scss']
})
export default class SearchComponent {
  result: PaginatedSearchResult;

  loading: boolean = false;

  error: boolean = false;

  filters: Filters;

  constructor(private searchService: SearchService, private filtersService: FiltersService) {
    this.filters = this.filtersService.getInitialValue();
  }

  page: number = 1;

  async onSearchSubmit(filters: Filters): Promise<void> {
    this.filters = filters;
    this.page = 1;
    this.fetchResults();
    this.filtersService.save(filters);
  }

  async onPageChange(page: number): Promise<void> {
    this.page = page;
    this.fetchResults();
  }

  async fetchResults() {
    this.loading = true;
    this.error = false;

    try {
      const result = await this.searchService.search(this.filters, this.page);

      const imageSources = result.properties
        .map(property => property.thumbnailUrl)
        .filter(image => image !== null);
      await preloadImages(imageSources);
      
      this.result = result;
    } catch (e) {
      this.result = undefined;
      this.error = true;
    } finally {
      this.loading = false;
    }
  }
}