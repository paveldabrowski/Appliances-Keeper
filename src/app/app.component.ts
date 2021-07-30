import { ChangeDetectorRef, Component, EventEmitter, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { TitleService } from "./title.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor() {
  }

  ngOnInit(): void {
  }

}
