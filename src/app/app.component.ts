import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TitleService } from "./title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  toggled: boolean = true;
  observable: Observable<any>;

  constructor(private cd: ChangeDetectorRef, private titleService: TitleService) {
    this.observable = titleService.select();
  }
  ngOnInit(): void {  }

  toggleSidebar() {
    this.toggled = !this.toggled;
  }
}
