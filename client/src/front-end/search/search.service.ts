import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import Filters from '../../../../core/src/filters';
import PaginatedSearchResult from '../../../../core/src/paginated-search-result';

import 'rxjs/add/operator/toPromise';

@Injectable()
export default class SearchService {
  private url = 'http://localhost:3001/search';

  constructor(private http: Http) { }

  search(filters: Filters, page: number): Promise<PaginatedSearchResult> {
    const search = new URLSearchParams();
    Object.keys(filters)
      .forEach(key => search.append(key, filters[key]));
    search.append('page', page.toString());

    return this.http.get(this.url, { search })
      .toPromise()
      .then(response => response.json() as PaginatedSearchResult);
  }
}