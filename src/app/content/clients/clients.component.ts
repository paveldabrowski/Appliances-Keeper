import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Client } from "../../models";
import { ClientsService } from "./clients.service";
import { ContentDescriptor } from "../model";
import { ClientFormComponent } from "./client-form/client-form.component";
import { NgForm } from "@angular/forms";
import { catchError, switchMap, tap } from "rxjs/operators";
import { MessageService } from "../../message.service";

@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements ContentDescriptor, AfterViewInit, OnDestroy {
  @ViewChild('addClientDiv') addClientDiv!: ClientFormComponent;

  private refreshToken$ = new BehaviorSubject(undefined);
  clients: Observable<Client[]> = this.refreshToken$.pipe(switchMap(() => this.clientsService.getAllClients()));

  private clientsForm!: NgForm;
  private subscription!: Subscription;
  private selectedClient: Client | null = null;

  constructor(private clientsService: ClientsService, private messageService: MessageService) {
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

  ngAfterViewInit(): void {
    this.clientsForm = this.addClientDiv.addClientForm;
  }

  getTitle(): string {
    return "Clients";
  }

  clearClientForm(): void {
    if (this.clientsForm.dirty) {
      console.log("cleared")
      this.clientsForm.resetForm();
    }
  }

  addNewClient(client: Client): void {
    this.clientsService.addClient(client).pipe(
      catchError(async (err) => {
        this.messageService.notifyError(err.error);
      }),
      tap(() => this.refreshToken$.next(undefined))
    ).subscribe();
  }

  selectClient(client: Client): void {
    this.selectedClient = client;
  }

  deleteSelectedClient(): void {
    if (this.selectedClient !== null) {
      this.clientsService.deleteClient(this.selectedClient).pipe(
        tap(() => this.refreshToken$.next(undefined))
      ).subscribe();
    }
  }
}
