import { Injectable } from '@angular/core';
import { User } from "../models";

const TOKEN_KEY = 'auth-token';
const USER_KEY = 'auth-user';

/**
 * First was session storage, but local storage works with multiple tabs. ( <code>window.sessionStorage</code> )
 */
@Injectable({
  providedIn: 'root'
})
export class TokenStorageService {
  constructor() { }

  logout(): void {
    localStorage.clear();
  }

  public saveToken(token: string): void {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.setItem(TOKEN_KEY, token);
  }

  public getToken(): string | null {
    return localStorage.getItem(TOKEN_KEY);
  }

  public saveUser(user: User): void {
    localStorage.removeItem(USER_KEY);
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  public getUser(): User | null {
    const user = localStorage.getItem(USER_KEY);
    if (user) {
      return JSON.parse(user) as User;
    }

    return null;

  }
}
