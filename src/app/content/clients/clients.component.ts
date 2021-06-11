import { AfterViewInit, Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { Client, ClientType } from "../../models";
import { ClientsService } from "./clients.service";
import { ContentDescriptor } from "../model";
import { ClientFormComponent } from "./client-form/client-form.component";
import { NgForm } from "@angular/forms";
import { catchError, switchMap, tap } from "rxjs/operators";
import { MessageService } from "../../message.service";

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}



@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements ContentDescriptor, AfterViewInit {
  @ViewChild('addClientDiv') addClientDiv!: ClientFormComponent;
  private clientsForm!: NgForm;

  selectedClient: Client | null = null;

  constructor(private clientsService: ClientsService, private messageService: MessageService) {
  }

  ngAfterViewInit(): void {
    this.clientsForm = this.addClientDiv.addClientForm;
  }

  getTitle(): string {
    return "Clients";
  }

  clearClientForm(): void {
    if (this.clientsForm.dirty) {
      this.clientsForm.resetForm();
    }
  }

  addNewClient(client: Client): void {
    this.clientsService.addClient(client).pipe(
      catchError(async (err) => {
        this.messageService.notifyError(err.error);
      })
    ).subscribe(() => this.messageService.notifySuccess("Client added."));
  }

  selectClient(client: Client, row: HTMLTableRowElement): void {
    if (this.selectedClient === client) {
      row.classList.remove("selected-row")
      this.selectedClient = null;
    } else
      this.selectedClient = client;
  }

  deleteSelectedClient(): void {
    if (this.selectedClient !== null) {
      this.clientsService.deleteClient(this.selectedClient).subscribe(() => this.messageService.notifySuccess("Client deleted!"),
        () => this.messageService.notifyError("Error while trying to delete client.")
      );
    } else {
      this.messageService.notifyWarning("Client is not selected.")
    }
  }
}
