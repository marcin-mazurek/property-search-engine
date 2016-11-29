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
  result: Observable<SearchResult>;

  constructor(private searchService: SearchService) { }

  onSubmit(properties: any) {
    this.result = this.searchService.search(properties);
  }
}