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
import { MatSelectModule } from "@angular/material/select";
import { AddBrandComponent } from './add-appliance/add-brand/add-brand.component';
import { AddTypeComponent } from "./add-appliance/add-type/add-type.component";
import { SharedModule } from "../../shared/shared.module";


@NgModule({
  declarations: [AddApplianceComponent, AddModelComponent, AddBrandComponent, AddTypeComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule


  ],
  providers: [AppliancesService, BrandsService, ModelsService, TypesService]
})
export class AppliancesModule {
}
