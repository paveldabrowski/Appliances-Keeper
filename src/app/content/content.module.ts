import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients/clients.component";
import { ContentComponent } from './content/content.component';
import { RouterModule, Routes } from "@angular/router";
import { ClientsService } from "./clients/clients.service";
import { HomePageComponent } from '../home-page/home-page.component';
import { FormsModule } from "@angular/forms";
import { ClientFormComponent } from './clients/client-form/client-form.component';

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
  declarations: [ClientsComponent, ContentComponent, ClientFormComponent],
  exports: [
    ContentComponent,
    ClientsComponent
  ],
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        FormsModule
    ],
  providers: [
    ClientsService
  ]



})
export class ContentModule { }
