import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients.component";
import { ContentComponent } from "../content.component";
import { ClientFormComponent } from "./client-form/client-form.component";
import { ClientsTableComponent } from "./clients-table/clients-table.component";
import { EditClientComponent } from "./edit-client/edit-client.component";
import { ConfirmDeletionDialogComponent } from "./confirm-deletion-dialog/confirm-deletion-dialog.component";
import { CommissionsPreviewComponent } from "./commissions-preview/commissions-preview.component";
import { CommissionDetailsComponent } from "./commissions-preview/commission-deatails/commission-details.component";
import { ClientsService } from "./clients.service";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";
import { MatDialogModule } from "@angular/material/dialog";
import { MatTableModule } from "@angular/material/table";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatInputModule } from "@angular/material/input";
import { MatSortModule } from "@angular/material/sort";
import { MatExpansionModule } from "@angular/material/expansion";



@NgModule({
  declarations: [
    ClientsComponent,
    ContentComponent,
    ClientFormComponent,
    ClientsTableComponent,
    EditClientComponent,
    ConfirmDeletionDialogComponent,
    CommissionsPreviewComponent,
    CommissionDetailsComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MatDialogModule,
    MatTableModule,
    MatCheckboxModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    MatSortModule,
    MatExpansionModule
  ],
  providers: [
    ClientsService
  ],
  exports: [
    ContentComponent,
    ClientsComponent,
    ClientFormComponent
  ]
})
export class ClientsModule { }
