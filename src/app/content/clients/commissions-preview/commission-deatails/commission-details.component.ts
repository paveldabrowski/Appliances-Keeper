import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Commission } from "../../../commissions/Commission";
import { Client } from "../../Client";

@Component({
  selector: 'app-commission-deatails',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnInit {
  commission: Commission;
  client: Client;
  constructor(@Inject(MAT_DIALOG_DATA) public data: {commission: Commission, client: Client}) {
    this.commission = data.commission;
    this.client = data.client;
  }

  ngOnInit(): void {
  }

  updateCommission() {

  }
}
