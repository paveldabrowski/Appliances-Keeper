import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients/clients.component";
import { ContentComponent } from './content/content.component';
import { RouterModule, Routes } from "@angular/router";
import { ClientsService } from "../clients.service";
import { HomePageComponent } from '../home-page/home-page.component';

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
  declarations: [ClientsComponent, ContentComponent],
  exports: [
    ContentComponent,
    ClientsComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes)
  ],
  providers: [
    ClientsService
  ]



})
export class ContentModule { }
