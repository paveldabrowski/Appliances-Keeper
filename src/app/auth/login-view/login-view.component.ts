import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Subscription } from "rxjs";

@Component({
  selector: 'app-login-view',
  templateUrl: './login-view.component.html',
  styleUrls: ['./login-view.component.css']
})
export class LoginViewComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  constructor() {
    // this.activatedRoute.data.subscribe(onLoadedData => {
    //   console.log(onLoadedData);
    //   if (onLoadedData.isTokenValid) {
    //     this.router.navigate(['/content']);
    //   }
    // });

  }

  ngOnInit(): void {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
