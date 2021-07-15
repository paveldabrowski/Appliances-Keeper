import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetterBySearchTerm } from "../model";
import { Hour, Technician, WorkingDay } from "./models";
import { BACKEND_URL } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TechniciansService implements GetterBySearchTerm<Technician> {

  Hour = Hour;

  constructor(private httpClient: HttpClient) {
  }

  getWorkingDay(technician: Technician, date: Date) {
    return this.httpClient.get<WorkingDay>(`${BACKEND_URL}/technicians/${technician.id}/workingDays`, {
      params: new HttpParams()
        .set("workingDay", date.toLocaleDateString())
    }).pipe(map(value => {
      // for (let i of value.technicianTerms) {
      //   i.commission = {id: 1}
      // }
      return value;
    }));
  }

  findAllBySearchTerm(searchTerm: string | any): Observable<Technician[]> {
    if (searchTerm && !(searchTerm instanceof Object)) {
      searchTerm = searchTerm?.trim().toLowerCase();
      return this.httpClient.get<Technician[]>(`${ BACKEND_URL }/technicians`, {
        params: new HttpParams()
          .set("searchTerm", searchTerm)
      });
    } else
      return of([]);
    }
}
