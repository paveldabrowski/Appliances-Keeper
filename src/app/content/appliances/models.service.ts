import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetterByParam, Pageable, ServiceKeeper } from "../model";
import { Model } from "./models";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModelsService implements ServiceKeeper<Model>, GetterByParam<Model> {

  constructor(private httpClient: HttpClient) { }

  findAllByParam(field: string, value: string): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${BACKEND_URL}/appliances/models`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }

  add(model: Model) {
    return this.httpClient.post<Model>(`${BACKEND_URL}/appliances/models`, model);
  }

  findAll(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${BACKEND_URL}/appliances/models`);
  }

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Model>> {
    return of();
  }
}
