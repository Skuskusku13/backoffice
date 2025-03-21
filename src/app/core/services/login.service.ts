import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils/constants.utils';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginInterface } from '../models/login.interface';
import { LogedInterface } from '../models/loged.interface';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.checkAccessToken().subscribe({
      next: () => {
        this.loggedIn.next(true);
      },
      error: (error) => {
        console.log(error);
        this.loggedIn.next(false);
      },
    });
  }

  login(credentials: LoginInterface): Observable<LogedInterface> {
    return this.http
      .post<LogedInterface>(`${API_URL}api/token/`, credentials)
      .pipe(
        tap((response: LogedInterface) => {
          if (response && response.access && response.refresh) {
            localStorage.setItem('access', response.access);
            localStorage.setItem('refresh', response.refresh);
            this.loggedIn.next(true);
          }
        })
      );
  }

  logout(): void {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.loggedIn.next(false);
  }

  refreshAccessToken(): Observable<any> {
    const refreshToken = localStorage.getItem('refresh');
    return this.http.post<any>(`${API_URL}api/token/refresh/`, {
      refresh: refreshToken,
    });
  }

  private checkAccessToken(): Observable<any> {
    const accessToken = localStorage.getItem('access');
    return this.http.post<any>(`${API_URL}api/token/verify/`, {
      token: accessToken,
    });
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }

  getRefreshToken(): string | null {
    return localStorage.getItem('refresh');
  }
}
