import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivate,
  CanActivateChild,
  Router,
  RouterStateSnapshot,
  UrlTree
} from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from "./token-storage.service";
import { AuthService } from "./auth.service";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate, CanActivateChild {

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivateChild(childRoute: ActivatedRouteSnapshot,
                   state: RouterStateSnapshot): boolean | UrlTree | Observable<boolean | UrlTree> | Promise<boolean | UrlTree> {
    console.log("AuthGuard invoked in child");
    return this.authService.checkIfTokenValid(this.tokenStorageService.getToken()).pipe(
      map(isTokenValid => {
        if (isTokenValid) {
          return true;
        }
        this.tokenStorageService.logout();
        return this.router.parseUrl("/login");
      }));
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    console.log("AuthGuard invoked in Parent");
    return this.authService.checkIfTokenValid(this.tokenStorageService.getToken()).pipe(
      map(isTokenValid => {
        if (isTokenValid) {
          return true;
        }
        this.tokenStorageService.logout();
        return this.router.parseUrl("/login");
      }));

  }

}
