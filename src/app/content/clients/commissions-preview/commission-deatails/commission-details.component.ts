import { Component, Inject, OnDestroy } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Commission } from "../../../commissions/Commission";
import { Client } from "../../Client";
import { CommissionsService } from "../../../commissions/commissions.service";
import { MessageService } from "../../../../message.service";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-commission-deatails',
  templateUrl: './commission-details.component.html',
  styleUrls: ['./commission-details.component.css']
})
export class CommissionDetailsComponent implements OnDestroy {
  commission: Commission;
  client: Client;
  private subscription!: Subscription;

  constructor(private commissionsService: CommissionsService,
              private messageService: MessageService,
              @Inject(MAT_DIALOG_DATA) public data: {commission: Commission, client: Client}) {
    this.commission = data.commission;
    this.client = data.client;
  }

  updateCommission(): void {
    this.commission.client = this.client;
    this.subscription = this.commissionsService.updateCommission(this.commission).subscribe(
      commission => {
        this.messageService.notifySuccess("Commission updated.");
        // this.commission = commission;
      },
      error => {
        this.messageService.notifyError("Error while trying to update Commission!");
        console.log(error);
      }
    )
  }

  ngOnDestroy(): void {
    if (this.subscription)
      this.subscription.unsubscribe();
  }
}
