import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableShapeResolver } from "../../../TableShapeResolver";
import { Brand } from "../../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { BrandsService } from "../../services/brands.service";
import { MessageService } from "../../../../message.service";

const BRAND_COLUMNS = [
  "id",
  "name"
]

@Component({
  selector: 'app-brands-table',
  templateUrl: './brands-table.component.html',
  styleUrls: ['./brands-table.component.css']
})
export class BrandsTableComponent extends TableShapeResolver<Brand> {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') searchField!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Brand>;


  constructor(public brandsService: BrandsService, messageService: MessageService, ) {
    super(brandsService, messageService, BRAND_COLUMNS);
  }

}
