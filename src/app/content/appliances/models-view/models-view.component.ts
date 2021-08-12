import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Subject, Subscription } from "rxjs";
import { Model } from "../models";
import { ModelsService } from "../services/models.service";
import { MatDialog } from "@angular/material/dialog";
import { AddModelComponent } from "../add-appliance/add-model/add-model.component";
import { switchMap } from "rxjs/operators";
import { MessageService } from "../../../message.service";
import { ModelsTableComponent } from "./models-table/models-table.component";

@Component({
  selector: 'app-models-view',
  templateUrl: './models-view.component.html',
  styleUrls: ['./models-view.component.css']
})
export class ModelsViewComponent implements OnInit, OnDestroy, ContentDescriptor {

  @ViewChild(ModelsTableComponent) tableComponent!: ModelsTableComponent;
  private selectedModel?: Model;
  private subscriptions: Subscription = new Subscription();
  private deleteModelSubject: Subject<Model> = new Subject<Model>();
  private modelCreatedSubject: Subject<Model> = new Subject<Model>();

  constructor(private modelsService: ModelsService, private messageService: MessageService, private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.onModelDelete();
    this.onModelCreate();
  }

  onModelDelete(): void {
    this.subscriptions.add(this.deleteModelSubject.pipe(
      switchMap(model => this.modelsService.deleteModel(model)))
      .subscribe(() => {
        this.tableComponent.refreshTable();
        this.messageService.notifySuccess("Model deleted!");
      }, error => {
        this.messageService.notifyError("Error while deleting model.");
        console.log(error.message)
      }));
  }

  onModelCreate(): void {
    this.subscriptions.add(this.modelCreatedSubject.subscribe(model => {
      if (model) {
        this.tableComponent.refreshTable();
      }
    }));
  }

  getTitle(): string {
    return "Appliances Library";
  }

  modelSelected(model: Model | undefined) {
    this.selectedModel = model;
  }

  showAddModelForm() {
    const matDialogRef = this.dialog.open(AddModelComponent, {role: "dialog", disableClose: true});
    matDialogRef.componentInstance.modelCreated.subscribe(value => this.modelCreatedSubject.next(value))
  }

  deleteModel() {
    if (this.selectedModel) {
      this.deleteModelSubject.next(this.selectedModel);
    } else {
      this.messageService.notifyInfo("Select model to delete!")
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
