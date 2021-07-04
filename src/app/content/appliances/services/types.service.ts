import { Injectable } from '@angular/core';
import { GetterByParam, ServiceAsyncValidator } from "../../model";
import { Appliance, ApplianceType } from "../models";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Observable, of } from "rxjs";
import { BACKEND_URL } from "../../../../environments/environment";
import { delay } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TypesService implements GetterByParam<ApplianceType>, ServiceAsyncValidator{

  constructor(private httpClient: HttpClient) { }

  checkIfNameExists(name: string, component?: any): Observable<boolean> {
    if (name) {
      return this.httpClient.get<boolean>(`${ BACKEND_URL }/appliances/types`, {
        params: new HttpParams()
          .set('nameExists', name)
      }).pipe(delay(250));
    } else {
      return of(true);
    }
  }

  findAllByParam(field: string, value: string): Observable<ApplianceType[]> {
    return this.httpClient.get<ApplianceType[]>(`${BACKEND_URL}/appliances/types`,
      {
        params: new HttpParams()
          .set(field, value)
      })
  }

  add(applianceType: ApplianceType) {
    let name = applianceType.name;
    applianceType.name = name?.charAt(0).toUpperCase().concat(name?.slice(1, name?.length));
    return this.httpClient.post<ApplianceType>(`${BACKEND_URL}/appliances/types`, applianceType);
  }

  findAll(): Observable<ApplianceType[]> {
    return this.httpClient.get<ApplianceType[]>(`${BACKEND_URL}/appliances/types`);
  }
}
