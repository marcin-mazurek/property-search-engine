import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

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

  constructor(private searchService: SearchService) { }

  page: number = 1;

  async onSubmit(filters: any): Promise<void> {
    this.loading = true;
    this.result = await this.searchService.search(filters);
    this.loading = false;
  }

  navigate(offerUrl: string): void {
    window.open(offerUrl);
  }

  goToPage(page: number): void {
    this.page = page;
  }
}