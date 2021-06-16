import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients/clients.component";
import { ContentComponent } from './content.component';
import { RouterModule, Routes } from "@angular/router";
import { ClientsService } from "./clients/clients.service";
import { HomePageComponent } from '../home-page/home-page.component';
import { FormsModule } from "@angular/forms";
import { ClientFormComponent } from './clients/client-form/client-form.component';
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { ClientsTableComponent } from './clients/clients-table/clients-table.component';
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { EditClientComponent } from './clients/edit-client/edit-client.component';
import { ConfirmDeletionDialogComponent } from './clients/confirm-deletion-dialog/confirm-deletion-dialog.component';
import { MatDialogModule } from "@angular/material/dialog";
import { CommissionsPreviewComponent } from './clients/commissions-preview/commissions-preview.component';
import { MatCheckboxModule } from "@angular/material/checkbox";
import { CommissionDetailsComponent } from './clients/commissions-preview/commission-deatails/commission-details.component';
import { MatExpansionModule } from "@angular/material/expansion";

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    children: [
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'home',
        component: HomePageComponent
      }
    ]
  }
]

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
  exports: [
    ContentComponent,
    ClientsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule,
        MatTableModule,
        MatSortModule,
        MatSliderModule,
        MatFormFieldModule,
        MatInputModule,
        MatPaginatorModule,
        MatIconModule,
        MatButtonModule,
        MatTooltipModule,
        MatDialogModule,
        MatCheckboxModule,
        MatExpansionModule
    ],
  providers: [
    ClientsService
  ]
})
export class ContentModule { }
