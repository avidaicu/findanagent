import { Component, OnInit, OnDestroy, ViewChild } from '@angular/core';
import { Agent } from './interfaces/agent';
import { FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MatButtonToggleChange } from '@angular/material/button-toggle';
import { MatTableDataSource } from '@angular/material/table';
import { AgentService } from './services/agent.service';
import { CountryService } from './services/country.service';
import { PageEvent, MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy{

  subscription: Subscription;

  heading: string;
  agentList: Agent[] = [];
  pagedList: Agent[] = [];

  // Pagination
  pageEvent: PageEvent;

  length: number = 0;
  pageIndex:number = 0;
  pageSize: number = 12;  //displaying three cards each row
  pageSizeOptions: number[] = [3, 6, 9, 12];




  // @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // tableDataSource: MatTableDataSource<Agent>;

  toggle: boolean = true;
  toggleVisibility: boolean = false;

  showSpinner: boolean = false;

  constructor(
    private agentService: AgentService,
    private countryService: CountryService) {
  }

  ngOnInit() {
    this.toggleVisibility = false;
    this.showSpinner = true;

    // Show a default country
    this.heading = 'China PRC';

    this.agentService.getAgents(44)
    .subscribe(agents => {
      this.agentList = agents;

      this.toggleVisibility = true;
      this.showSpinner = false;

      this.pagedList = this.agentList.slice(0, 12);
      this.length = this.agentList.length;

    });

  }



  toggleView(change: MatButtonToggleChange){
    this.toggle = change.value;
  }

  onAgentCountrySelect(option) {
    this.heading = option.Country;
    this.showSpinner = true;

    this.subscription = this.agentService.getAgents(option.Id)
      .subscribe(agents => {
        this.agentList = agents;

        this.toggleVisibility = true;
        this.showSpinner = false;

        this.pagedList = this.agentList.slice(0, 12);
        this.length = this.agentList.length;

        // this.initializeTable(agents);


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

  // private initializeTable(agents: Agent[]) {
  //   this.tableDataSource = new MatTableDataSource(agents);
  //   this.tableDataSource.paginator = this.paginator;
  // }

    // Implementing ngOnDestroy() as we need the subscription to be there for the lifetime of this component because it's possible
  // that the user might have different windows open (such as one with a list of products and the other with the product edit window)
  // We want to ensure that the changes are refleting in realtime in both the windows
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
