import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { fromEvent, merge, Subscription } from "rxjs";
import { Commission } from "../Commission";
import { CommissionsService } from "../commissions.service";
import { Client } from "../../clients/Client";
import { COMMISSIONS_COLUMNS } from "../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MessageService } from "../../../message.service";
import { debounceTime, distinctUntilChanged, tap } from "rxjs/operators";
import { ServerSideDataSource } from "../../ServerSideDataSource";
import { TableShapeResolver } from "../../TableShapeResolver";

@Component({
  selector: 'com-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent implements TableShapeResolver<Commission> {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commission>;
  @ViewChild('input') searchField!: ElementRef;
  dataSource!: ServerSideDataSource<Commission>;
  searchTerm: any;
  selectedCommission: Commission | null = null;
  columns = COMMISSIONS_COLUMNS;
  subscriptions!: Subscription[];

  constructor(private commissionService: CommissionsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataSource = new ServerSideDataSource<Commission>(this.commissionService, this.messageService);
    this.dataSource.loadData();
  }

  loadData(): void {
    this.dataSource.loadData(this.sort.active, this.sort.direction, this.searchTerm,
      this.paginator.pageIndex, this.paginator.pageSize);
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

  selectRow(commission: Commission): void {
    if (this.selectedCommission === commission) {
      this.selectedCommission = null;
    } else
      this.selectedCommission = commission;
  }

  onSearchClear() {
    this.searchTerm = "";
    this.loadData()
  }

  ngOnDestroy(): void {
    if (this.subscriptions)
      this.subscriptions.forEach(value => value.unsubscribe());
  }
}



