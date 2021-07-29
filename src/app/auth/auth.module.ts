import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { AuthService } from "./auth.service";
import { TokenStorageService } from "./token-storage.service";
import { AuthGuard } from "./auth.guard";



@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent
  ],
  imports: [
    CommonModule
  ],
  providers: [AuthService, TokenStorageService, AuthGuard]
})
export class AuthModule { }
