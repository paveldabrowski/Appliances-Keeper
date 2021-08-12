import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { MatDialog } from "@angular/material/dialog";
import { AddCommissionComponent } from "./add-commission/add-commission.component";
import { AddApplianceComponent } from "../../appliances/add-appliance/add-appliance.component";
import { Commission } from "../Commission";
import { MessageService } from "../../../message.service";
import { CommissionDetailsComponent } from "../../clients/commissions-preview/commission-deatails/commission-details.component";
import { CommissionsTableComponent } from "../commissions-table/commissions-table.component";
import { Subject, Subscription } from "rxjs";
import { switchMap } from "rxjs/operators";
import { CommissionsService } from "../commissions.service";

@Component({
  selector: 'app-commissions-view',
  templateUrl: './commissions-view.component.html',
  styleUrls: ['./commissions-view.component.css']
})
export class CommissionsViewComponent implements ContentDescriptor, OnInit, OnDestroy {

  @ViewChild(CommissionsTableComponent) tableComponent!: CommissionsTableComponent;
  selectedCommission?: Commission;
  private deleteCommissionSubject: Subject<Commission> = new Subject<Commission>();
  private subscriptions: Subscription = new Subscription();


  constructor(private dialog: MatDialog, private commissionsService: CommissionsService, private messageService: MessageService) {
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  ngOnInit(): void {
    this.subscriptions.add(this.deleteCommissionSubject.pipe(
      switchMap(commission => this.commissionsService.deleteCommission(commission)))
      .subscribe(value => {
        this.tableComponent.refreshTable();
        this.messageService.notifySuccess("Commission deleted!");
      }, error => {
        this.messageService.notifyError("Error while deleting commission.");
        console.log(error.message)
      }));
  }

  getTitle(): string {
    return "Commissions";
  }

  showAddCommissionForm(): void {
    this.dialog.open(AddCommissionComponent, {
      role: "dialog",
      autoFocus: false,
      disableClose: true
    })
  }

  showAddApplianceForm(): void {
    this.dialog.open(AddApplianceComponent, {
      role: "dialog",
      autoFocus: false,
      disableClose: true
    })
  }

  showCommissionDetails(): void {
    if (this.selectedCommission) {
      this.dialog.open(CommissionDetailsComponent, {
        role: "dialog",
        disableClose: true,
        autoFocus: false,
        data: {commission: this.selectedCommission, client: this.selectedCommission.client}
      })
    } else {
      this.messageService.notifyInfo("Select commission to inspect!")
    }
  }

  commissionSelected($event: Commission): void {
    this.selectedCommission = $event;
  }

  deleteCommission() {
    if (this.selectedCommission) {
      this.deleteCommissionSubject.next(this.selectedCommission);
    } else {
      this.messageService.notifyInfo("Select commission to delete!")
    }
  }
}


