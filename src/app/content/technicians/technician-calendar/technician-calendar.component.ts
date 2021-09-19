import { Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "../../model";

@Component({
  selector: 'app-technician-calendar',
  templateUrl: './technician-calendar.component.html',
  styleUrls: ['./technician-calendar.component.css']
})
export class TechnicianCalendarComponent implements OnInit, ContentDescriptor {

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return "Calendar";
  }

}
