import { AgentService } from '../../services/agent.service';
import { CountryService } from './../../services/country.service';

import { Component} from '@angular/core';
import {FormControl} from '@angular/forms';

import { Country } from "../../interfaces/country";
import { Agent } from "./../../interfaces/agent";

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {

  agentCountrySearch = new FormControl();

  countries$;
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  country: string;

  constructor(
    private agentService: AgentService,
    private countryService: CountryService) {

    this.countries$ = this.countryService.getCountries();
  }

  displayAgents(agentCountryId: number, agentCountry: string) {
    this.agentService.getAgents(agentCountryId)
      .subscribe(agents => {
        this.agents = agents;

        // Set the filteredAgents array
        this.filteredAgents = (agentCountry) ? this.agents.filter(a => a.Country === agentCountry) : this.agents;
    });
  }

}
