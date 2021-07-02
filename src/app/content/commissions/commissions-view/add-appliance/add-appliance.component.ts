import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { Appliance, ApplianceType, Brand, Model } from "../../../appliances/models";
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AppliancesService } from "../../../appliances/appliances.service";
import { ModelsService } from "../../../appliances/models.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { BrandsService } from "../../../appliances/brands.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { GetterByParam } from "../../../model";
import { ApplianceGroup } from "./ApplianceGroup";


@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.css']
})
export class AddApplianceComponent implements OnInit, DoCheck, OnDestroy {

  appliances: Observable<Appliance[]> = new Observable<Appliance[]>();
  appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  brands: Observable<Brand[]> = new Observable<Brand[]>();
  brandsSubject: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>([]);
  models!: Observable<Model[]>;
  modelsSubject: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);

  types: Observable<ApplianceType[]> = new Observable<ApplianceType[]>();

  appliance: Appliance = new Appliance();
  subscriptions: Subscription = new Subscription();

  applianceGroup: FormGroup;
  private model?: Model;

  constructor(private appliancesService: AppliancesService, private modelsService: ModelsService,
              private brandsService: BrandsService) {
    this.applianceGroup = new ApplianceGroup(this).applianceGroup;
  }

  ngOnInit(): void {
    this.appliances = this.appliancesSubject.asObservable();
    this.fetchAppliancesFromBackend();
    this.models = this.fetchDataFromBackend(this.applianceGroup, 'model', 'name',
      this.modelsService, this.modelsSubject);
    this.brands = this.fetchDataFromBackend(this.applianceGroup, 'brand', 'name',
      this.brandsService, this.brandsSubject);

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

  forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl) {
    return control.value === this.appliance.serialNumber ? {'applianceExists': true} : null;
  }

  verifyModel(): void {
    const value = this.applianceGroup.controls['model'].get('name')?.value;
    if (!value || (this.model && value !== this.model?.name)) {
      this.applianceGroup.controls['model'].reset();
      this.applianceGroup.controls['brand'].reset();
    }

  }

  onModelSelect($event: MatOptionSelectionChange, model: Model) {
    if ($event.source.selected) {
      this.applianceGroup.controls['model'].patchValue(model, {emitEvent: true});
      this.applianceGroup.controls['brand'].patchValue(model.brand);
      this.model = model;
    }
  }

  ngDoCheck(): void {
    console.log(this.applianceGroup.value);
  }

  onBrandSelect($event: MatOptionSelectionChange, brand: Brand) {
    if ($event.source.selected) {
      console.log('brand selected')
      this.applianceGroup.controls['brand'].patchValue(brand);
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.brandsSubject.complete();
    this.modelsSubject.complete()
  }
}
