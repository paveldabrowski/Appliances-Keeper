import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { GetterBySearchTerm } from "../model";
import { Technician } from "./models";
import { Client } from "../clients/Client";
import { BACKEND_URL } from "../../../environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class TechniciansService implements GetterBySearchTerm<Technician> {

  constructor(private httpClient: HttpClient) {
  }

  findAllBySearchTerm(searchTerm: string | any): Observable<Technician[]> {
    console.log(searchTerm)
    if (searchTerm && !(searchTerm instanceof Object)) {
      console.log('w if')
      searchTerm = searchTerm?.trim().toLowerCase();
      return this.httpClient.get<Technician[]>(`${ BACKEND_URL }/technicians`, {
        params: new HttpParams()
          .set("searchTerm", searchTerm)
      });
    } else
      return of([]);
    }
}
