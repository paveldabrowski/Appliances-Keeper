import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { merge, Observable, of as observableOf, ReplaySubject, Subscription } from "rxjs";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { ServiceKeeper } from "../../model";
import { map } from "rxjs/operators";
import { Client } from "../Client";



export class GridDataProvider<T extends Client> extends DataSource<T> {
  subject: ReplaySubject<T[]> = new ReplaySubject<T[]>();
  private subscription: Subscription;
  paginator: MatPaginator | undefined;
  sort: MatSort | undefined;
  filter: string | undefined;
  data: T[] = [];


  constructor(serviceKeeper: ServiceKeeper<T>) {
    super();

    // this.subscription = serviceKeeper.findAll().subscribe(this.subject);
    this.subscription = serviceKeeper.findAll().subscribe(value => this.data.push(...value));
  }

  connect(): Observable<T[]> {
    if (this.paginator && this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.paginator.page, this.sort.sortChange)
        .pipe(map(() => {
          return this.getPagedData(this.getSortedData([...this.data ]));
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }

  private getPagedData(data: T[]): T[] {
    if (this.paginator) {
      const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
      return data.splice(startIndex, this.paginator.pageSize);
    } else {
      return data;
    }
  }




  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: T[]): T[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        // case 'name':
        //   return compare(a.name, b.name, isAsc);
        // case 'id':
        //   return compare(+a.id, +b.id, isAsc);
        default:
          return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */


function compare(a: string | number , b: string | number , isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}


