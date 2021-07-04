import { Injectable } from '@angular/core';
import { GetterByParam, ServiceAsyncValidator } from "../../model";
import { Brand } from "../models";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class BrandsService implements GetterByParam<Brand>, ServiceAsyncValidator{

  constructor(private httpClient: HttpClient) { }

  findAllByParam(field: string, value: string): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${BACKEND_URL}/appliances/brands`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }

  add(brand: Brand): Observable<Brand> {
    if (brand && brand.name) {
      let words = brand.name.split(' ');
      let capitalized = words.map(function (word) {
        return word.charAt(0).toUpperCase() + word.substring(1, word.length);
      });

      brand.name = capitalized.join(' ');
      return this.httpClient.post<Brand>(`${ BACKEND_URL }/appliances/brands`, brand);
    } else
      return of();

  }

  findAll(): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${BACKEND_URL}/appliances/brands`);
  }

  checkIfNameExists(name: string, brand?: any): Observable<boolean> {
    if (name) {
      return this.httpClient.get<boolean>(`${ BACKEND_URL }/appliances/brands`, {
        params: new HttpParams()
          .set('nameExists', name)
      }).pipe(delay(250));
    } else
      return of(true);
  }
}
