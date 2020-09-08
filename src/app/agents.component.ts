// import { AgentTableComponent } from './agent/agent-list/agent-table.component';
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

  agent: Agent;
  item: Agent;

  tableColumnHeaders: string[] = ['Name', 'Address', 'Contact Name', 'URL'];

  isTable: boolean = true;
  showLoadingBar: boolean = false;

  // Pagination
  pageEvent: PageEvent;
  length: number = 0;
  pageIndex:number = 0;
  pageSize: number = 12;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  constructor(
    private agentService: AgentService) {
  }

  ngOnInit() {
    this.showLoadingBar = true;

    // Show a default country
    this.heading = 'China PRC';

    this.agentService.getAgents(44)
    .subscribe(agents => {
      this.agentsInit(agents);
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
        this.agentsInit(agents);
    });
  }

  agentsInit(agents){
    this.agentList = agents;
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
    // Still to do: Check all observable subscriptions and unsubscribe if needed.
  }

}
