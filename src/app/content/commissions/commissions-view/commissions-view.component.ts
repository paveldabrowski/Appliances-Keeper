import { Component } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { COMMISSIONS_COLUMNS } from "../models";

@Component({
  selector: 'app-commissions-view',
  templateUrl: './commissions-view.component.html',
  styleUrls: ['./commissions-view.component.css']
})
export class CommissionsViewComponent implements ContentDescriptor {


  constructor() {
  }

  getTitle(): string {
    return "Commissions";
  }
}


