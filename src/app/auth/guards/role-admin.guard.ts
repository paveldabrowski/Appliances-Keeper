import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { TokenStorageService } from "../service/token-storage.service";
import { UserRoles } from "../models";
import { MessageService } from "../../message.service";

@Injectable({
  providedIn: 'root'
})
export class RoleAdminGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private messageService: MessageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = this.tokenService.getUser()?.roles;
    if (roles) {
      if (roles.includes(UserRoles.ADMIN))
        return true;
    }
    console.log("RoleAdminGuard blocked this page.")
    this.messageService.notifyWarning("Permission denied. Admin role is required.")
    return false;
  }

}
