import { MatTableDataSource } from "@angular/material/table";
import { DataSource } from "@angular/cdk/collections";
import { BehaviorSubject, Subscription } from "rxjs";
import { ServiceKeeper } from "../../model";

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
