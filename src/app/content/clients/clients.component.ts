import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Observable } from "rxjs";
import { Client } from "../../models";
import { ClientsService } from "../../clients.service";

@Component({
  selector: 'content-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css']
})
export class ClientsComponent implements OnInit {

  clients: Observable<Client[]> | null = null;

  @Output('navbar-title') navbarTitle: EventEmitter<string> = new EventEmitter<string>();

  constructor(private clientsService: ClientsService) {  }

  ngOnInit(): void {
    this.clients = this.clientsService.getAllClients();
    this.navbarTitle.emit("Clients")
  }
}
