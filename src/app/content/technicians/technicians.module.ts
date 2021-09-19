import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechniciansService } from "./technicians.service";
import { TechniciansTermsService } from "./technicians-terms.service";
import { TechniciansViewComponent } from './technicians-view/technicians-view.component';
import { RouterModule } from "@angular/router";
import { TechniciansTableComponent } from './technicians-table/technicians-table.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { TechnicianCalendarComponent } from './technician-calendar/technician-calendar.component';



@NgModule({
  declarations: [
    TechniciansViewComponent,
    TechniciansTableComponent,
    TechnicianCalendarComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule
  ],
  providers: [TechniciansService, TechniciansTermsService]
})
export class TechniciansModule { }
