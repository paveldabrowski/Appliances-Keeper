import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsService } from "./content/clients/clients.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Routes } from "@angular/router";
import { DrawerComponent } from './drawer/drawer.component';
import { ContentModule } from "./content/content.module";
import { TitleService } from "./title.service";
import { HomePageComponent } from "./home-page/home-page.component";
import { ToastrModule } from "ngx-toastr";
import { MessageService } from "./message.service";
import { ErrorHandlingInterceptor } from "./error-handling.interceptor";

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
    ToastrModule.forRoot(),
    RouterModule.forRoot(routes)
  ],
  providers: [
    TitleService,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi:true}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
