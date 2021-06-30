import { Injectable } from '@angular/core';
import { GetterByParam } from "../model";
import { Brand } from "./models";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class BrandsService implements GetterByParam<Brand>{

  constructor(private httpClient: HttpClient) { }

  findAllByParam(field: string, value: string): Observable<Brand[]> {
    return this.httpClient.get<Brand[]>(`${BACKEND_URL}/appliances/brands`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }
}
