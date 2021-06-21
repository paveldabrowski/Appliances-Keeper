import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Appliance } from "./models";
import { BACKEND_URL } from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class AppliancesService {

  constructor(private httpClient: HttpClient) { }

  getAllAppliances() :Observable<Appliance[]> {
    return this.httpClient.get<Appliance[]>(`${BACKEND_URL}/appliances`);
  }
}
