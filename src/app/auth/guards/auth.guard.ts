import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  CanMatchFn,
  Route,
  Router,
  RouterStateSnapshot,
  UrlSegment
} from '@angular/router';
import { Observable, tap } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';



export const canActivateGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus()
};

export const canMatchGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) =>{
   return checkAuthStatus()
}

const checkAuthStatus = ():boolean | Observable<boolean>=>{
  const _authService: AuthService = inject( AuthService )
  const _router: Router = inject( Router)

  return _authService.chechAuthentication()
          .pipe(
            // tap( isAuthenticated => console.log(isAuthenticated)),
            tap( isAuthenticated =>{
              if( !isAuthenticated ) _router.navigate( ['./auth/login'] )
            })
          )
}
