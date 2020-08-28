import { AgentService } from '../../services/agent.service';
import { CountryService } from './../../services/country.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Agent } from "./../../interfaces/agent";
import { Country } from './../../interfaces/country';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  agentSearch = new FormControl();

  countries$;
  agents: Agent[] = [];
  filteredOptions: Observable<Country[]>;

  constructor(
    private agentService: AgentService,
    private countryService: CountryService) {
  }

  ngOnInit(){
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

  onAgentCountrySelect(agentCountryId: number, agentCountry: string) {
    this.agentService.getAgents(agentCountryId)
      .subscribe(agents => {
        this.agents = agents;
    });
  }

}
