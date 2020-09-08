import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Component } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

// Material section
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatProgressBarModule} from '@angular/material/progress-bar';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { AgentTableComponent } from './agent/agent-list/agent-table.component';
import { AgentGridComponent } from './agent/agent-list/agent-grid.component';
import { CountrySearchComponent } from './agent/country-search/country-search.component';
import { AgentsComponent } from './agents.component';

@NgModule({
  declarations: [
    AppComponent,
    AgentTableComponent,
    AgentGridComponent,
    CountrySearchComponent,
    AgentsComponent
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatCardModule,
    MatPaginatorModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatProgressBarModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
