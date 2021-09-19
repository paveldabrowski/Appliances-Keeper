import { Observable } from "rxjs";

export interface ContentDescriptor {

 getTitle(): string;

}

export interface ServiceKeeper<T> {

  findAll(): Observable<T[]>;

  findSearchedPaginatedSorted(sortBy: string, sortDirection: string, searchTerm: string,
                              page: number, size: number): Observable<Pageable<T>>;

}

export interface ServiceAsyncValidator {

  checkIfNameExists(name: string, component?: any | null): Observable<boolean>;

}

export interface GetterByParam<T> {

  findAllByParam(field: string, value: string): Observable<T[]>;

}

export interface GetterBySearchTerm<T> {

  findAllBySearchTerm(searchTerm: string | any) : Observable<T[]>;
}


export interface Pageable<T> {
  content: T[],
  empty: boolean,
  first: boolean,
  last: boolean,
  number: number,
  numberOfElements: number
  pageable: any,
  size: number,
  sort: any,
  totalElements: number,
  totalPages: number

}
