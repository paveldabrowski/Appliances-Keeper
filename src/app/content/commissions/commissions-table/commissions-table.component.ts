import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, fromEvent, merge, Observable, of } from "rxjs";
import { ServiceKeeper } from "../../model";
import { Commission } from "../Commission";
import { CommissionsService } from "../commissions.service";
import { Client } from "../../clients/Client";
import { COMMISSIONS_COLUMNS } from "../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MessageService } from "../../../message.service";
import { catchError, debounceTime, distinctUntilChanged, finalize, map, tap } from "rxjs/operators";

@Component({
  selector: 'com-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commission>;
  @ViewChild('input') searchField!: ElementRef;
  dataSource!: ServerSideDataSource<Commission>;
  searchKey: any;
  selectedClient: Client | null = null;
  columns = COMMISSIONS_COLUMNS;

  constructor(private commissionService: CommissionsService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.dataSource = new ServerSideDataSource<Commission>(this.commissionService, this.messageService);
    this.dataSource.loadData();
  }

  selectClient(client: Client): void {
    if (this.selectedClient === client) {
      this.selectedClient = null;
    } else
      this.selectedClient = client;
    // this.selectedEmitter.emit(this.selectedClient);
  }

  ngAfterViewInit(): void {
    this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0);

    fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData();
        })
      )
      .subscribe();

    merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe();
  }

  private loadData() {
    this.dataSource.loadData(this.sort.active, this.sort.direction, this.searchKey,
      this.paginator.pageIndex, this.paginator.pageSize);
  }

  onSearchClear() {
    this.searchKey = "";
    this.loadData()
  }
}

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
           size: number = 5): void {
    this.loadingSubject.next(true);

    this.service.findSearchedPaginatedSortedCommissions(sortBy, sortDirection, searchTerm, page, size).pipe(
      map(value => {
        this.length = value.totalElements;
        return value.content;
      }),
      catchError(err => of(err)),
      finalize(() => this.loadingSubject.next(false))
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



