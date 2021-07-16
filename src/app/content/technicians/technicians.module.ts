import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TechniciansService } from "./technicians.service";
import { TechniciansTermsService } from "./technicians-terms.service";



@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  providers: [TechniciansService, TechniciansTermsService]
})
export class TechniciansModule { }
