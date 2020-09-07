import { Component, OnInit, OnDestroy} from '@angular/core';
import { Agent } from './interfaces/agent';
import { Subscription } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { AgentService } from './services/agent.service';

import { PageEvent } from '@angular/material/paginator';

@Component({
  selector: 'app-agents',
  templateUrl: './agents.component.html',
  styleUrls: ['./agents.component.scss']
})
export class AgentsComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  heading: string;
  agentList: Agent[] = [];
  pagedList: Agent[] = [];

  agent: Agent[] = [];

  // Pagination
  pageEvent: PageEvent;

  length: number = 0;
  pageIndex:number = 0;
  pageSize: number = 12;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  displayedColumns: string[] = ['Name', 'Address', 'Contact Name', 'URL'];

  isTable: boolean = true;
  showLoadingBar: boolean = false;

  constructor(
    private agentService: AgentService) {
  }

  ngOnInit() {
    this.showLoadingBar = true;

    // Show a default country
    this.heading = 'China PRC';

    this.agentService.getAgents(44)
    .subscribe(agents => {
      this.agentsInit(agents); // Initializing data-table here
    });
  }

  toggleDisplay(change: MatButtonToggleChange){
    this.isTable = change.value;
  }

  onAgentCountrySelect(option) {
    this.heading = option.Country;
    this.showLoadingBar = true;

    this.subscription = this.agentService.getAgents(option.Id)
      .subscribe(agents => {
        this.agentsInit(agents); // Initializing data-table here
    });
  }

  agentsInit(agents){
    this.agentList = agents;
    //let numberCheckRegex = /\d+/;
    this.showLoadingBar = false;
    this.pagedList = this.agentList.slice(0, 12);
    this.length = this.agentList.length;
  }

  onPageChange(event?:PageEvent){
    let startIndex = event.pageIndex * event.pageSize;
    let endIndex = startIndex + event.pageSize;
    if(endIndex > this.length){
      endIndex = this.length;
    }
    this.pagedList = this.agentList.slice(startIndex, endIndex);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
    // Still to do: Any other observables that need unsubscribing?
  }

}
