import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from "@angular/router";
import { Location } from "@angular/common";

@Component({
  selector: 'app-not-found',
  templateUrl: './not-found.component.html',
  styleUrls: ['./not-found.component.css']
})
export class NotFoundComponent implements OnInit {

  private readonly canGoBack: boolean;

  constructor(private location: Location, private readonly router: Router, private route: ActivatedRoute) {
    this.canGoBack = !!(this.router.getCurrentNavigation()?.previousNavigation);
  }

  ngOnInit(): void {
  }

  goHome(): void {
    this.router.navigate(['/login'], {relativeTo: this.route});
  }

  goBack(): void {
    if (this.canGoBack) {
      this.location.back();
    } else {
      this.router.navigate(['']);
    }
  }
}
