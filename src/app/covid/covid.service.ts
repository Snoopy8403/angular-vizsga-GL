import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cases } from '../models/cases.model';
import { Observable } from 'rxjs';
import { Vaccines } from '../models/vaccines.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private readonly BASE_URL = `${environment.covidBaseUrl}`;

  constructor(
    private readonly http: HttpClient
  ) { }

  getCases(selectedCountry: string): Observable<Cases> {
    return this.http.get<Cases>(`${this.BASE_URL}/cases?country=${selectedCountry}`);
  }

  getVaccines(selectedCountry: string): Observable<Vaccines> {
    return this.http.get<Vaccines>(`${this.BASE_URL}/vaccines?country=${selectedCountry}`);
  }
}
