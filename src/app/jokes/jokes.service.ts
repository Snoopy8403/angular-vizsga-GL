import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Jokes } from './jokes.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class JokesService {
  private baseUrl = 'https://Humor-API.proxy-production.allthingsdev.co';


  constructor(
    private readonly http: HttpClient
  ) { }

  getJokes(): Observable<Jokes> {
    return this.http.get<Jokes>(`${this.baseUrl}/jokes/random`);
  }
}

