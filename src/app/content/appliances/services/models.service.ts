import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpRequest } from "@angular/common/http";
import { GetterByParam, Pageable, ServiceAsyncValidator, ServiceKeeper } from "../../model";
import { Brand, Model } from "../models";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../../environments/environment";
import { delay } from "rxjs/operators";
import { Form } from "@angular/forms";

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

  addModelWithFiles(model: Model, files: File[]): Observable<Model> {
    model.name = model.name?.toUpperCase();

    if (files && files.length) {
      console.log('Files is add model request.')
      const formData: FormData = new FormData();
      formData.append('model', JSON.stringify(model));
      files.forEach(file => formData.append('file', file));

      const req = new HttpRequest('POST', `${ BACKEND_URL }/appliances/models`, formData, {
        reportProgress: true,
        responseType: 'json'
      });

      return this.httpClient.post(`${ BACKEND_URL }/appliances/models`, formData, {
        reportProgress: true,
        responseType: 'json'
      });
    }

    return this.httpClient.post(`${ BACKEND_URL }/appliances/models`, model);
  }

  findAll(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${ BACKEND_URL }/appliances/models`);
  }

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Model>> {
    return of();
  }
}
