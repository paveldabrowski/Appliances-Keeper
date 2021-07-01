import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { ServiceKeeper, Pageable } from "../model";
import { Client } from "./Client";


@Injectable({
  providedIn: 'root'
})
export class ClientsService implements ServiceKeeper<Client> {

  constructor(private httpClient: HttpClient) {
  }

  findAll(): Observable<Client[]> {
    return this.httpClient.get<Client[]>(`${ BACKEND_URL }/clients`);
  }

  addClient(client: Client): Observable<Client> {
    return this.httpClient.post<Client>(`${ BACKEND_URL }/clients`, client);
  }

  deleteClient(selectedClient: Client) {
    return this.httpClient.delete(`${ BACKEND_URL }/clients/${ selectedClient.id }`);
  }

  updateClient(client: Client): Observable<Client> {
    return this.httpClient.patch<Client>(`${ BACKEND_URL }/clients/${ client.id }`, client);
  }

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string, page: number, size: number): Observable<Pageable<Client>> {
    return of();
  }
}
