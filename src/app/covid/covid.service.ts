import { HttpClient } from '@angular/common/http';
import { Injectable, signal } from '@angular/core';
import { Cases } from '../models/cases.model';
import { Observable } from 'rxjs';
import { Vaccines } from '../models/vaccines.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CovidService {
  private readonly BASE_URL = `${environment.covidBaseUrl}`;
  isLoading = signal(false);

  constructor(
    private readonly http: HttpClient
  ) { }

  getCases(selectedCountry: string): Observable<Cases> {
    this.isLoading.set(true);
      return this.http.get<Cases>(`${this.BASE_URL}/cases?country=${selectedCountry}`);      
  }

  getVaccines(selectedCountry: string): Observable<Vaccines> {
    this.isLoading.set(true);
    return this.http.get<Vaccines>(`${this.BASE_URL}/vaccines?country=${selectedCountry}`);
  }

  incraseVisitCounter() {
    let userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
          userData.visitCounter += 1;
          localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  checkVisitCounter(){
    let userData = JSON.parse(localStorage.getItem('currentUser') || '{}');

    if (userData.visitCounter) {
        if (userData.visitCounter < 3) {
          return true;
        }
        else {
          return false;
        }
    } 
    else{
      return true;
    }
  }
}
