import { Injectable } from '@angular/core';
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  private data$: Subject<any> = new Subject<any>();

  next(data:any):void {
    this.data$.next(data);
  }

  select(): Observable<any> {
    return this.data$.asObservable();
  }
}
