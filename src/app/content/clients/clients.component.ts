import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Observable, Subject } from "rxjs";
import { Client } from "../../models";
import { ClientsService } from "../../clients.service";
import { ContentDescriptor } from "../model";
import { ClientFormComponent } from "./client-form/client-form.component";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements ContentDescriptor, OnInit, AfterViewInit {
  @ViewChild('addClientDiv') addClientDiv!: ClientFormComponent;

  clients: Observable<Client[]> | null = null;
  private clientsForm!: NgForm;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clients = this.clientsService.getAllClients();
  }

  ngAfterViewInit(): void {
    this.clientsForm = this.addClientDiv.addClientForm;
  }

  getTitle(): string {
    return "Clients";
  }

  addClient() {
    if (this.clientsForm.dirty) {
      console.log("cleared")
      this.clientsForm.resetForm();
    }
  }

  addNewClient(client: Client) {
    console.log(client)
    this.clientsService.addClient(client).subscribe(result => console.log(result),
      error => console.error(error));

  }
}
