import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ClientsService } from "../clients.service";
import { TABLE_COLUMNS } from "./models";
import { Client } from "../../../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { Subscription } from "rxjs";
import { MatTableDataSource } from "@angular/material/table";


@Component({
  selector: 'app-clients-table',
  templateUrl: './clients-table.component.html',
  styleUrls: ['./clients-table.component.css']
})
export class ClientsTableComponent implements AfterViewInit, OnDestroy, OnInit {

  // dataSource: ClientsDataSource;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  columns: string[] = TABLE_COLUMNS;
  dataSource!: MatTableDataSource<Client>;
  clients: Client[] = [];
  private subscription!: Subscription;
  // dataSource2: Observable<Client[]>;


  constructor(private clientService: ClientsService) {

  }

  ngAfterViewInit() {
    console.log("View")
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngOnInit(): void {
    console.log("Init");
    this.subscription = this.clientService.getAllClients().subscribe( value => this.clients = value);
    console.log(this.clients);
    this.dataSource = new MatTableDataSource(this.clients);
  }
}
