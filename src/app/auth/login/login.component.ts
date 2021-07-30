import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../auth.service";
import { TokenStorageService } from "../token-storage.service";
import { FormBuilder, FormGroupDirective } from "@angular/forms";
import { LoginCredentials } from "../models";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  loginGroup = this.fb.group({
    username: null,
    password: null
  });

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {

    this.authService.login(this.loginGroup.value as LoginCredentials).subscribe(
      data => {
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;
        // this.reloadPage();
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  resetForm() {
    this.formGroupDirective.resetForm();
  }

  login() {
    this.authService.login(this.loginGroup.value as LoginCredentials)
  }
}
