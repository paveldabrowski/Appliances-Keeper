import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Subscription } from "rxjs";
import { ServiceKeeper } from "../../model";
import { Commission } from "../Commission";
import { CommissionsService } from "../commissions.service";
import { Client } from "../../clients/Client";
import { COMMISSIONS_COLUMNS } from "../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";

@Component({
  selector: 'com-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent implements OnInit, AfterViewInit {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commission>;
  dataSource: MyDataSource<Commission>;
  searchKey: any;
  selectedClient: Client | null = null;
  columns = COMMISSIONS_COLUMNS;

  constructor(private commissionService: CommissionsService) {
    this.dataSource = new MyDataSource<Commission>(commissionService);
  }

  ngOnInit(): void {
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setUpFilter(filterValue);
  }

  onSearchClear() {
    this.searchKey = ""
    this.setUpFilter(this.searchKey);
  }

  private setUpFilter(text: string): void {
    this.dataSource.filter = text.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectClient(client : Client): void {
    if (this.selectedClient === client) {
      this.selectedClient = null;
    } else
      this.selectedClient = client;
    // this.selectedEmitter.emit(this.selectedClient);
  }


  ngAfterViewInit(): void {
    this.buildTable();
  }

  buildTable(): void {

      // this.sort.sort({id: "creationDate", start:"asc", disableClear: false});
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      // this.dataSource.data = clients;

    this.table.dataSource = this.dataSource;
  }



}

export class MyDataSource<T> extends MatTableDataSource<T> implements DataSource<T> {
  private subject: BehaviorSubject<T[]> = new BehaviorSubject<T[]>([])
  private subscription: Subscription;

  constructor(private serviceKeeper: ServiceKeeper<T>) {
    super();
    this.subscription = serviceKeeper.findAll().subscribe(this.subject);
  }


  connect(): BehaviorSubject<T[]> {
    return this.subject;
  }

  disconnect() {
    super.disconnect();
    this.subscription.unsubscribe();
  }
}
