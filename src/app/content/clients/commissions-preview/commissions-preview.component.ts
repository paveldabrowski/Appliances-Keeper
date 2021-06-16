import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { COMMISSIONS_COLUMNS } from "./models";
import { Commission } from "../../commissions/Commission";
import { MatTable } from "@angular/material/table";
import { Client } from "../Client";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { ConfirmDeletionDialogComponent } from "../confirm-deletion-dialog/confirm-deletion-dialog.component";
import { CommissionDetailsComponent } from "./commission-deatails/commission-details.component";
import { MessageService } from "../../../message.service";

@Component({
  selector: 'app-commissions-preview',
  templateUrl: './commissions-preview.component.html',
  styleUrls: ['./commissions-preview.component.css']
})
export class CommissionsPreviewComponent implements OnInit {

  COLUMNS: string[] = COMMISSIONS_COLUMNS;
  commissions: Commission[] = [];
  @ViewChild(MatTable) table!: MatTable<Client>;
  @ViewChild("commissionDiv") commissionDiv!: ElementRef;

  selectedCommission: Commission | null = null;
  client: Client = new Client();

  constructor(private dialog: MatDialog, private messageService: MessageService) {
  }


  ngOnInit(): void {
  }

  populateTable(client: Client): void {
    this.client = client;
    if (client.commissionList)
      this.commissions = client.commissionList;
    else
      this.commissions = [];
    this.table.renderRows();
    this.selectCommission(null);
  }

  selectCommission(row: Commission | null) {
    if (this.selectedCommission !== row)
      this.selectedCommission = row;
    else
      this.selectedCommission = null;
  }

  showCommissionDetails() {
    if (this.selectedCommission) {
      const dialog: MatDialogRef<CommissionDetailsComponent, boolean> =
        this.dialog.open(CommissionDetailsComponent, {
          role: "dialog",
          disableClose: true,
          data: {commission: this.selectedCommission, client: this.client}
        });
    } else
      this.messageService.notifyInfo("Select commission to inspect details.")
  }
}
