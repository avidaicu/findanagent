import { CountryService } from '../../services/country.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Country } from "../../interfaces/country";


@Component({
  selector: 'country-search',
  templateUrl: './country-search.component.html',
  styleUrls: ['./country-search.component.scss']
})
export class CountrySearchComponent implements OnInit {

  agentCountrySearch = new FormControl();

  countries$;

  constructor(private countryService: CountryService) {
    this.countries$ = this.countryService.getCountries();
  }

  ngOnInit(): void {

  }

}
