import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TableShapeResolver } from "../../TableShapeResolver";
import { Technician } from "../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { TechniciansService } from "../technicians.service";
import { MessageService } from "../../../message.service";
import { TECHNICIANS_TABLE_COLUMNS } from "./TechniciansTableColumns";

@Component({
  selector: 'app-technicians-table',
  templateUrl: './technicians-table.component.html',
  styleUrls: ['./technicians-table.component.css']
})
export class TechniciansTableComponent extends TableShapeResolver<Technician> {

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') searchField!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Technician>;

  constructor(public techniciansService: TechniciansService, messageService: MessageService) {
    super(techniciansService, messageService, TECHNICIANS_TABLE_COLUMNS)
  }
}
