import { Component, OnInit, ViewChild } from '@angular/core';
import { Client } from "../../../models";
import { NgForm } from "@angular/forms";

@Component({
  selector: 'app-client-form',
  templateUrl: './client-form.component.html',
  styleUrls: ['./client-form.component.css']
})
export class ClientFormComponent implements OnInit {
  @ViewChild('addClientForm') addClientForm!: NgForm;
  client: Client = new Client();

  constructor() { }

  ngOnInit(): void {
  }

}
