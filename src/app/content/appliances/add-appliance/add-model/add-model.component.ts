import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ApplianceType, Brand, Model } from "../../models";
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { ModelsService } from "../../services/models.service";
import { BrandsService } from "../../services/brands.service";
import { Observable, Subject, Subscription } from "rxjs";
import { MatOptionSelectionChange } from "@angular/material/core";
import { TypesService } from "../../services/types.service";
import { ModelNameValidator } from "./ModelNameValidator";
import { MessageService } from "../../../../message.service";
import { switchMap } from "rxjs/operators";
import { MatDialog } from "@angular/material/dialog";
import { AddBrandComponent } from "../add-brand/add-brand.component";
import { AddTypeComponent } from "../add-type/add-type.component";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) form?: FormGroupDirective;
  brands!: Observable<Brand[]>;
  types!: Observable<ApplianceType[]>;
  brand: Brand | null = null;
  private addModelSubject: Subject<Model> = new Subject<Model>();
  private subscriptions: Subscription = new Subscription();

  modelGroup: FormGroup = this.formBuilder.group({
    id: null,
    name: [
      {
        value: null,
        disabled: true
      },
      {
        validators: [Validators.required],
        asyncValidators: [ModelNameValidator.createValidator(this.modelsService, this)],
        updateOn: 'blur',
      }
    ],
    brand: this.formBuilder.group({
      id: null,
      name: [null, [Validators.required],]

    }),
    applianceType: this.formBuilder.group({
      id: null,
      name: [null, [Validators.required]]
    })
  })

  constructor(private formBuilder: FormBuilder,
              private modelsService: ModelsService,
              private brandsService: BrandsService,
              private typesService: TypesService,
              private messageService: MessageService,
              private dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.brands = this.brandsService.findAll();
    this.types = this.typesService.findAll();
    this.subscriptions.add(this.addModelSubject.pipe(
      switchMap(model => this.modelsService.add(model))
    ).subscribe(model => {
      this.messageService.notifySuccess(`Model ${ model.name } successful created in brand ${ model.brand?.name }`);
    }, error => this.messageService.notifyError(error.message)));
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
