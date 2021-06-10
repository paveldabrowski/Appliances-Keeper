import { AfterViewInit, Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { Client } from "../../models";
import { ClientsService } from "../../clients.service";
import { ContentDescriptor } from "../model";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements ContentDescriptor, OnInit {
  client: Client | undefined;

  clients: Observable<Client[]> | null = null;

  constructor(private clientsService: ClientsService) {
  }

  ngOnInit(): void {
    this.clients = this.clientsService.getAllClients();
  }

  getTitle(): string {
    return "Clients";
  }

  addClient(addClientDiv: NgForm) {
    this.client = new Client();
    addClientDiv.resetForm();
  }
}
