import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class TitleService {

  constructor() { }

  private data$: BehaviorSubject<any> = new BehaviorSubject<any>("");

  next(data:any):void {
    this.data$.next(data);
  }

  select(): Observable<any> {
    return this.data$.asObservable();
  }
}
