import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMISSIONS_COLUMNS } from "./models";
import { Commission } from "../../commissions/Commission";
import { Observable, of } from "rxjs";
import { MatTable } from "@angular/material/table";
import { Client } from "../Client";

@Component({
  selector: 'app-commissions-preview',
  templateUrl: './commissions-preview.component.html',
  styleUrls: ['./commissions-preview.component.css']
})
export class CommissionsPreviewComponent implements OnInit {

  COLUMNS: string[] = COMMISSIONS_COLUMNS ;
  commissions: Commission[] = [];
  @ViewChild(MatTable) table!: MatTable<Client>;
  @ViewChild("commissionDiv") commissionDiv!: ElementRef;

  selectedCommission?: Commission;
  client: Client = new Client();
  constructor() {}


  ngOnInit(): void {
  }

  populateTable(client: Client): void {
    this.client = client;
    if (client.commissionList) {
      this.commissions = client.commissionList;
    } else {
      this.commissions = [];
    }
    this.table.renderRows();
  }

  selectClient(row: Commission) {

  }
}
