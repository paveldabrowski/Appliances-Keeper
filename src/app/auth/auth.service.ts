import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../environments/environment";
import { LoginCredentials } from "./models";
import { TokenStorageService } from "./token-storage.service";
import { Router } from "@angular/router";


const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient, private tokenService: TokenStorageService, private router: Router) { }

  login(loginCredentials: LoginCredentials): Observable<any> {
    return this.httpClient.post(`${BACKEND_URL}/auth/login`, loginCredentials, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(`${BACKEND_URL}/auth/register`, {
      username,
      email,
      password
    }, httpOptions);
  }

  checkIfTokenValid(token: string | null): Observable<boolean> {
    if (token) {
      return this.httpClient.get<boolean>(`${BACKEND_URL}/auth`);
    }
    return of(false);
  }

  logout(): void {
    // this.tokenService.logout();
    this.router.navigate(["/login"]).then(() => this.tokenService.logout());
  }


}
