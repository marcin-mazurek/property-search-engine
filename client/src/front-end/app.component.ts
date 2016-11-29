import { Component, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'property-search',
  template: `
    <app-layout></app-layout>
  `,
  styleUrls: ['app.component.scss'],
  encapsulation: ViewEncapsulation.None // use global CSS for styling
})
export default class AppComponent { }