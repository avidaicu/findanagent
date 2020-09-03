import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agent } from "../interfaces/agent";


@Injectable({
  providedIn: 'root'
})
export class AgentService {

  private agentURL = 'https://refdata.studygroup.com/Agents/Active?brandId=6&salesCountryId=13&salesRegionId=';
  private params = new HttpParams();

  constructor(private http: HttpClient) {}

  getAgents(countryId): Observable<Agent[]> {
    console.log('Getting list of agents from the server.');
    const params =  this.params.set('agentCountryId', countryId);

    return this.http.get<Agent[]>(this.agentURL, {params});
  }
}
