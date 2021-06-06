import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "./models";
import { BACKEND_URL } from "../environments/environment";
import { Observable } from "rxjs";


@Injectable({
  providedIn: 'root'
})
export class ClientsService {

  constructor(private httpClient: HttpClient) { }

  getAllClients(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BACKEND_URL}/clients`);
  }
}
