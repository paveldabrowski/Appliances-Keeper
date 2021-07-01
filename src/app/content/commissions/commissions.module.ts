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
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatSidenavModule } from "@angular/material/sidenav";
import { AddCommissionComponent } from './commissions-view/add-commission/add-commission.component';
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { ClientsService } from "../clients/clients.service";
import { CommissionsService } from "./commissions.service";
import { BrandsService } from "../appliances/brands.service";
import { ModelsService } from "../appliances/models.service";
import { TypesService } from "../appliances/types.service";
import { AppliancesService } from "../appliances/appliances.service";
import { AddApplianceComponent } from './commissions-view/add-appliance/add-appliance.component';
import { MatSelectModule } from "@angular/material/select";


@NgModule({
  declarations: [
    CommissionsViewComponent,
    CommissionsTableComponent,
    AddCommissionComponent,
    AddApplianceComponent
  ],
    imports: [
        CommonModule,
        MatTableModule,
        MatSortModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        MatPaginatorModule,
        FormsModule,
        MatProgressSpinnerModule,
        MatSidenavModule,
        MatAutocompleteModule,
        ReactiveFormsModule,
        ScrollingModule,
        MatSelectModule
    ],
  providers: [
    ClientsService,
    CommissionsService,
    AppliancesService,
    BrandsService,
    ModelsService,
    TypesService
  ]
})
export class CommissionsModule {
}
