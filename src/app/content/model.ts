import { Observable } from "rxjs";

export interface ContentDescriptor {

  getTitle(): string;
}

export interface ServiceKeeper<T> {

  findAll(): Observable<T[]>;

  findSearchedPaginatedSortedCommissions( sortBy: string, sortDirection: string, searchTerm: string,
                                          page: number, size: number): Observable<SortFilterPage<T>>;
}

export interface SortFilterPage<T> {
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
