import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from "@angular/forms";
import { Client } from "../Client";
import { ClientType } from '../models';

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @ViewChild('addClientForm') addClientForm!: NgForm;
  @Output('newClient') clientAdded: EventEmitter<Client> = new EventEmitter<Client>();
  client: Client = new Client();
  ClientType = ClientType;

  constructor() { }

  ngOnInit(): void {
  }

  addNewClient() {

    this.clientAdded.emit(this.client.formatToTitleCase());
    this.addClientForm.resetForm();
  }

}
