import { Injectable } from '@angular/core';
import { GetterByParam } from "../model";
import { ApplianceType } from "./models";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class TypesService implements GetterByParam<ApplianceType> {

  constructor(private httpClient: HttpClient) { }

  findAllByParam(field: string, value: string): Observable<ApplianceType[]> {
    return this.httpClient.get<ApplianceType[]>(`${BACKEND_URL}/appliances/types`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }
}
