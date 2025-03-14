import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { API_URL } from '../utils/constants.utils';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { LoginInterface } from '../models/login.interface';
import { LogedInterface } from '../models/loged.interface';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoggedIn(): Observable<boolean> {
    return this.loggedIn.asObservable();
  }

  constructor(private http: HttpClient) {
    this.checkToken();
  }

  login(credentials: LoginInterface): Observable<LogedInterface> {
    return this.http.post<LogedInterface>(`${API_URL}api/token/`, credentials).pipe(
      tap((response: LogedInterface) => {
        if (response && response.access && response.refresh) {
          localStorage.setItem('access', response.access);
          localStorage.setItem('refresh', response.refresh);
          this.loggedIn.next(true);
        }
      })
    );
  }

  logout(): void   {
    localStorage.removeItem('access');
    localStorage.removeItem('refresh');
    this.loggedIn.next(false)
  }

  private checkToken(): void {
    const token = localStorage.getItem('access');
    if (token) {
      this.loggedIn.next(true);
    }
  }

  getAccessToken(): string | null {
    return localStorage.getItem('access');
  }
}
