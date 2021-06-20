import { Component, ElementRef, ViewChild } from '@angular/core';
import { MatTable } from "@angular/material/table";
import { Commission } from "../Commission";
import { CommissionsService } from "../commissions.service";
import { COMMISSIONS_COLUMNS } from "../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MessageService } from "../../../message.service";
import { ServerSideDataSource } from "../../ServerSideDataSource";
import { TableShapeResolver } from "../../TableShapeResolver";

@Component({
  selector: 'com-commissions-table',
  templateUrl: './commissions-table.component.html',
  styleUrls: ['./commissions-table.component.css']
})
export class CommissionsTableComponent extends TableShapeResolver<Commission> {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Commission>;
  @ViewChild('input') searchField!: ElementRef;

  constructor(commissionService: CommissionsService, messageService: MessageService) {
    super(commissionService, messageService, COMMISSIONS_COLUMNS);
  }

  // selectRow(commission: Commission): void {
  //   super.selectRow(commission)
  // }
  //
  // ngOnDestroy(): void {
  //   if (this.subscriptions)
  //     this.subscriptions.forEach(value => value.unsubscribe());
  // }
}



