import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private massageService: MessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      if (err instanceof HttpErrorResponse) {
        console.log(err);
        this.massageService.notifyError("Serwer respond is error.")
      }
      return throwError(err);
    }));
  }


}
