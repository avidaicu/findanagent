import { DataService } from './../../shared/data.service';
import { Component, OnInit } from '@angular/core';
import {FormControl} from '@angular/forms';

import { Agent } from "./../../shared/agent";
import { Country } from "./../../shared/country";


@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit {

  myControl = new FormControl();

  allAgents: Agent[];
  allAgentsCountries: Country[];
  // selectedAgentCountryId: Agent;

  constructor(private dataService: DataService) {}

  ngOnInit(): void {
    this.dataService.getAllAgents()
    .subscribe(
      (data: Agent[]) => this.allAgents = data,
      (err: any) => console.log(err),
      () => console.log('All done getting agents.')
    );

    this.dataService.getAllAgentsCountries()
    .subscribe(
      (data: Country[]) => this.allAgentsCountries = data,
      (err: any) => console.log(err),
      () => console.log('All done getting countries.')
    );

    // let agentCountryId: number = parseInt(this.route.snapshot.params['id']);

    // this.dataService.getAgentCountryId(agentCountryId)
    // .subscribe(
    //   (data: Agent) => this.selectedAgentCountryId = data,
    //   (err: any) => console.log(err)
    // );
  }

}
