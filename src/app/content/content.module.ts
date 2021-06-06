import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients/clients.component";
import { ContentComponent } from './content/content.component';



@NgModule({
  declarations: [ClientsComponent, ContentComponent],
  exports: [
    ContentComponent
  ],
  imports: [
    CommonModule
  ]

})
export class ContentModule { }
