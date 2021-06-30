import { Injectable } from '@angular/core';
import { Commission } from "./Commission";
import { HttpClient, HttpParams } from "@angular/common/http";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable } from "rxjs";
import { Client } from "../clients/Client";
import { ServiceKeeper, Pageable } from "../model";

@Injectable({
  providedIn: 'root'
})
export class CommissionsService implements ServiceKeeper<Commission> {

  constructor(private httpClient: HttpClient) {
  }

  getCount(): Observable<number> {
    throw new Error('Method not implemented.');
  }

  updateCommission(commission: Commission): Observable<Commission> {
    return this.httpClient.patch<Commission>(`${ BACKEND_URL }/commissions/${ commission.id }`, commission);
  }

  getCommissionsByClient(client: Client): Observable<Commission[]> {
    return this.httpClient.get<Commission[]>(`${ BACKEND_URL }/commissions/client/${ client.id }`);
  }

  findAll(): Observable<Commission[]> {
    return this.httpClient.get<Commission[]>(`${ BACKEND_URL }/commissions`);
  }

  findSearchedPaginatedSortedCommissions(sortBy: string = "id", sortDirection: string = "asc", searchTerm: string = "",
                                         page: number = 0, size: number = 5): Observable<Pageable<Commission>> {
    console.log(sortBy, sortDirection, searchTerm, page, size)
    return this.httpClient.get<Pageable<Commission>>(`${ BACKEND_URL }/commissions`, {
      params: new HttpParams()
        .set("sort", `${ sortBy },${ sortDirection }`)
        .set("page", page.toString())
        .set("size", size.toString())
        .set("searchTerm", searchTerm)
    });
  }

  addCommission(commission: Commission): Observable<Commission> {
    return this.httpClient.post(`${BACKEND_URL}/commissions`, commission);
  }
}
