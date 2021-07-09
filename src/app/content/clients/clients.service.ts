import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { ServiceKeeper, Pageable, GetterBySearchTerm } from "../model";
import { Client } from "./Client";


@Injectable({
  providedIn: 'root'
})
export class ClientsService implements ServiceKeeper<Client>, GetterBySearchTerm<Client> {

  constructor(private httpClient: HttpClient) {
  }

  findAllBySearchTerm(searchTerm: string | any): Observable<Client[]> {
    if (searchTerm && !(searchTerm instanceof Object)) {
      searchTerm = searchTerm?.trim().toLowerCase();
      return this.httpClient.get<Client[]>(`${ BACKEND_URL }/clients`, {
        params: new HttpParams()
          .set("searchTerm", searchTerm)
      });
    } else
      return of([]);

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
