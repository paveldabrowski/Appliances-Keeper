import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsService } from "./clients.service";
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Routes } from "@angular/router";
import { DrawerComponent } from './drawer/drawer.component';
import { ContentModule } from "./content/content.module";
import { TitleService } from "./title.service";
import { HomePageComponent } from "./home-page/home-page.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: "content", loadChildren: () => import('src/app/content/content.module').then(m => m.ContentModule) }
]

@NgModule({
  declarations: [
    AppComponent,
    DrawerComponent,
    HomePageComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    RouterModule.forRoot(routes)
  ],
  providers: [TitleService],
  bootstrap: [AppComponent]
})
export class AppModule { }
