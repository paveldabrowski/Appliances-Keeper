import { AfterViewInit, Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ClientsService } from "../clients.service";
import { TABLE_COLUMNS } from "./models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable, MatTableDataSource } from "@angular/material/table";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { Client } from "../Client";

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
  @Output('selectionEvent') selectedEmitter: EventEmitter<Client | null> = new EventEmitter<Client | null>();
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {

  }


  ngAfterViewInit(): void {
    this.buildTable();
  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.setUpFilter(filterValue);
  }

  onSearchClear(): void {
    this.searchKey = ""
    this.setUpFilter(this.searchKey);
  }

  private setUpFilter(text: string): void {
    this.dataSource.filter = text.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  selectClient(client: Client): void {
    if (this.selectedClient === client) {
      this.selectedClient = null;
    } else
      this.selectedClient = client;
    this.selectedEmitter.emit(this.selectedClient);
  }



  buildTable(): void {
    this.loadingSubject.next(true);
    this.subscription = this.clients.subscribe(clients => {
      this.sort.sort({id: "name", start: "asc", disableClear: false});
      this.dataSource.sort = this.sort;
      this.dataSource.paginator = this.paginator;
      this.dataSource.data = clients;
      this.loadingSubject.next(false);
    }, () => {
      this.loadingSubject.next(false);
    });
    this.table.dataSource = this.dataSource;
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  refreshTable() {
    this.loadingSubject.next(true);
    this.refreshToken$.next(undefined);
  }
}
