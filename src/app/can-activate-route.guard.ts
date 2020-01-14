import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { AuthenticationService } from './services/authentication.service';
import { RouterService } from './services/router.service';

@Injectable()
export class CanActivateRouteGuard implements CanActivate {

  constructor(private authservice: AuthenticationService, private routerservice: RouterService) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return this.authservice.isUserAuthenticated(this.authservice.getBearerToken())
      .then(data => {
        if (!data) {
          this.routerservice.routeToLogin();
        }else {
          return data;
        }
      });
  }
}
