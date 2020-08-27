import { AgentService } from '../../services/agent.service';
import { CountryService } from './../../services/country.service';

import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Country } from "../../interfaces/country";
import { Agent } from "./../../interfaces/agent";
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  // allAgents$: Agent[];
  agentCountrySearch = new FormControl();

  countries$;
  agents: Agent[] = [];
  filteredAgents: Agent[] = [];
  country: string;

  constructor(
    route: ActivatedRoute,
    private agentService: AgentService,
    private countryService: CountryService) {

    this.agentService.getAgents(2).subscribe(agents => {
      this.agents = agents;

      route.queryParamMap.subscribe(params => {
        this.country = params.get('country');

        // Set the filteredAgents array
        this.filteredAgents = (this.country) ?
          this.agents.filter(a => a.City === this.country) :
          this.agents;
      });
    });

    this.countries$ = this.countryService.getCountries();

    // this.agentService.getAgentCountryId(33)
    // .subscribe(params => {
    //   console.log('params', params);
    // });

  }

  // getAgents(Id) {
  //   console.log('Id', Id);
  // }

  ngOnInit(): void {
    // this.dataService.getAllAgents()
    // .subscribe((data: Agent[]) => this.allAgents = data);
  }

}
