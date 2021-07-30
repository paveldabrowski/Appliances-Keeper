import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ClientsService } from "./content/clients/clients.service";
import { HTTP_INTERCEPTORS, HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSidenavModule } from "@angular/material/sidenav";
import { RouterModule, Routes } from "@angular/router";
import { DrawerComponent } from './content/drawer/drawer.component';
import { ContentModule } from "./content/content.module";
import { TitleService } from "./title.service";
import { HomePageComponent } from "./home-page/home-page.component";
import { ToastrModule } from "ngx-toastr";
import { MessageService } from "./message.service";
import { ErrorHandlingInterceptor } from "./error-handling.interceptor";
import { MatButtonModule } from "@angular/material/button";
import { LoginComponent } from "./auth/login/login.component";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { authInterceptorProviders } from "./auth/auth.interceptor";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginComponent},
  { path: 'register', component: RegisterComponent},
  { path: 'content', loadChildren: () => import('src/app/content/content.module').then(m => m.ContentModule),
    canActivate: [AuthGuard] }
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent
  ],
    imports: [
        BrowserModule,
        HttpClientModule,
        BrowserAnimationsModule,
        ToastrModule.forRoot(),
        RouterModule.forRoot(routes),
        AuthModule
    ],
  providers: [
    TitleService,
    MessageService,
    {provide: HTTP_INTERCEPTORS, useClass: ErrorHandlingInterceptor, multi:true},
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
