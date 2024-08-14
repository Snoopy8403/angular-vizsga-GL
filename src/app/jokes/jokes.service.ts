import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jokes } from './jokes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private baseUrl = 'https://api.humorapi.com';
  private readonly jokeHeaders = new HttpHeaders() 
  .set("api-key", "86c2e0ca94b14c709d529443211dc2c1");
  
  constructor(
    private readonly http: HttpClient
  ) { }

  getRandomJoke(): Observable<Jokes> {
    return this.http.get<Jokes>(`${this.baseUrl}/jokes/random`, {headers: this.jokeHeaders});
  }
}

