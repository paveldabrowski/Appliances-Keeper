import { AfterViewInit, ElementRef, OnDestroy, OnInit } from "@angular/core";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { ServerSideDataSource } from "./ServerSideDataSource";
import { Subscription } from "rxjs";

export interface TableShapeResolver<T> extends OnInit, OnDestroy, AfterViewInit {
  sort: MatSort;
  table: MatTable<T>;
  searchField: ElementRef;
  dataSource: ServerSideDataSource<T>;
  searchTerm: any;
  selectedCommission: T | null;
  columns: Array<string>;
  subscriptions: Subscription[];

  selectRow(row: T): void ;
  loadData(): void
  attachListeners(): Subscription[];
  onSearchClear(): void;
}
