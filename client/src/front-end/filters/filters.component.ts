import { Component } from '@angular/core';
import Filters, { Category, Type, Market } from '../../../../core/src/filters';

@Component({
  moduleId: module.id,
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.css']
})
export default class FiltersComponent {
  model: Filters;

  categoryOptions: [
    { label: 'Sale', value: Category.Sale },
    { label: 'Rental', value: Category.Rental },
    { label: 'Exchange', value: Category.Exchange }
  ];

  typeOptions: [
    { label: 'Apartment', value: Type.Apartment },
    { label: 'House', value: Type.House },
    { label: 'Room', value: Type.Room }
  ];
  
  marketOptions: [
    { label: 'Any', value: null },
    { label: 'Primary', value: Market.Primary },
    { label: 'Secondary', value: Market.Secondary }
  ];
}