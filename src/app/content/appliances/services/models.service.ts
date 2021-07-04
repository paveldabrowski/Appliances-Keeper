import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetterByParam, Pageable, ServiceAsyncValidator, ServiceKeeper } from "../../model";
import { Brand, Model } from "../models";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../../environments/environment";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ModelsService implements ServiceKeeper<Model>, GetterByParam<Model>, ServiceAsyncValidator {

  constructor(private httpClient: HttpClient) {
  }

  checkIfNameExists(name: string, brand: Brand | null): Observable<boolean> {
    if (brand !== null && brand.id) {
      return this.httpClient.get<boolean>(`${ BACKEND_URL }/appliances/models`, {
        params: new HttpParams()
          .set('nameExists', name)
          .set('brandId', brand.id.toString())
      }).pipe(delay(250));
    } else
      return of(false);
  }

  findAllByParam(field: string, value: string): Observable<Model[]> {
    if (value)
      value = value.trim();
    else return of([])

    if (value.length === 0)
      return of([])

    return this.httpClient.get<Model[]>(`${ BACKEND_URL }/appliances/models`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }

  add(model: Model) {
    model.name = model.name?.toUpperCase();
    return this.httpClient.post<Model>(`${ BACKEND_URL }/appliances/models`, model);
  }

  findAll(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${ BACKEND_URL }/appliances/models`);
  }

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Model>> {
    return of();
  }
}
