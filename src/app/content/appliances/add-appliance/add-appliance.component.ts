import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Appliance, ApplianceType, Brand, Model } from "../models";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AppliancesService } from "../appliances.service";
import { ModelsService } from "../models.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { AbstractControl, FormGroup, FormGroupDirective } from "@angular/forms";
import { BrandsService } from "../brands.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { GetterByParam } from "../../model";
import { ApplianceGroup } from "./ApplianceGroup";
import { TypesService } from "../types.service";
import { MessageService } from "../../../message.service";


@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.css']
})
export class AddApplianceComponent implements OnInit, DoCheck, OnDestroy {

  @ViewChild(FormGroupDirective) formGroup?: FormGroupDirective;
  appliances = new Observable<Appliance[]>();
  appliancesSubject = new BehaviorSubject<Appliance[]>([]);
  brands = new Observable<Brand[]>();
  brandsSubject = new BehaviorSubject<Brand[]>([]);
  models!: Observable<Model[]>;
  modelsSubject = new BehaviorSubject<Model[]>([]);
  addApplianceSubject = new Subject<Appliance>();
  brandChangeSubject = new Subject<string>();
  types = new Observable<ApplianceType[]>();
  appliance = new Appliance();
  model?: Model;
  subscriptions = new Subscription();
  applianceGroup: FormGroup;

  constructor(private appliancesService: AppliancesService, private modelsService: ModelsService,
              private brandsService: BrandsService, private typesService: TypesService,
              private messageService: MessageService) {
    this.applianceGroup = new ApplianceGroup(this).applianceGroup;
  }

  ngOnInit(): void {
    this.appliances = this.appliancesSubject.asObservable();
    this.fetchAppliancesFromBackend();
    this.models = this.fetchDataFromBackend(this.applianceGroup, 'model', 'name',
      this.modelsService, this.modelsSubject);
    this.brands = this.fetchDataFromBackend(this.applianceGroup, 'brand', 'name',
      this.brandsService, this.brandsSubject);
    this.types = this.typesService.findAll();
    this.subscriptions.add(this.addApplianceSubject.pipe(switchMap(value => this.appliancesService.add(value))).subscribe(
      value => {
        this.messageService.notifySuccess(`Appliance ${ value.serialNumber } created!`);
        this.formGroup?.resetForm();
      }, error => this.messageService.notifyError(error.message)
    ));
    this.subscriptions.add(this.brandChangeSubject.pipe(
      switchMap(value => this.modelsService.findAllByParam('brand', value))
    ).subscribe(models => this.modelsSubject.next(models)))
  }

  private fetchAppliancesFromBackend(): void {
    const serialNumber = this.applianceGroup.controls['serialNumber'];
    this.subscriptions.add(serialNumber.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((value: string) => this.appliancesService.findAllByParam('serialNumber', value))
    ).subscribe((appliances: Appliance[]) => {
      this.appliancesSubject.next(appliances);
      if (appliances.length === 1 && serialNumber.value === appliances[0].serialNumber) {
        this.appliance = appliances[0];
        serialNumber.updateValueAndValidity();
      } else
        this.appliance = new Appliance();
    }));
  }

  private fetchDataFromBackend(formGroup: FormGroup, groupControlName: string, innerControlName: string,
                               service: GetterByParam<any>, subject: BehaviorSubject<any>): Observable<any> {
    this.subscriptions.add(formGroup.controls[groupControlName].get(innerControlName)?.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((modelName: string) => service.findAllByParam(innerControlName, modelName))
    ).subscribe(models => subject.next(models)));
    return subject.asObservable();
  }

  compareModels(x: Model, y: Model): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  verifyIfModelEqualsSelectedModel(): void {
    const value = this.applianceGroup.controls['model'].get('name')?.value;
    if (!value || !this.model || (this.model && value !== this.model?.name)) {
      this.resetFormTree('model', 'name');
      this.resetFormTree('brand', 'name');
    }
  }

  private resetFormTree(formGroupName: string, formControlName: string): void {
    this.applianceGroup.controls[formGroupName].reset();
    const control = this.applianceGroup.controls[formGroupName].get(formControlName);
    AddApplianceComponent.activateRequiredValidator(control);
  }

  private static activateRequiredValidator(control: AbstractControl | null): void {
    control?.markAsTouched();
    control?.setErrors({'required': true});
  }

  onModelSelect($event: MatOptionSelectionChange, model: Model) {
    if ($event.source.selected) {
      this.applianceGroup.controls['model'].patchValue(model, {emitEvent: true});
      this.applianceGroup.controls['brand'].patchValue(model.brand);
      this.model = model;
    }
  }

  ngDoCheck(): void {
    // console.log(this.applianceGroup.value);
  }

  onBrandSelect($event: MatOptionSelectionChange, brand: Brand) {
    if ($event.source.selected) {
      this.applianceGroup.controls['brand'].patchValue(brand);
      this.brandChangeSubject.next(brand.name);
    }
  }

  createAppliance(): void {
    this.addApplianceSubject.next(this.applianceGroup.value as Appliance);
  }

  forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl) {
    return control.value === this.appliance.serialNumber ? {'applianceExists': true} : null;
  }

  validateModelBelongsToRightBrand<ValidatorFn>(control: AbstractControl, applianceGroup: FormGroup) {
    const brandIdFromModel: number = applianceGroup?.get('model')?.get('brand')?.get('id')?.value;
    const brandIdFromMainForm: number = applianceGroup?.get('brand')?.get('id')?.value;
    return brandIdFromModel === brandIdFromMainForm ? null : {'modelIsNotAssignedToRightBrand': true};
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.brandsSubject.complete();
    this.modelsSubject.complete()
    this.addApplianceSubject.complete();
    this.brandChangeSubject.complete();
  }
}