import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Agent } from "./agent";
import { Country } from './country';


@Injectable({
  providedIn: 'root'
})
export class DataService {

  private baseURL = 'https://refdata.studygroup.com/Agents/Active?brandId=6&salesCountryId=13&salesRegionId=&agentCountryId=';

  // private agentsURL = "?brandId=6&salesCountryId=13&salesRegionId=";
  private countriesURL = 'https://refdata.studygroup.com/Agents/Countries?brandId=6';

  private params = new HttpParams();

  constructor(private http: HttpClient) {

  }

  getAllAgents(): Observable<Agent[]> {
    console.log('Getting all the agents from the server.');
    return this.http.get<Agent[]>(this.baseURL);
  }

  getAllAgentsCountries(): Observable<Country[]> {
    console.log('Getting all the countries from the server.');
    return this.http.get<Country[]>(this.countriesURL);
  }

  // getAgentCountryId(): Observable<Country[]> {
  //   // console.log('Getting all the countries from the server.');
  //   // return this.http.get<Country[]>(this.baseURL + this.countriesURL);
  //   const params = this.params.set('agentCountryId', '44');
  //   return this.http.get<Country[]>(this.baseURL, {params});
  // }


  // getAgentCountryId(countryId: number): Observable<Agent> {
  //   return this.http.get<Agent>(this.BASE_URL + `${countryId}`, {
  //     headers: new HttpHeaders({
  //       'Accept': 'application/json',
  //       'Authorization': 'my-token'
  //     })
  //   });
  //   // return allBooks;
  // }
}
