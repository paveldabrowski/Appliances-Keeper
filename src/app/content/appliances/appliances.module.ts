import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliancesService } from "./services/appliances.service";
import { BrandsService } from "./services/brands.service";
import { ModelsService } from "./services/models.service";
import { TypesService } from "./services/types.service";
import { AddApplianceComponent } from "./add-appliance/add-appliance.component";
import { AddModelComponent } from "./add-appliance/add-model/add-model.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";


@NgModule({
  declarations: [AddApplianceComponent, AddModelComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule
  ],
  providers: [AppliancesService, BrandsService, ModelsService, TypesService]
})
export class AppliancesModule { }
