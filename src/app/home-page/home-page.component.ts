import { AfterContentInit, Component, OnInit } from '@angular/core';
import { TitleService } from "../title.service";

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(private titleService: TitleService) {
    this.titleService.next("Home Page")
  }

  ngOnInit(): void {
  }
}
