import { Component, OnInit } from '@angular/core';
import { ClientsService } from "./clients.service";
import { Observable } from "rxjs";
import { Client } from "./models";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  clients: Observable<Client[]> | null = null;

  constructor(private clientsService: ClientsService) {  }

  ngOnInit(): void {
    this.clients = this.clientsService.getAllClients();
  }
}
