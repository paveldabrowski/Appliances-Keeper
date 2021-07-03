import { Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { MatDialog } from "@angular/material/dialog";
import { AddCommissionComponent } from "./add-commission/add-commission.component";
import { AddApplianceComponent } from "../../appliances/add-appliance/add-appliance.component";

@Component({
  selector: 'app-commissions-view',
  templateUrl: './commissions-view.component.html',
  styleUrls: ['./commissions-view.component.css']
})
export class CommissionsViewComponent implements ContentDescriptor, OnInit {


  constructor(private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.showAddApplianceForm();
  }

  getTitle(): string {
    return "Commissions";
  }

  showAddCommissionForm() {
    this.dialog.open(AddCommissionComponent, {
      role: "dialog",
      autoFocus: false,
      disableClose: true
    })
  }

  showAddApplianceForm() {
    this.dialog.open(AddApplianceComponent, {
      role: "dialog",
      autoFocus: false,
      disableClose: true
    })
  }
}


