import { Component, Input, Output, EventEmitter } from '@angular/core';
import SearchResult from '../../../../core/src/search-result';

@Component({
  selector: 'app-search-result-table',
  templateUrl: 'search-result-table.component.html',
  styleUrls: ['search-result-table.component.scss']
})
export default class SearchResultTableComponent {
  @Input()
  result: SearchResult;

  @Input()
  page: number;

  @Output()
  pageChange = new EventEmitter();

  onPageChange(page: number) {
    this.pageChange.emit(page);
  }

  navigate(offerUrl: string): void {
    window.open(offerUrl);
  }
}