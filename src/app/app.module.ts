import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { HttpClientModule } from "@angular/common/http";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from "@angular/router";
import { TitleService } from "./title.service";
import { HomePageComponent } from "./home-page/home-page.component";
import { ToastrModule } from "ngx-toastr";
import { MessageService } from "./message.service";
import { RegisterComponent } from "./auth/register/register.component";
import { AuthGuard } from "./auth/guards/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { authInterceptorProviders } from "./auth/auth.interceptor";
import { LoginViewComponent } from "./auth/login-view/login-view.component";

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginViewComponent},
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
    authInterceptorProviders,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
