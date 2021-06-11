import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Client } from "../../models";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable } from "rxjs";
import { ServiceKeeper } from "../model";


@Injectable({
  providedIn: 'root'
})
export class ClientsService implements ServiceKeeper<Client> {

  constructor(private httpClient: HttpClient) { }

  findAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${BACKEND_URL}/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${BACKEND_URL}/clients`, client);
  }

  deleteClient(selectedClient: Client) {
    return this.httpClient.delete(`${BACKEND_URL}/clients/${selectedClient.id}`);
  }
}
