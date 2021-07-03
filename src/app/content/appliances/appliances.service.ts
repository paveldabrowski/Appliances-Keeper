import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Appliance } from "./models";
import { BACKEND_URL } from "../../../environments/environment";
import { GetterByParam, Pageable, ServiceKeeper } from "../model";

@Injectable({
  providedIn: 'root'
})
export class AppliancesService implements ServiceKeeper<Appliance>, GetterByParam<Appliance> {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Appliance[]> {
    return this.httpClient.get<Appliance[]>(`${ BACKEND_URL }/appliances`);
  }

  findAllByParam(field: string, value: string): Observable<Appliance[]> {
    if (!value)
      return of([]);

    value = value.trim();
    if (value.length === 0)
      return of([])

    return this.httpClient.get<Appliance[]>(`${ BACKEND_URL }/appliances`, {
      params: new HttpParams()
        .set(field, value)
    });
  }

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Appliance>> {
    return of();
  }


  add(appliance: Appliance) {
    return this.httpClient.post<Appliance>(`${ BACKEND_URL }/appliances`, appliance);
  }
}
