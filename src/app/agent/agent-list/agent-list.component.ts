import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { Agent } from 'src/app/interfaces/agent';

@Component({
  selector: 'agent-list',
  templateUrl: './agent-list.component.html',
  styleUrls: ['./agent-list.component.scss']
})
export class AgentListComponent {
  @Input() element: Agent[];
  @Input() displayedColumns;
  @Input() tableDataSource: MatTableDataSource<Agent[]>;
}
