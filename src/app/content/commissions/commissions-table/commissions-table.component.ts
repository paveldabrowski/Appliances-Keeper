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

@Component({
  selector: 'com-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent implements OnInit, OnDestroy, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commission>;
  @ViewChild('input') searchField!: ElementRef;
  dataSource!: ServerSideDataSource<Commission>;
  searchKey: any;
  selectedClient: Client | null = null;
  columns = COMMISSIONS_COLUMNS;
  private subscriptions: Subscription[] = [];

  constructor(private commissionService: CommissionsService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.dataSource = new ServerSideDataSource<Commission>(this.commissionService, this.messageService);
    this.dataSource.loadData();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
  }

  selectClient(client: Client): void {
    if (this.selectedClient === client) {
      this.selectedClient = null;
    } else
      this.selectedClient = client;
  }

  ngAfterViewInit(): void {
    this.subscriptions.push(this.sort.sortChange.subscribe(() => this.paginator.pageIndex = 0));

    this.subscriptions.push(fromEvent(this.searchField.nativeElement, 'keyup')
      .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
          this.paginator.pageIndex = 0;
          this.loadData();
        })
      )
      .subscribe());

    this.subscriptions.push(merge(this.sort.sortChange, this.paginator.page)
      .pipe(
        tap(() => this.loadData())
      )
      .subscribe());
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



