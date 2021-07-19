import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Inject,
  Injectable,
  OnDestroy,
  OnInit, Output
} from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ServerSideDataSource } from "./ServerSideDataSource";
import { fromEvent, merge, Subscription } from "rxjs";
import { ServiceKeeper } from "./model";
import { MessageService } from "../message.service";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { MatPaginator } from "@angular/material/paginator";
import { Commission } from "./commissions/Commission";


@Component({
  template: ''
})
export abstract class TableShapeResolver<T> implements OnInit, OnDestroy, AfterViewInit {
  abstract paginator: MatPaginator;
  abstract sort: MatSort;
  abstract table: MatTable<T>;
  abstract searchField: ElementRef;
  dataSource!: ServerSideDataSource<T>;
  searchTerm: any;
  selectedRow: T | null = null;
  subscriptions: Subscription[] = [];
  columns: Array<string>;
  @Output("rowSelected") rowSelected: EventEmitter<T> = new EventEmitter<T>();

  protected constructor(@Inject("serviceKeeper") private serviceKeeper: ServiceKeeper<T>,
                        private messageService: MessageService, columns: Array<string>) {
    this.columns = columns;
  }

  ngOnInit(): void {
    this.dataSource = this.initTable();
  }

  initTable(): ServerSideDataSource<T> {
      const dataSource = new ServerSideDataSource<T>(this.serviceKeeper, this.messageService);
      dataSource.loadData();
      return dataSource;
  }

  ngOnDestroy(): void {
    if (this.subscriptions)
      this.subscriptions.forEach(value => value.unsubscribe());
  }

  ngAfterViewInit(): void {
    this.subscriptions = this.attachListeners();
  }

  attachListeners(): Subscription[] {
    const subscriptions: Subscription[] = [];
    subscriptions.push(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0));

    subscriptions.push(fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData();
        })
      )
      .subscribe());

    subscriptions.push(merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe());
    return subscriptions;
  }

  loadData(): void {
    this.dataSource.loadData(this.sort.active, this.sort.direction, this.searchTerm,
      this.paginator.pageIndex, this.paginator.pageSize);
  }

  selectRow(row: T): void {
    if (this.selectedRow === row) {
      this.selectedRow = null;
      this.rowSelected.emit(undefined);
    } else {
      this.selectedRow = row;
      this.rowSelected.emit(row);
    }
  }

  refreshTable(): void {
    this.loadData();
  }

  onSearchClear() {
    this.searchTerm = "";
    this.loadData()
  }
}
