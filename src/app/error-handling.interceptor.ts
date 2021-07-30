import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpStatusCode
} from "@angular/common/http";
import { Observable, of, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";
import { MessageService } from "./message.service";
import { Injectable } from "@angular/core";

@Injectable()
export class ErrorHandlingInterceptor implements HttpInterceptor {

  constructor(private massageService: MessageService) {
  }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(catchError(err => {
      console.log(err);
      if (err instanceof HttpErrorResponse) {
        if (err.status !== HttpStatusCode.Unauthorized) {
          this.massageService.notifyError("Server respond is error.")
          return throwError(err);
        }
        return of(err.error);
      } else
        return throwError(err);
    }));
  }


}
