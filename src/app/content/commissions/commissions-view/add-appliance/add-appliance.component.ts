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

  applianceGroup: FormGroup = this.formBuilder.group({
    serialNumber: [
      null,
      [
        Validators.required,
        (control: AbstractControl) => AddApplianceComponent.forbiddenSerialNumberValidator(control, this.appliance)
      ]
    ],
    model: this.formBuilder.group({
      id: null,
      name: null,
      brand: this.formBuilder.group({
        id: null,
        name: null
      })
    }),
    brand: this.formBuilder.group({
      id: null,
      name: null
    }),
    type: this.formBuilder.group({
      id: null,
      name: null
    }),
  });

  constructor(private appliancesService: AppliancesService, private modelsService: ModelsService,
              private brandsService: BrandsService,
              private formBuilder: FormBuilder) {
  }

  ngOnInit(): void {
    this.appliances = this.appliancesSubject.asObservable();
    this.fetchAppliancesFromBackend();
    this.models = this.fetchDataFromBackend(this.applianceGroup, 'model', 'name',
      this.modelsService, this.modelsSubject)
    this.brands = this.fetchDataFromBackend(this.applianceGroup, 'brand', 'name',
      this.brandsService, this.brandsSubject)

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

  private static forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl, appliance: Appliance) {
    return control.value === appliance.serialNumber ? {'applianceExists': true} : null;
  }

  onModelSelect($event: MatOptionSelectionChange, model: Model) {
    if ($event.source.selected) {
      this.applianceGroup.controls['model'].patchValue(model, {emitEvent: true});
      this.applianceGroup.controls['brand'].patchValue(model.brand);
    }
  }

  ngDoCheck(): void {
    console.log(this.applianceGroup.value);
  }

  onBrandSelect(brand: Brand) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.brandsSubject.complete();
    this.modelsSubject.complete()
  }
}
