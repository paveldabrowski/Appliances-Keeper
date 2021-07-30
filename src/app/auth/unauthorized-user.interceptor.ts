import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HttpErrorResponse, HttpStatusCode
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { MessageService } from "../message.service";
import { catchError, tap } from "rxjs/operators";
import { Router } from "@angular/router";
import { AuthService } from "./auth.service";

@Injectable()
export class UnauthorizedUserInterceptor implements HttpInterceptor {

  constructor(private massageService: MessageService, private router: Router, private authService: AuthService) {
  }

  // intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
  //   return next.handle(req).pipe(catchError(err => {
  //     if (err instanceof HttpErrorResponse) {
  //       console.log("UnauthorizedUserInterceptor", err);
  //       this.massageService.notifyError("User is not authenticated or authorized.")
  //       if (err.status === HttpStatusCode.Unauthorized) {
  //         return this.router.navigate(["/login"]).then(() => this.authService.logout())
  //
  //       }
  //       return;
  //     }
  //
  //   }));
  // }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(tap(() => {},
      (err: any) => {
        if (err instanceof HttpErrorResponse) {
          if (err.status === HttpStatusCode.Unauthorized) {
            console.log("User is not authenticated or authorized.");
            this.massageService.notifyError("User is not authenticated or authorized.")
            this.router.navigate(['/login']).then(() => this.authService.logout());
          }
        }
      }));
  }
}
