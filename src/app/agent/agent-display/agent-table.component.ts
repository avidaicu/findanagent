import { Component, Input} from '@angular/core';

@Component({
  selector: 'agent-table',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss']
})
export class AgentTableComponent {

  @Input() tableColumns;
  @Input() agentTable;
  @Input() item; // console.log(this.item);

}
