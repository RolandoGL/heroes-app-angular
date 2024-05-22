import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, CanMatchFn, Route, Router, RouterStateSnapshot, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Observable, map, tap } from 'rxjs';

export const canActivatePublicGuard: CanActivateFn = (route:ActivatedRouteSnapshot, state: RouterStateSnapshot) => {
  return checkAuthStatus()
};

export const canMatchPublicGuard: CanMatchFn = (route: Route, segments: UrlSegment[]) =>{
   return checkAuthStatus()
}

const checkAuthStatus = ():boolean | Observable<boolean>=>{
  const _authService: AuthService = inject( AuthService )
  const _router: Router = inject( Router)

  return _authService.chechAuthentication()
          .pipe(
            tap( isAuthenticated => { if( isAuthenticated ) _router.navigate( ['./'] ) }),
            map( isAuthenticated => !isAuthenticated )
          )
}
