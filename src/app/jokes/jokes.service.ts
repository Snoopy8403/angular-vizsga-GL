import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jokes } from './jokes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private baseUrl = 'https://Humor-API.proxy-production.allthingsdev.co';
  private readonly jokeHeaders = new HttpHeaders() 
  .set("x-apihub-key", "Tn7kov6teptc5tETGyMgHuXupqq8k9AKHiHjAwPJE-w1cuv04-")
  .set("x-apihub-host", "Humor-API.allthingsdev.co")
  .set("x-apihub-endpoint", "b2757a78-0430-4858-864b-f80314fb6283");
  
  constructor(
    private readonly http: HttpClient
  ) { }

  getRandomJoke(): Observable<Jokes> {
    return this.http.get<Jokes>(`${this.baseUrl}/jokes/random`, {headers: this.jokeHeaders});
  }
}

