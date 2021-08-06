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
import { AuthGuard } from "./auth/guards/auth.guard";
import { AuthModule } from "./auth/auth.module";
import { authInterceptorProviders } from "./auth/interceptors/auth.interceptor";
import { LoginViewComponent } from "./auth/login-view/login-view.component";
import { NotFoundComponent } from './not-found/not-found.component';
import { LoginGuard } from "./auth/guards/login.guard";
import { FileUploadService } from "./file-upload.service";
import { UploadFilesComponent } from './shared/upload-files-component/upload-files.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'login', component: LoginViewComponent, canActivate: [LoginGuard]},
  { path: 'content', loadChildren: () => import('src/app/content/content.module').then(m => m.ContentModule),
    canActivate: [AuthGuard] },

  { path: '**', component: NotFoundComponent}
]

@NgModule({
  declarations: [
    AppComponent,
    HomePageComponent,
    NotFoundComponent,
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
    FileUploadService,
    authInterceptorProviders,
  ],
  exports: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
