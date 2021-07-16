import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { TechnicianTerm } from "./models";
import { BACKEND_URL } from "../../../environments/environment";
import { Observable, of } from "rxjs";
import { take } from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class TechniciansTermsService {

  constructor(private httpClient: HttpClient) { }

  updateTechnicianTerm(term: TechnicianTerm | undefined | null): Observable<TechnicianTerm> {
    if (term)
      return this.httpClient.patch<TechnicianTerm>(`${BACKEND_URL}/technicians/terms`, term);
    return of();
  }

  updateTwo(terms: TechnicianTerm[]): Observable<TechnicianTerm>[] {
    return [this.updateTechnicianTerm(terms[0]), this.updateTechnicianTerm(terms[1])];
  }

  reserveTechnicianTerm(term: TechnicianTerm | undefined | null): Observable<TechnicianTerm> {
    if (term) {
      term.isAvailable = !term.isAvailable;
      return this.httpClient.patch<TechnicianTerm>(`${BACKEND_URL}/technicians/terms`, term);
    }
    return of();
  }

  releaseTerm(term: TechnicianTerm | undefined | null): Observable<TechnicianTerm> {
    if (term)
      return this.httpClient.patch<TechnicianTerm>(`${BACKEND_URL}/technicians/terms/${term.id}`, term)
        .pipe(take(1));
    return of();
  }
}
