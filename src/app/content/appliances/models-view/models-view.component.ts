import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Subject, Subscription } from "rxjs";
import { Model } from "../models";
import { ModelsService } from "../services/models.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddModelComponent } from "../add-appliance/add-model/add-model.component";
import { switchMap } from "rxjs/operators";
import { MessageService } from "../../../message.service";
import { ModelsTableComponent } from "./models-table/models-table.component";
import { ConfirmDeletionDialogComponent } from "../../../core/confirm-deletion-dialog/confirm-deletion-dialog.component";
import { ActivatedRoute, Router } from "@angular/router";

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

  constructor(private modelsService: ModelsService, private messageService: MessageService, private dialog: MatDialog,
              private router: Router, private activatedRoute: ActivatedRoute) {
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
      const matDialogRef: MatDialogRef<ConfirmDeletionDialogComponent, boolean> = this.dialog.open(
        ConfirmDeletionDialogComponent, {role: "dialog", disableClose: true, data: {title: "Delete model?"}});
      matDialogRef.afterClosed().subscribe(confirmed => {
        if (confirmed)
          this.deleteModelSubject.next(this.selectedModel);
      })
    } else {
      this.messageService.notifyInfo("Select model to delete!")
    }
  }

  previewModel(): void {
    if (this.selectedModel) {
      this.modelsService.setCurrentModel(this.selectedModel);
      this.router.navigate([`content/appliances/library/${ this.selectedModel?.id }`])
    } else {
      this.messageService.notifyInfo("Select model to preview!")
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }
}
