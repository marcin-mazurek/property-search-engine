import { Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs';

import Filters from '../../../../core/src/filters';
import SearchResult from '../../../../core/src/search-result';

@Injectable()
export default class SearchService {
  private url = 'http://localhost:3001/search';

  constructor(private http: Http) { }

  search(filters: Filters): Observable<SearchResult> {
    const params = new URLSearchParams();
    Object.keys(filters)
      .forEach(key => params.append(key, filters[key]));

    return this.http.get(this.url, { search: params })
      .map(response => response.json().data as SearchResult)
      .catch((e: any) => {
        console.error(e);
        return Observable.of<SearchResult>({ properties: [], moreResultsAvailable: false });
      });
  }
}