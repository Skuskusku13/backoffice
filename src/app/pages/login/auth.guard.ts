import {inject, Injectable} from '@angular/core';
import {CanActivate, CanActivateFn, Router} from '@angular/router';
import {Observable, Subscription} from 'rxjs';
import { map } from 'rxjs/operators';
import {LoginService} from '../../core/services/login.service';

export const AuthGuard: () => Observable<boolean> = (): Observable<boolean> => {
  const loginService: LoginService = inject(LoginService)
  const router: Router = inject(Router)


  return loginService.isLoggedIn.pipe(
    map((isLogged: boolean) => {
      if(! isLogged) {
        console.log('🚫 AuthGuard: accès refusé');
        router.navigate(['/login']);
        return false;
      }
      console.log('✅ AuthGuard: accès autorisé');
      return true
    })
  );
}

    // {
  //   next: isLogged => {
  //     if(isLogged) {
  //       console.log('✅ AuthGuard: accès autorisé');
  //       return isLogged
  //     }
  //     console.log('🚫 AuthGuard: accès refusé');
  //     router.navigate(['login'])
  //     return isLogged
  //   },
  //   error: err => console.log(err)
  // })



  // return loginService.isLoggedIn.pipe(
  //   map((isLogged: boolean) => {
  //     if (isLogged) {
  //       console.log('✅ AuthGuard: accès autorisé');
  //       return true;
  //     } else {
  //       console.log('🚫 AuthGuard: accès refusé');
  //       router.navigate(['/login']);
  //       return false;
  //     }
  //   })
  // );
// }
