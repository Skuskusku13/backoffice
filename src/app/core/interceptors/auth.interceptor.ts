import {
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { LoginService } from '../services/login.service';
import { inject } from '@angular/core';
import { catchError, Observable, switchMap, throwError } from 'rxjs';
import {Router} from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (
  request: HttpRequest<unknown>,
  next: HttpHandlerFn
): Observable<HttpEvent<unknown>> => {
  const loginService = inject(LoginService);
  const accessToken = localStorage.getItem('access');
  const router: Router = inject(Router)

  // 🚨 Empêcher l'interception des requêtes de refresh pour éviter la boucle infinie
  if (request.url.includes('/api/token/refresh/')) {
    return next(request);
  }

  const clonedRequest = accessToken
    ? request.clone({ setHeaders: { Authorization: `Bearer ${accessToken}` } })
    : request;

  return next(clonedRequest).pipe(
    catchError((error) => {
      if (error.status === 401 && accessToken) {
        return loginService.refreshAccessToken().pipe(
          switchMap((response) => {
            if (response && response.access) {
              localStorage.setItem('access', response.access);
              const retriedRequest = request.clone({
                setHeaders: { Authorization: `Bearer ${response.access}` },
              });
              return next(retriedRequest);
            } else {
              loginService.logout();
              return throwError(() => new Error('Invalid refresh token response'));
            }
          }),
          catchError((refreshError) => {
            console.error('Error refreshing access token:', refreshError);
            loginService.logout()
            router.navigate(['login'])
            return throwError(() => refreshError);
          })
        );
      }
      return throwError(() => error);
    })
  );
};
