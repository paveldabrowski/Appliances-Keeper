import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from "./token-storage.service";
import { AuthService } from "./auth.service";
import { map, take, tap } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private tokenStorageService: TokenStorageService,
              private authService: AuthService,
              private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkIfTokenValid(this.tokenStorageService.getToken()).pipe(
      map(isTokenValid => {
        if (isTokenValid) {
          return true;
        }
        this.tokenStorageService.signOut();
        return this.router.parseUrl("/login");
      }));

  }

}
