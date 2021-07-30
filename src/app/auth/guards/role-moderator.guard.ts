import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { UserRoles } from "../models";
import { TokenStorageService } from "../token-storage.service";
import { MessageService } from "../../message.service";

@Injectable({
  providedIn: 'root'
})
export class RoleModeratorGuard implements CanActivate {

  constructor(private tokenService: TokenStorageService, private messageService: MessageService) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    const roles = this.tokenService.getUser()?.roles;
    if (roles) {
      if (roles.includes(UserRoles.MOD))
        return true;
    }
    console.log("RoleModeratorGuard blocked this page.")
    this.messageService.notifyWarning("Permission denied. Moderator role is required.")
    return false;
  }

}
