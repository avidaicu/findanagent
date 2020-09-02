import { AgentService } from '../../services/agent.service';
import { CountryService } from './../../services/country.service';
import { Component, OnInit, ViewChild, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Agent } from "./../../interfaces/agent";
import { Country } from './../../interfaces/country';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';
import {MatButtonToggleChange} from '@angular/material/button-toggle';
import { Subscription } from 'rxjs';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent implements OnInit, OnDestroy {

  subscription: Subscription;

  heading: string;

  agentSearch = new FormControl();

  countries$;
  agents: Agent[] = [];
  filteredOptions: Observable<Country[]>;
  countries: Country[] = [];

  toggle: boolean = true;
  toggleVisibility: boolean = false;

  toggleView(change: MatButtonToggleChange){
    this.toggle = change.value;
  }

  displayedColumns: string[] = ['Name', 'Addr1', 'ContactName', 'URL'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  tableDataSource: MatTableDataSource<Agent>;

  constructor(
    private agentService: AgentService,
    private countryService: CountryService) {
  }

  ngOnInit(){
    this.toggleVisibility = false;

    // Show a default country
    this.agentSearch.patchValue('China PRC');
    this.heading = 'China PRC';

    this.agentService.getAgents(44)
    .subscribe(agents => {
      this.toggleVisibility = true;
      this.agents = agents;
      this.initializeTable(agents);
    });

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

  onAgentCountrySelect(option) {
    this.heading = option.Country;
    this.subscription = this.agentService.getAgents(option.Id)
      .subscribe(agents => {
        this.toggleVisibility = true;
        this.agents = agents;
        this.initializeTable(agents);
    });
  }

  private initializeTable(agents: Agent[]) {
    this.tableDataSource = new MatTableDataSource(agents);
    this.tableDataSource.paginator = this.paginator;
  }

    // Implementing ngOnDestroy() as we need the subscription to be there for the lifetime of this component because it's possible
  // that the user might have different windows open (such as one with a list of products and the other with the product edit window)
  // We want to ensure that the changes are refleting in realtime in both the windows
  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
