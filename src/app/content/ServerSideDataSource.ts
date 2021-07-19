import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Observable, of } from "rxjs";
import { ServiceKeeper } from "./model";
import { MessageService } from "../message.service";
import { catchError, finalize, map, take } from "rxjs/operators";

export class ServerSideDataSource<T> implements DataSource<T> {

  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private data: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([]);
  loading$ = this.loadingSubject.asObservable();
  length: number = 0;

  constructor(private service: ServiceKeeper<T>, private messageService: MessageService) {
  }

  connect(collectionViewer: CollectionViewer): Observable<T[]> {
    return this.data.asObservable();
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.loadingSubject.complete();
    this.data.complete();
  }

  loadData(sortBy: string = "id", sortDirection: string = "asc", searchTerm: string = "", page: number = 0,
           size: number = 10): void {
    this.loadingSubject.next(true);

    this.service.findSearchedPaginatedSorted(sortBy, sortDirection, searchTerm, page, size).pipe(
      map(value => {
        this.length = value.totalElements;
        return value.content;
      }),
      catchError(err => of(err)),
      finalize(() => this.loadingSubject.next(false)),
      take(1)
    )
      .subscribe(data => {
          this.data.next(data);
        },
        error => {
          this.messageService.notifyError(`Error while trying to fill table with ${ this.toString() } data`);
          console.log(error);
        });
  };
}
