import { Component, OnInit } from '@angular/core';

import { ClientsService } from "../clients.service";
import { MessageService } from "../../../message.service";
import { Client } from "../Client";
import { ClientType } from '../models';

@Component({
  selector: 'app-edit-client',
  templateUrl: './edit-client.component.html',
  styleUrls: ['./edit-client.component.css']
})
export class EditClientComponent implements OnInit {
  client: Client = new Client();
  ClientType = ClientType;

  constructor(private clientService: ClientsService, private messageService: MessageService) { }

  ngOnInit(): void {
  }

  updateClientData() {
    if (this.client.id) {
      this.clientService.updateClient(this.client).subscribe(
        () => {
          this.messageService.notifySuccess("Client has been updated.");
          this.client = new Client();
        },
        error => {
          console.log(error);
          this.messageService.notifyError("Error while trying to update client.");
        }
      );
    } else {
      this.messageService.notifyError("Probably this client is not in database. You need to add this client in another form")
    }
  }
}
