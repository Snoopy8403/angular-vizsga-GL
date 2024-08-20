import { Injectable, signal } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../models/user.model';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { filter, map, tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { CreateUser } from '../models/create-user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly BASE_URL = `${environment.baseUrl}/auth`;
  private readonly CURRENT_USER_KEY = `currentUser`;

  private readonly _currentUser = signal<User | undefined>(undefined);

  constructor(
    private readonly http: HttpClient,
    private readonly router: Router
  ) {
    const storedUser = localStorage.getItem(this.CURRENT_USER_KEY);

    if(storedUser) {
      this._currentUser.set(JSON.parse(storedUser));
    }

    this.sessionInfo().pipe(
      filter(isLoggedIn => !isLoggedIn),
      tap(() => {
        this.clearStoredUser();
        this._currentUser.set(undefined);
      }),
      takeUntilDestroyed()
    ).subscribe();
  }

  get currentUser() {
    return this._currentUser.asReadonly();
  }

  get isLoggedIn() {
    return this._currentUser() !== undefined;
  }

  login(email: string, password: string) {
    return this.http.post<User>(`${this.BASE_URL}/login`, {email, password}).pipe(
      tap(user => {
        this._currentUser.set(user);
        this.storeUser(user);
      })
    )
  }

  //beleírtam a könnyebb teszteléshez
  counterErase() {
    let userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
      userData.visitCounter = 0;
      localStorage.setItem('currentUser', JSON.stringify(userData));
  }

  logout() {
    return this.http.post(`${this.BASE_URL}/logout`, null).pipe(
      tap(() => {
        this.clearStoredUser();
        this._currentUser.set(undefined);
        this.router.navigate(['/login']);
      })
    )
  }

  sessionInfo() {
    return this.http.get<{isLoggedIn: boolean}>(`${this.BASE_URL}/sessionInfo`).pipe(
      map(res => res.isLoggedIn)
    )
  }

  registration(createUser: CreateUser) {
    return this.http.post(`${this.BASE_URL}/registration`, createUser);
  }

  getDowloadedCounter() {
    let userData = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return userData.visitCounter;
  }

  private storeUser(user: User) {
    localStorage.setItem(this.CURRENT_USER_KEY, JSON.stringify(user));
  }

  private clearStoredUser() {
    localStorage.removeItem(this.CURRENT_USER_KEY);
  }
}