import { CollectionViewer, DataSource } from "@angular/cdk/collections";
import { Client } from "../../../models";
import { Observable, ReplaySubject, Subscription } from "rxjs";
import { ClientsService } from "../clients.service";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";


export class ClientsDataSource<T> extends DataSource<Client> {
  private subject: ReplaySubject<Client[]> = new ReplaySubject<Client[]>();
  private subscription: Subscription;
  paginator!: MatPaginator;
  sort!: MatSort;
  filter: any;

  constructor(private clientService: ClientsService) {
    super();
    this.subscription = clientService.getAllClients().subscribe(this.subject);
  }

  connect(collectionViewer: CollectionViewer): Observable<Client[]> {
    return this.subject;
  }

  disconnect(collectionViewer: CollectionViewer): void {
    this.subscription.unsubscribe();
  }


}
