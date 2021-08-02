import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from "../service/token-storage.service";
import { MessageService } from "../../message.service";
import { UserRoles } from "../models";

@Injectable({
  providedIn: 'root'
})
export class RoleUserGuard implements CanActivate {
  constructor(private tokenService: TokenStorageService, private messageService: MessageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = this.tokenService.getUser()?.roles;
    if (roles) {
      if (roles.includes(UserRoles.USER) || roles.includes(UserRoles.MOD) || roles.includes(UserRoles.ADMIN))
        return true;
    }
    console.log("RoleUserGuard blocked this page.")
    this.messageService.notifyWarning("Permission denied. User role is required.")
    return false;
  }

}
