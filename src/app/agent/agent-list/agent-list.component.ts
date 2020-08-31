import { AgentService } from '../../services/agent.service';
import { CountryService } from './../../services/country.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Agent } from "./../../interfaces/agent";
import { Country } from './../../interfaces/country';
import { Observable } from 'rxjs';
import { map, startWith, tap } from 'rxjs/operators';
import {MatTableDataSource} from '@angular/material/table';
import {MatPaginator} from '@angular/material/paginator';

import {PageEvent} from '@angular/material/paginator';

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

  showMyContainer: boolean = false;
  isShow: boolean = false;

  displayedColumns: string[] = ['Name', 'Addr1', 'ContactName', 'URL'];
  @ViewChild(MatPaginator, {static: false}) paginator: MatPaginator;
  // tableDataSource: MatTableDataSource<any>;
  tableDataSource: MatTableDataSource<Agent>;

  // MatPaginator Inputs
  // length = 100;
  // pageIndex = 0;
  // pageSize = 10;
  // pageSizeOptions: [1, 2, 5, 10];

  // MatPaginator Output
  pageEvent: PageEvent;

  constructor(
    private agentService: AgentService,
    private countryService: CountryService) {
  }

  // onPageChange(e: PageEvent) {
  //   console.log(e);
  //   this.pageIndex = e.pageIndex;
  //   this.pageSize = e.pageSize;
  //   this.loadData(this.pageIndex, this.pageSize);
  // }

  ngOnInit(){
    this.isShow = true;

    this.countryService.getCountries().subscribe(countries => {
      this.countries$ = countries;

      this.filteredOptions = this.agentSearch.valueChanges.pipe(
        startWith(''),
        map(value => this.filterCountries(value))
      );
    });
  }

  // loadData(pageIndex, pageSize) {
  //   this.tableDataSource = new MatTableDataSource<object>(this.agents.slice(pageIndex, pageIndex + pageSize));
  // }

  filterCountries(country: string): Country[] {
    return this.countries$.filter((option: Country) =>
      option.Country.toLowerCase().indexOf(country.toLowerCase()) === 0);
  }

  onAgentCountrySelect(agentCountryId: number) {
    this.isShow = false;
    // this.showMyContainer = false;

    this.agentService.getAgents(agentCountryId)
      .subscribe(agents => {
        this.agents = agents;
        this.tableDataSource = new MatTableDataSource(agents);
        this.tableDataSource.paginator = this.paginator;

        // this.loadData(0, this.pageSize);
    });
  }


}
