import { Component, OnInit, OnDestroy } from '@angular/core';
import { Agent } from './interfaces/agent';
import { Subscription } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
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

  // Pagination
  pageEvent: PageEvent;

  length: number = 0;
  pageIndex:number = 0;
  pageSize: number = 12;
  pageSizeOptions: number[] = [3, 6, 9, 12];

  displayedColumns: string[] = ['Name', 'Addr1', 'ContactName', 'URL'];
  element;
  tableDataSource;

  toggle: boolean = true;
  toggleVisibility: boolean = false;
  showLoadingBar: boolean = false;

  constructor(
    private agentService: AgentService) {
  }

  ngOnInit() {
    this.toggleVisibility = false;
    this.showLoadingBar = true;

    // Show a default country
    this.heading = 'China PRC';

    this.agentService.getAgents(44)
    .subscribe(agents => {
      this.agentList = agents;

      this.toggleVisibility = true;
      this.showLoadingBar = false;

      this.pagedList = this.agentList.slice(0, 12);
      this.length = this.agentList.length;

      this.tableDataSource = new MatTableDataSource(agents);

    });
  }

  toggleView(change: MatButtonToggleChange){
    this.toggle = change.value;
  }

  onAgentCountrySelect(option) {
    this.heading = option.Country;
    this.showLoadingBar = true;

    this.subscription = this.agentService.getAgents(option.Id)
      .subscribe(agents => {
        this.agentList = agents;

        this.toggleVisibility = true;
        this.showLoadingBar = false;

        this.pagedList = this.agentList.slice(0, 12);
        this.length = this.agentList.length;

        this.tableDataSource = new MatTableDataSource(agents);
    });
  }

  onPageChange(event?:PageEvent){
    console.log('event', event);
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
