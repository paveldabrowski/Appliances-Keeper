import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppliancesService } from "./services/appliances.service";
import { BrandsService } from "./services/brands.service";
import { ModelsService } from "./services/models.service";
import { TypesService } from "./services/types.service";
import { AddApplianceComponent } from "./add-appliance/add-appliance.component";
import { AddModelComponent } from "./add-appliance/add-model/add-model.component";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatAutocompleteModule } from "@angular/material/autocomplete";
import { MatInputModule } from "@angular/material/input";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSelectModule } from "@angular/material/select";
import { AddBrandComponent } from './add-appliance/add-brand/add-brand.component';
import { AddTypeComponent } from "./add-appliance/add-type/add-type.component";
import { SharedModule } from "../../shared/shared.module";
import { ModelsViewComponent } from './models-view/models-view.component';
import { AuthModule } from "../../auth/auth.module";
import { ModelsTableComponent } from './models-view/models-table/models-table.component';
import { MatIconModule } from "@angular/material/icon";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatButtonModule } from "@angular/material/button";
import { ModelDetailsComponent } from './models-view/model-details/model-details.component';
import { ModelImagesResolver } from "./models-view/model-details/model-images.resolver";
import { NgImageSliderModule } from "ng-image-slider";




@NgModule({
  declarations: [
    AddApplianceComponent,
    AddModelComponent,
    AddBrandComponent,
    AddTypeComponent,
    ModelsViewComponent,
    ModelsTableComponent,
    ModelDetailsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatInputModule,
    MatDialogModule,
    MatSelectModule,
    SharedModule,
    AuthModule,
    FormsModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatButtonModule,
    NgImageSliderModule


  ],
  providers: [AppliancesService, BrandsService, ModelsService, TypesService, ModelImagesResolver]
})
export class AppliancesModule {
}
