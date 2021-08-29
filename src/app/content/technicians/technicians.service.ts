import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetterBySearchTerm, Pageable, ServiceKeeper } from "../model";
import { Hour, Technician, WorkingDay } from "./models";
import { BACKEND_URL } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { map, tap } from "rxjs/operators";
import { Model } from "../appliances/models";

@Injectable({
  providedIn: 'root'
})
export class TechniciansService implements GetterBySearchTerm<Technician>, ServiceKeeper<Technician> {

  Hour = Hour;

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Technician[]> {
    return this.httpClient.get<Technician[]>(`${BACKEND_URL}/technicians`);
  }

  findSearchedPaginatedSorted(sortBy: string = "id", sortDirection: string = "asc", searchTerm: string = "",
                              page: number = 0, size: number = 5): Observable<Pageable<Technician>> {
    return this.httpClient.get<Pageable<Technician>>(`${ BACKEND_URL }/technicians`, {
      params: new HttpParams()
        .set("sort", `${ sortBy },${ sortDirection }`)
        .set("page", page.toString())
        .set("size", size.toString())
        .set("searchTerm", searchTerm)
    });
  }

  getWorkingDay(technician: Technician, date: Date) {
    const result = date.toLocaleDateString("pl-PL", { // you can use undefined as first argument
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    });

    return this.httpClient.get<WorkingDay>(`${BACKEND_URL}/technicians/${technician.id}/workingDays`, {
      params: new HttpParams()
        .set("workingDay", result)
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
