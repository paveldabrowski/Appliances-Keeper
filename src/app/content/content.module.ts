import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClientsComponent } from "./clients/clients.component";
import { ContentComponent } from './content.component';
import { RouterModule, Routes } from "@angular/router";
import { HomePageComponent } from '../home-page/home-page.component';
import { FormsModule } from "@angular/forms";
import { MatTableModule } from "@angular/material/table";
import { MatSortModule } from "@angular/material/sort";
import { MatSliderModule } from "@angular/material/slider";
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckboxModule } from "@angular/material/checkbox";
import { MatExpansionModule } from "@angular/material/expansion";
import { CommissionsModule } from "./commissions/commissions.module";
import { CommissionsViewComponent } from "./commissions/commissions-view/commissions-view.component";
import { ClientsModule } from "./clients/clients.module";
import { DrawerComponent } from "./drawer/drawer.component";
import { AuthGuard } from "../auth/auth.guard";
import { contentErrorInterceptors } from "../error-handling.interceptor";

const routes: Routes = [
  {
    path: '',
    component: ContentComponent,
    canActivateChild: [AuthGuard],
    children: [
      {
        path: 'clients',
        component: ClientsComponent
      },
      {
        path: 'home',
        component: HomePageComponent
      },
      {
        path: 'commissions',
        component: CommissionsViewComponent
      }
    ]
  }
]

@NgModule({
  declarations: [
    DrawerComponent,
    ContentComponent
  ],
  exports: [
    DrawerComponent

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
    MatExpansionModule,
    CommissionsModule,
    ClientsModule
  ],
  providers: [
    contentErrorInterceptors
  ]
})
export class ContentModule {
}
