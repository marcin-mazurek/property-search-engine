import { NgModule } from '@angular/core';
import { BrowserModule} from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '@angular/material';

import AppComponent from './app.component';
import FiltersComponent from './filters/filters.component';
import LayoutComponent from './layout/layout.component';

@NgModule({
  imports:      [BrowserModule, FormsModule, MaterialModule.forRoot()],
  declarations: [AppComponent, FiltersComponent, LayoutComponent],
  bootstrap:    [AppComponent]
})
export class AppModule { }
