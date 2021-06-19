import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CommissionsViewComponent } from './commissions-view/commissions-view.component';
import { CommissionsTableComponent } from './commissions-table/commissions-table.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatPaginatorModule } from "@angular/material/paginator";
import { FormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    CommissionsViewComponent,
    CommissionsTableComponent
  ],
  imports: [
    CommonModule,
    MatTableModule,
    MatSortModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    FormsModule
  ]
})
export class CommissionsModule { }
