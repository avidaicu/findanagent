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

  @Output() agentSelect = new EventEmitter();

  agentSearch = new FormControl();

  heading: string;
  countries$;
  filteredOptions: Observable<Country[]>;
  countries: Country[] = [];

  constructor(private countryService: CountryService) {
    this.countries$ = this.countryService.getCountries();
  }

  ngOnInit(){

    // Show a default country
    this.agentSearch.patchValue('China PRC');
    // this.heading = 'China PRC';

    // this.agentService.getAgents(44)
    // .subscribe(agents => {
    //   this.toggleVisibility = true;
    //   this.agents = agents;
    //   // this.initializeTable(agents);
    // });

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
