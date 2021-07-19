import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsViewComponent } from './commissions-view/commissions-view.component';
import { CommissionsTableComponent } from './commissions-table/commissions-table.component';
import { AddCommissionComponent } from './commissions-view/add-commission/add-commission.component';
import { ClientsService } from "../clients/clients.service";
import { CommissionsService } from "./commissions.service";
import { AppliancesModule } from "../appliances/appliances.module";
import { MatFormFieldModule } from "@angular/material/form-field";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule } from "@angular/material/dialog";
import { TechniciansModule } from "../technicians/technicians.module";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { HourSchedulerComponent } from './hour-secheduler/hour-scheduler.component';
import { MatGridListModule } from "@angular/material/grid-list";
import { MatListModule } from "@angular/material/list";
import { ClientsModule } from "../clients/clients.module";
import { RouterModule } from "@angular/router";
import { MatCheckboxModule } from "@angular/material/checkbox";


@NgModule({
  declarations: [
    CommissionsViewComponent,
    CommissionsTableComponent,
    AddCommissionComponent,
    HourSchedulerComponent
  ],
  imports: [
    CommonModule,
    AppliancesModule,
    ClientsModule,
    TechniciansModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatPaginatorModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    MatSortModule,
    MatButtonModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatGridListModule,
    MatListModule,
    RouterModule,
    MatCheckboxModule

  ],
  providers: [
    ClientsService,
    CommissionsService,
  ]
})
export class CommissionsModule {
}
