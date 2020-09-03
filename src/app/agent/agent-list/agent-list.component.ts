import { element } from 'protractor';
import { Component, Input } from '@angular/core';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {
  // @Input() element;
  // @Input() dataSource;

  // displayedColumns: string[] = ['Name', 'Addr1', 'ContactName', 'URL'];

  // private initializeTable(agents: Agent[]) {
  //   this.tableDataSource = new MatTableDataSource(agents);
  //   this.tableDataSource.paginator = this.paginator;
  // }

}
