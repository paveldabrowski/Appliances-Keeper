import { Injectable } from '@angular/core';
import { Commission } from "./Commission";
import { HttpClient } from "@angular/common/http";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable } from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CommissionsService {

  constructor(private httpClient: HttpClient) { }

  updateCommission(commission: Commission): Observable<Commission> {
    return this.httpClient.patch<Commission>(`${BACKEND_URL}/commissions/${commission.id}`, commission);
  }
}
