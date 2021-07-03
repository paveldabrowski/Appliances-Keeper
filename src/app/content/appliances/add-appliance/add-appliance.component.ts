import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Appliance, ApplianceType, Brand, Model } from "../models";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AppliancesService } from "../services/appliances.service";
import { ModelsService } from "../services/models.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { FormGroup, FormGroupDirective } from "@angular/forms";
import { BrandsService } from "../services/brands.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { GetterByParam } from "../../model";
import { ApplianceGroup } from "./ApplianceGroup";
import { TypesService } from "../services/types.service";
import { MessageService } from "../../../message.service";
import { ApplianceValidators } from "../ApplianceValidators";


@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.css']
})
export class AddApplianceComponent implements OnInit, OnDestroy {

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
  subscriptions = new Subscription();

  appliance = new Appliance();
  model?: Model;
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
    ApplianceValidators.activateRequiredValidator(control);
  }

  onModelSelect($event: MatOptionSelectionChange, model: Model) {
    if ($event.source.selected) {
      this.applianceGroup.controls['model'].patchValue(model, {emitEvent: true});
      this.applianceGroup.controls['brand'].patchValue(model.brand);
      this.model = model;
    }
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

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.brandsSubject.complete();
    this.modelsSubject.complete()
    this.addApplianceSubject.complete();
    this.brandChangeSubject.complete();
  }
}
