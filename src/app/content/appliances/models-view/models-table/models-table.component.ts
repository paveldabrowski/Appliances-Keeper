import { Component, ElementRef, ViewChild } from '@angular/core';
import { TableShapeResolver } from "../../../TableShapeResolver";
import { Model } from "../../models";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTable } from "@angular/material/table";
import { MessageService } from "../../../../message.service";
import { ModelsService } from "../../services/models.service";
import { MODEL_COLUMNS } from "./models-columns";

@Component({
  selector: 'app-models-table',
  templateUrl: './models-table.component.html',
  styleUrls: ['./models-table.component.css']
})
export class ModelsTableComponent extends TableShapeResolver<Model> {
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild('input') searchField!: ElementRef;
  @ViewChild(MatSort) sort!: MatSort;
  @ViewChild(MatTable) table!: MatTable<Model>;

  constructor(public modelsService: ModelsService, messageService: MessageService ) {
    super(modelsService, messageService, MODEL_COLUMNS);
  }
}
