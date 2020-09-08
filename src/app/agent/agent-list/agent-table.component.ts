import { Agent } from './../../interfaces/agent';
import { Component, Input, OnInit} from '@angular/core';

@Component({
  selector: '[agent-table]',
  templateUrl: './agent-table.component.html',
  styleUrls: ['./agent-table.component.scss']
})
export class AgentTableComponent implements OnInit{

  @Input() item: Agent;
  validURL = false;

  ngOnInit() {
    // Check for at least one dot in URL
    if (this.item.URL.indexOf('.') > -1) {
      this.validURL = true;
    }
  }
}
