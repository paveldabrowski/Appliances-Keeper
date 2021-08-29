import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { ApplianceType, Brand, Model } from "../../models";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { ModelsService } from "../../services/models.service";
import { BrandsService } from "../../services/brands.service";
import { Observable, Subject, Subscription } from "rxjs";
import { MatOptionSelectionChange } from "@angular/material/core";
import { TypesService } from "../../services/types.service";
import { MessageService } from "../../../../message.service";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { AddBrandComponent } from "../add-brand/add-brand.component";
import { AddTypeComponent } from "../add-type/add-type.component";
import { UploadFilesComponent } from "../../../../shared/upload-files-component/upload-files.component";
import { HttpEventType } from "@angular/common/http";
import { ModelGroup } from "./model-group";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) form?: FormGroupDirective;
  @ViewChild('modelUpload') modelUpload!: UploadFilesComponent
  brands!: Observable<Brand[]>;
  types!: Observable<ApplianceType[]>;
  brand: Brand | null = null;
  private addModelSubject: Subject<Model> = new Subject<Model>();
  private subscriptions: Subscription = new Subscription();
  modelGroup!: FormGroup
  @Output('modelCreated') modelCreated: EventEmitter<Model> = new EventEmitter<Model>();

  constructor(private modelsService: ModelsService,
              private brandsService: BrandsService,
              private typesService: TypesService,
              private messageService: MessageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.modelGroup = new ModelGroup(this.modelsService, this).modelGroup;
    this.brands = this.brandsService.findAll();
    this.types = this.typesService.findAll();
    this.subscriptions.add(this.addModelSubject.pipe(
      switchMap(model => this.modelsService.addModelWithFiles(model, this.modelUpload.selectedFiles))
    ).subscribe(event => {
      if (event.type === HttpEventType.Response && event.body) {
        const model: Model = event.body;
        this.messageService.notifySuccess(`Model ${ model.name } successful created in brand ${ model.brand?.name }`);
        this.modelCreated.emit(model);
      }
    }, error => {
      this.messageService.notifyError(error.message);
      this.modelCreated.emit(undefined);
      console.log(error);
    }));
  }

  onBrandSelect($event: MatOptionSelectionChange, brand: Brand): void {
    if ($event.source.selected) {
      this.brand = brand;
      this.modelGroup.controls['brand'].patchValue(brand);
      this.modelGroup.controls['name'].enable();
    }
  }

  onTypeSelect($event: MatOptionSelectionChange, type: Brand): void {
    if ($event.source.selected) {
      this.modelGroup.controls['applianceType'].patchValue(type);
    }
  }

  createModel(): void {
    this.addModelSubject.next(this.modelGroup.value as Model);
    this.resetForm();

  }

  resetForm(): void {
    this.form?.resetForm();
    this.disableModelNameControl();
    this.modelUpload.clearUpload();
  }

  disableModelNameControl(): void {
    this.modelGroup.controls['name'].disable();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe()
    this.addModelSubject.complete();
  }

  showAddBrandComponent(): void {
    this.dialog.open(AddBrandComponent, {
      disableClose: true,
      role: "dialog",
      autoFocus: true
    })
  }

  showAddTypeComponent(): void {
    this.dialog.open(AddTypeComponent, {
      disableClose: true,
      role: "dialog",
      autoFocus: true
    })
  }
}
