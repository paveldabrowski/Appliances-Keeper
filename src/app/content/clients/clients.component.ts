import { AfterViewInit, Component, ViewChild } from '@angular/core';
import { ClientsService } from "./clients.service";
import { ContentDescriptor } from "../model";
import { ClientFormComponent } from "./client-form/client-form.component";
import { NgForm } from "@angular/forms";
import { catchError } from "rxjs/operators";
import { MessageService } from "../../message.service";
import { ClientsTableComponent } from "./clients-table/clients-table.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDeletionDialogComponent } from "./confirm-deletion-dialog/confirm-deletion-dialog.component";
import { CommissionsPreviewComponent } from "./commissions-preview/commissions-preview.component";
import { Client } from "./Client";


@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements ContentDescriptor, AfterViewInit {
  @ViewChild('addClientDiv') addClientDiv!: ClientFormComponent;
  @ViewChild(ClientsTableComponent) tableComponent!: ClientsTableComponent;
  @ViewChild('editClientComponent') editClientComponent!: EditClientComponent;
  @ViewChild('previewComponent') commissionsPreviewComponent!: CommissionsPreviewComponent;
  private clientsForm!: NgForm;

  constructor(private clientsService: ClientsService,
              private messageService: MessageService,
              private dialog: MatDialog
  ) {
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
    ).subscribe(() => {
      this.messageService.notifySuccess("Client added.");
      this.tableComponent.refreshTable();
    });
  }

  private deleteSelectedClient(): void {
    const client = this.tableComponent.selectedClient;
    if (client !== null) {
      this.clientsService.deleteClient(client).subscribe(() => {
          this.messageService.notifySuccess("Client deleted!");
          this.tableComponent.refreshTable();
        },error => {
        this.messageService.notifyError(`Error while trying to delete client. ${error.error}` );
        }
      );
    } else {
      this.messageService.notifyWarning("Client is not selected.")
    }
  }

  populateForms(client: Client | null) {
    if (client !== null) {
      this.editClientComponent.client = client;
      this.commissionsPreviewComponent.populateTable(client);
    } else {
      this.editClientComponent.client = new Client();
      this.commissionsPreviewComponent.populateTable(new Client())
    }
  }

  openConfirmDialog() {
    const dialog: MatDialogRef<ConfirmDeletionDialogComponent, boolean> =
      this.dialog.open(ConfirmDeletionDialogComponent, {role: "alertdialog", disableClose: true})
    dialog.afterClosed().subscribe(value => {
      if (value)
        this.deleteSelectedClient();
    })
  }
}
