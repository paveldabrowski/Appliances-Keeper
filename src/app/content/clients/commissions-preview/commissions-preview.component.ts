import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { COMMISSIONS_COLUMNS } from "./models";
import { Commission } from "../../commissions/Commission";
import { MatTable } from "@angular/material/table";
import { Client } from "../Client";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { CommissionDetailsComponent } from "./commission-deatails/commission-details.component";
import { MessageService } from "../../../message.service";
import { CommissionsService } from "../../commissions/commissions.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-commissions-preview',
  templateUrl: './commissions-preview.component.html',
  styleUrls: ['./commissions-preview.component.css']
})
export class CommissionsPreviewComponent implements OnInit, OnDestroy {

  COLUMNS: string[] = COMMISSIONS_COLUMNS;
  commissions: Commission[] = [];
  @ViewChild(MatTable) table!: MatTable<Client>;
  @ViewChild("commissionDiv") commissionDiv!: ElementRef;

  selectedRow: any = null;
  client: Client = new Client();
  private subscription!: Subscription;
  private dialogSubscription!: Subscription;

  constructor(private dialog: MatDialog,
              private commissionsService: CommissionsService,
              private messageService: MessageService
  ) {
  }

  ngOnInit(): void {
  }

  populateTable(client: Client): void {
    this.client = client;
    if (client.id) {
      this.subscription = this.commissionsService.getCommissionsByClient(client).subscribe(value => {
        this.commissions = value;
      });
    } else
      this.commissions = [];
    this.selectCommission(null);
  }

  selectCommission(row: any | null) {
    if (this.selectedRow !== row)
      this.selectedRow = row;
    else
      this.selectedRow = null;
  }

  showCommissionDetails() {
    if (this.selectedRow) {
      let convertedCommission = new Commission(this.selectedRow);
      const dialog: MatDialogRef<CommissionDetailsComponent, boolean> =
        this.dialog.open(CommissionDetailsComponent, {
          role: "dialog",
          disableClose: true,
          autoFocus: false,
          data: {commission: convertedCommission, client: this.client}
        });
      this.dialogSubscription = dialog.afterClosed().subscribe(() => this.populateTable(this.client))
    } else
      this.messageService.notifyInfo("Select commission to inspect details.")
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
    if (this.dialogSubscription)
      this.dialogSubscription.unsubscribe();
  }
}
