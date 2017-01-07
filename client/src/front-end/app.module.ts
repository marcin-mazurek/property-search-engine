import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';
import { MaterialModule } from '@angular/material';

import AppComponent from './app.component';
import FiltersComponent from './filters/filters.component';
import SearchComponent from './search/search.component';
import SearchResultTableComponent from './search-result-table/search-result-table.component';
import SearchService from './search/search.service';
import FiltersService from './search/filters.service';

@NgModule({
  imports:      [BrowserModule, FormsModule, HttpModule, MaterialModule.forRoot()],
  declarations: [AppComponent, FiltersComponent, SearchComponent, SearchResultTableComponent],
  bootstrap:    [AppComponent],
  providers:    [SearchService, FiltersService]
})
export class AppModule { }
