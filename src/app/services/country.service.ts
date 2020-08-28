import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
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
}
