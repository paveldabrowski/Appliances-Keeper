import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { EMPTY, Observable } from 'rxjs';
import { catchError, map } from "rxjs/operators";
import { AuthService } from "../service/auth.service";
import { TokenStorageService } from "../service/token-storage.service";
import { ERROR } from "@angular/compiler-cli/src/ngtsc/logging/src/console_logger";

@Injectable({
  providedIn: 'root'
})
export class LoginGuard implements CanActivate {

  constructor(private authService: AuthService, private tokenService: TokenStorageService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    return this.authService.checkIfTokenValid(this.tokenService.getToken()).pipe(
      map(isTokenValid => {
        if (isTokenValid) {
           return this.router.parseUrl("/content");
        }
        return true;
      }));
  }

}
