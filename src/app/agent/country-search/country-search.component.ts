import { CountryService } from '../../services/country.service';
import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';
import { Country } from "../../interfaces/country";
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';

@Component({
  selector: 'country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})

export class CountrySearchComponent implements OnInit {

  /** Event Emitter when a country option is selected */
  @Output() agentSelect = new EventEmitter();

  agentSearch = new FormControl();

  countries$;
  filteredOptions: Observable<Country[]>;
  countries: Country[] = [];

  constructor(private countryService: CountryService) {
    this.countries$ = this.countryService.getCountries();
  }

  ngOnInit(){
    this.agentSearch.patchValue('China PRC');

    this.countryService.getCountries().subscribe(countries => {
      this.countries$ = countries;

      this.filteredOptions = this.agentSearch.valueChanges.pipe(
        startWith(''),
        map(value => this.filterCountries(value))
      );
    });
  }

  filterCountries(country: string): Country[] {
    return this.countries$.filter((option: Country) =>
      option.Country.toLowerCase().indexOf(country.toLowerCase()) === 0);
  }

  onAgentSelect(option) {
    this.agentSelect.emit(option);
  }

}
