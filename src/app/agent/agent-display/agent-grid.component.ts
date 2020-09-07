import { Component, Input } from '@angular/core';

@Component({
  selector: 'agent-grid',
  templateUrl: './agent-grid.component.html',
  styleUrls: ['./agent-grid.component.scss']
})
export class AgentGridComponent {
  @Input() agent;

}
