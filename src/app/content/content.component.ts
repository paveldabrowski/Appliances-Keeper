import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "./model";
import { TitleService } from "../title.service";

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  constructor(private cd: ChangeDetectorRef, private titleService: TitleService) { }

  ngOnInit(): void {

  }

  changeNavbarTitle(event: ContentDescriptor) {
    let title = event.getTitle();
    this.titleService.next(title);
  }
}
