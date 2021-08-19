import { Component, OnInit } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Brand } from "../models";

@Component({
  selector: 'app-brands-view',
  templateUrl: './brands-view.component.html',
  styleUrls: ['./brands-view.component.css']
})
export class BrandsViewComponent implements OnInit, ContentDescriptor {

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return "Brands";
  }

  brandSelected($event: Brand | undefined) {

  }

  showAddBrand() {

  }

  deleteBrand() {

  }
}
