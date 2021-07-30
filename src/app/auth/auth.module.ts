import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
import { AuthGuard } from "./auth.guard";
import { MatInputModule } from "@angular/material/input";
import { ReactiveFormsModule } from "@angular/forms";


@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatInputModule
  ],
  providers: [AuthService, TokenStorageService, AuthGuard]
})
export class AuthModule { }
