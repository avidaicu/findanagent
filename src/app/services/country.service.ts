import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, take, tap } from 'rxjs/operators';

import { Country } from '../interfaces/country';


@Injectable({
  providedIn: 'root'
})
export class CountryService {

  private countriesURL = 'https://refdata.studygroup.com/Agents/Countries?brandId=6';

  constructor(private http: HttpClient) {}

  getCountries(): Observable<Country[]> {
    console.log('Getting all agent countries from the server.');
    return this.http.get<Country[]>(this.countriesURL);
  }

  // getAgentCountryId() {
  //   // console.log('Getting all the countries from the server.');
  //   // return this.http.get<Country[]>(this.baseURL + this.countriesURL);
  //   return this.params.set('agentCountryId', '44');
  //   // return this.http.get<Country[]>(this.baseURL, {params});
  // }

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
