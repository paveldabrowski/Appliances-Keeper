import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../auth.service";
import { TokenStorageService } from "../token-storage.service";
import { FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { LoginCredentials, UserRoles } from "../models";
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

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
  roles: UserRoles[] | undefined = [];

  loginGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  constructor(private authService: AuthService,
              private tokenStorage: TokenStorageService,
              private fb: FormBuilder,
              private router: Router) {
  }

  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser()?.roles;
    }
  }

  onSubmit(): void {
    this.authService.login(this.loginGroup.value as LoginCredentials).subscribe(
      user => {
        console.log(user);
        this.tokenStorage.saveToken(user.accessToken);
        this.tokenStorage.saveUser(user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser()?.roles;
        this.router.navigate(["/content"]);
      },
      () => {
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }

  resetForm() {
    this.formGroupDirective.resetForm();
    this.isLoginFailed = false;
  }
}
