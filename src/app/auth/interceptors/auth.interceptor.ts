import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor, HTTP_INTERCEPTORS
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from "../service/token-storage.service";
import { UnauthorizedUserInterceptor } from "./unauthorized-user.interceptor";
import { BACKEND_URL } from "../../../environments/environment";
import { IbmTokenReceiver } from "./ibm-token-receiver.interceptor";

const TOKEN_HEADER_KEY = 'Authorization';
const IBM_URL_ROOT = "cloud-object-storage";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(private tokenStorageService: TokenStorageService) {
  }


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let authReq = req;
    const token = this.tokenStorageService.getToken();

    const url = req.url;
    if (token != null && url.includes(BACKEND_URL)) {
      authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, 'Bearer ' + token)});
    } else if (url.includes(IBM_URL_ROOT)) {
    //   const ibmToken = this.tokenStorageService.getIbmToken();
    //   if (ibmToken)
    //     authReq = req.clone({headers: req.headers.set(TOKEN_HEADER_KEY, ibmToken)});
    }
    return next.handle(authReq);
  }
}

export const authInterceptorProviders = [
  {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: UnauthorizedUserInterceptor, multi: true},
  {provide: HTTP_INTERCEPTORS, useClass: IbmTokenReceiver, multi: true}
];

