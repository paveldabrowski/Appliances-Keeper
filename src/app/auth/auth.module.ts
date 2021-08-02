import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./service/auth.service";
import { TokenStorageService } from "./service/token-storage.service";
import { AuthGuard } from "./guards/auth.guard";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";
import { LoginViewComponent } from './login-view/login-view.component';
import { MatFormFieldModule } from "@angular/material/form-field";


@NgModule({
  declarations: [
    LoginComponent,
    LoginViewComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule,
    MatFormFieldModule
  ],
  providers: [AuthService, TokenStorageService, AuthGuard],
  exports: []
})
export class AuthModule { }
