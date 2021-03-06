import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent, HttpHeaders, HttpParams, HttpRequest } from "@angular/common/http";
import { GetterByParam, Pageable, ServiceAsyncValidator, ServiceKeeper } from "../../model";
import { Brand, Model, ModelImage } from "../models";
import { BehaviorSubject, Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../../environments/environment";
import { delay } from "rxjs/operators";
import { Commission } from "../../commissions/Commission";

@Injectable({
  providedIn: 'root'
})
export class ModelsService implements ServiceKeeper<Model>, GetterByParam<Model>, ServiceAsyncValidator {

  private _currentModelSubject: BehaviorSubject<Model | undefined> = new BehaviorSubject<Model | undefined>(undefined);

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

  addModelWithFiles(model: Model, files: File[]): Observable<HttpEvent<Model>> {
    model.name = model.name?.toUpperCase();

    if (files && files.length) {
      console.log('Files is add model request.')
      const formData: FormData = new FormData();
      formData.append('model', new Blob([JSON.stringify(model)], {type: "application/json"}));
      files.forEach(file => formData.append('file', file));

      const req = new HttpRequest('POST', `${ BACKEND_URL }/appliances/models/upload`, formData, {
        reportProgress: true,
        responseType: 'json',
      });
      return this.httpClient.request(req);
    }
    return this.httpClient.request(new HttpRequest('POST', `${ BACKEND_URL }/appliances/models` , model));
  }

  findAll(): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${ BACKEND_URL }/appliances/models`);
  }

  findSearchedPaginatedSorted(sortBy: string = "id", sortDirection: string = "asc", searchTerm: string = "",
                              page: number = 0, size: number = 5): Observable<Pageable<Model>> {
    return this.httpClient.get<Pageable<Model>>(`${ BACKEND_URL }/appliances/models`, {
      params: new HttpParams()
        .set("sort", `${ sortBy },${ sortDirection }`)
        .set("page", page.toString())
        .set("size", size.toString())
        .set("searchTerm", searchTerm)
    });
  }

  getImagesByModelId(id: number | undefined): Observable<ModelImage[]> {
    return id ? this.httpClient.get<ModelImage[]>(`${BACKEND_URL}/appliances/models/${id}/images`): of();
  }

  deleteModel(model: Model) {
    return this.httpClient.delete(`${BACKEND_URL}/appliances/models/${model.id}`);
  }

  setCurrentModel(model: Model | undefined) {
    this._currentModelSubject.next(model);
  }

  get currentModelSubject(): BehaviorSubject<Model | undefined> {
    return this._currentModelSubject;
  }
}
