import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Agent } from "../interfaces/agent";
import { Country } from '../interfaces/country';


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agentURL = 'https://refdata.studygroup.com/Agents/Active?brandId=6&salesCountryId=13&salesRegionId=';

  private params = new HttpParams();

  constructor(private http: HttpClient) {
  }

  getAgents(countryId): Observable<Agent[]> {
    console.log('Getting list of agents from the server.');
    const params =  this.params.set('agentCountryId', countryId);

    return this.http.get<Agent[]>(this.agentURL, {params});
  }
}
