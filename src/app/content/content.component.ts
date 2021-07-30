import { AfterViewInit, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "./model";
import { TitleService } from "../title.service";
import { Observable } from "rxjs";
import { AuthService } from "../auth/auth.service";

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  toggled: boolean = true;
  observable?: Observable<any>;

  constructor(private cd: ChangeDetectorRef, private titleService: TitleService, private authService: AuthService) {
    this.observable = this.titleService.select();
    this.titleService.next("Welcome")
  }

  ngOnInit(): void {
  }

  changeNavbarTitle(event: ContentDescriptor): void {
    let title = event.getTitle();
    this.titleService.next(title);
  }

  toggleSidebar(): void {
    this.toggled = !this.toggled;
  }

  logout(): void {
    this.authService.logout();
  }
}
