import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { GetterByParam } from "../model";
import { Model } from "./models";
import { Observable } from "rxjs";
import { BACKEND_URL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ModelsService implements GetterByParam<Model> {

  constructor(private httpClient: HttpClient) { }

  findAllByParam(field: string, value: string): Observable<Model[]> {
    return this.httpClient.get<Model[]>(`${BACKEND_URL}/appliances/models`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }


}
