import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../environments/environment";

const AUTH_API = 'http://localhost:8080/auth/';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private httpClient: HttpClient) { }

  login(username: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'login', {
      username,
      password
    }, httpOptions);
  }

  register(username: string, email: string, password: string): Observable<any> {
    return this.httpClient.post(AUTH_API + 'signup', {
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
}
