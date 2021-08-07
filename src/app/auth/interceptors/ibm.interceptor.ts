import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpHeaderResponse,
  HttpInterceptor,
  HttpRequest,
  HttpResponse
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { map, tap } from "rxjs/operators";
import { IBM_TOKEN_HEADER } from "../../../environments/environment";
import { TokenStorageService } from "../service/token-storage.service";

@Injectable()
export class IbmInterceptor implements HttpInterceptor {

  constructor(private tokenStorage: TokenStorageService) {
  }

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    return next.handle(request).pipe(tap(event => {
      if (event instanceof HttpResponse && event.headers.has(IBM_TOKEN_HEADER)) {
        console.log("Saving IBM Token in interceptor")
        this.tokenStorage.saveIbmToken(request.headers.get(IBM_TOKEN_HEADER));
      }
    }));
  }
}
