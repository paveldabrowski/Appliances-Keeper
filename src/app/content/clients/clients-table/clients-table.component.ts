import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from "../clients.service";
import { TABLE_COLUMNS } from "./models";
import { Client } from "../../../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { SelectionModel } from "@angular/cdk/collections";

const initialSelection: Client[] = [];
const allowMultiSelect = false;

@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements AfterViewInit, OnInit, OnDestroy {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Client>;
  columns: string[] = TABLE_COLUMNS;
  dataSource = new MatTableDataSource<Client>();
  private subscription!: Subscription;
  private refreshToken$ = new BehaviorSubject(undefined);
  clients: Observable<Client[]> = this.refreshToken$.pipe(switchMap(() => this.clientsService.findAll()));
  searchKey: string | undefined;
  selectedClient: Client | null = null;
  selection = new SelectionModel<Client>(allowMultiSelect, initialSelection);


  constructor(private clientsService: ClientsService) {}

  ngAfterViewInit() {
    this.buildTable();
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

  selectClient(client: Client, row: HTMLTableRowElement): void {
    if (this.selectedClient === client) {
      row.classList.remove("selected-row")
      this.selectedClient = null;
    } else
      this.selectedClient = client;
  }

  ngOnInit(): void { }

  buildTable(): void {
    this.subscription = this.clients.subscribe(clients => {
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = clients;
    });
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshTable() {
    this.refreshToken$.next(undefined)
  }

  // onSearchClear() {
  //   this.searchKey = undefined;
  // }
}
