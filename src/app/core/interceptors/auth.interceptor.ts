import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loginService = inject(LoginService);
  const accessToken = localStorage.getItem('access');

  const clonedRequest = accessToken
    ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : request;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401 && accessToken) {
        return loginService.refreshAccessToken().pipe(
          switchMap((response) => {
            console.log('new accesstoken from resfresh:', response.access);
            localStorage.setItem('access', response.access);
            const retriedRequest = request.clone({
              setHeaders: { Authorization: `Bearer ${response.access}` },
            });
            return next(retriedRequest);
          }),
          catchError((refreshError) => {
            console.error('Error refreshing access token:', refreshError);
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
