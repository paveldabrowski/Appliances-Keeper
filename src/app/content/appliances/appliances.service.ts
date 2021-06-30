import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { Appliance } from "./models";
import { BACKEND_URL } from "../../../environments/environment";
import { GetterByParam, ServiceKeeper, Pageable } from "../model";
import { AbstractControl } from "@angular/forms";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class AppliancesService implements ServiceKeeper<Appliance>, GetterByParam<Appliance> {

  constructor(private httpClient: HttpClient) { }

  findAll() :Observable<Appliance[]> {
    return this.httpClient.get<Appliance[]>(`${BACKEND_URL}/appliances`);
  }

  findAllByParam(field: string, value: string): Observable<Appliance[]> {
    if (value && value.length === 0)
      return of([])

    return this.httpClient.get<Appliance[]>(`${BACKEND_URL}/appliances`, {
      params: new HttpParams()
        .set(field, value)
    });
  }

  findSearchedPaginatedSortedCommissions(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Appliance>> {
    return of();
  }


  addAppliance(appliance: Appliance) {
    return this.httpClient.post(`${BACKEND_URL}/appliances`, appliance);
  }
}
