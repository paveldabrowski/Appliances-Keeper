import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { AuthService } from "../service/auth.service";
import { TokenStorageService } from "../service/token-storage.service";
import { FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { LoginCredentials, UserRoles } from "../models";
import { Router } from "@angular/router";
import { BehaviorSubject, Observable, of, Subscription } from "rxjs";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective) formGroupDirective!: FormGroupDirective;
  @ViewChild("submitButton") submitButton!: ElementRef;
  loginGroup = this.fb.group({
    username: [null, [Validators.required]],
    password: [null, [Validators.required]]
  });

  isLoggedIn = false;
  isLoginFailed = false;
  roles: UserRoles[] | undefined = [];
  subscriptions: Subscription = new Subscription();
  private loadingSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  loading$: Observable<boolean> = this.loadingSubject.asObservable();

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
    this.loadingSubject.next(true);
    this.submitButton.nativeElement.disabled = true;
    this.subscriptions.add(this.authService.login(this.loginGroup.value as LoginCredentials).subscribe(
      user => {
        // console.log(user);
        this.tokenStorage.saveToken(user.accessToken);
        this.tokenStorage.saveUser(user);
        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser()?.roles;
        this.router.navigate(["/content"]);
      },
      () => {
        this.isLoginFailed = true;
        this.loadingSubject.next(false);
        this.submitButton.nativeElement.disabled = false;
      }
    ));
  }

  reloadPage(): void {
    window.location.reload();
  }

  resetForm() {
    this.formGroupDirective.resetForm();
    this.isLoginFailed = false;
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.loadingSubject.complete();
  }
}
