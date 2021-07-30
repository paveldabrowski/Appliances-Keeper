import { Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "../model";

@Component({
  selector: 'app-initial-view',
  templateUrl: './initial-view.component.html',
  styleUrls: ['./initial-view.component.css']
})
export class InitialViewComponent implements OnInit, ContentDescriptor {

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return "Welcome";
  }

}
