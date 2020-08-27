import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Country } from "../../interfaces/country";


@Component({
  selector: 'agent-countries',
  templateUrl: './agent-countries.component.html',
  styleUrls: ['./agent-countries.component.scss']
})
export class AgentCountriesComponent implements OnInit {

  agentCountrySearch = new FormControl();

  countries$;

  constructor(private countryService: CountryService) {
    this.countries$ = this.countryService.getCountries();
  }

  ngOnInit(): void {

  }

}
