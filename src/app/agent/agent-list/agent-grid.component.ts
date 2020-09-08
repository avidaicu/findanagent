import { Agent } from './../../interfaces/agent';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'agent-grid',
  templateUrl: './agent-grid.component.html',
  styleUrls: ['./agent-grid.component.scss']
})
export class AgentGridComponent implements OnInit{
  @Input() agent: Agent;

  validURL = false;

  ngOnInit() {
    // Check for at least one dot in URL
    if (this.agent.URL.indexOf('.') > -1) {
      this.validURL = true;
    }
  }

}
