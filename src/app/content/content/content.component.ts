import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'content-component',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.css']
})
export class ContentComponent implements OnInit {

  @Output('navbar-title') navbarTitle: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  ngOnInit(): void {
  }

  changeNavbarTitle($event: string) {
    this.navbarTitle.emit($event)
  }
}
