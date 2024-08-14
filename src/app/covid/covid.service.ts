import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Cases } from './cases/cases.model';
import { Observable } from 'rxjs';
import { Vaccines } from './vaccines/vaccines.model';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private baseUrl = 'https://europe-central2-webuni-js-covid-exam.cloudfunctions.net';

  constructor(
    private readonly http: HttpClient
  ) { }

  getCases(): Observable<Cases> {
    return this.http.get<Cases>(`${this.baseUrl}/cases?country=hungary`);
  }

  getVaccines(): Observable<Vaccines> {
    return this.http.get<Vaccines>(`${this.baseUrl}/vaccines?country=france`);
  }
}
