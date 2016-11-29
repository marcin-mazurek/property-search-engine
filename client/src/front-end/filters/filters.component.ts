import { Component, Output, EventEmitter } from '@angular/core';
import Filters, { Category, Type, Market } from '../../../../core/src/filters';

@Component({
  selector: 'app-filters',
  templateUrl: 'filters.component.html',
  styleUrls: ['filters.component.scss']
})
export default class FiltersComponent {
  @Output()
  submit = new EventEmitter<Filters>();

  onSubmit() {
    this.submit.emit(this.model);
  }

  model: Filters = {
    category: Category.Sale,
    type: Type.Apartment,
    market: null,
    location: 'Warszawa',
    excludeKeyword: 'tbs'
  };

  categoryOptions = [
    { label: 'Sale', value: Category.Sale },
    { label: 'Rental', value: Category.Rental },
    { label: 'Exchange', value: Category.Exchange }
  ];

  typeOptions = [
    { label: 'Apartment', value: Type.Apartment },
    { label: 'House', value: Type.House },
    { label: 'Room', value: Type.Room }
  ];

  marketOptions = [
    { label: 'Any', value: null },
    { label: 'Primary', value: Market.Primary },
    { label: 'Secondary', value: Market.Secondary }
  ];
}