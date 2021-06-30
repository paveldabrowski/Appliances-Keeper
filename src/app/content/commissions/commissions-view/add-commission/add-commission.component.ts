import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/appliances.service";
import { Appliance, ApplianceType, Brand, Model } from "../../../appliances/models";
import { debounceTime, distinctUntilChanged, mergeMap } from "rxjs/operators";
import { GetterByParam } from "../../../model";
import { CommissionsService } from "../../commissions.service";
import { ModelsService } from "../../../appliances/models.service";
import { BrandsService } from "../../../appliances/brands.service";
import { TypesService } from "../../../appliances/types.service";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent<T> implements OnInit, OnDestroy, DoCheck {
  appliances!: Observable<Appliance[]>;
  models!: Observable<Model[]>;
  brands!: Observable<Brand[]>;
  types!: Observable<ApplianceType[]>;
  private appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  private modelsSubject: BehaviorSubject<Model[]> = new BehaviorSubject<Model[]>([]);
  private brandsSubject: BehaviorSubject<Brand[]> = new BehaviorSubject<Brand[]>([]);
  private typesSubject: BehaviorSubject<ApplianceType[]> = new BehaviorSubject<ApplianceType[]>([]);
  private subscriptions: Subscription[] = [];
  private subjects: BehaviorSubject<any>[] = [];

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      serialNumber: ['', Validators.required],
      model: this.fb.group({
        name: ['']
      }),
      brand: this.fb.group({
        name: ['']
      }),
      applianceType: ['']
    }),

  })

  constructor(private fb: FormBuilder,
              private appliancesService: AppliancesService,
              private commissionService: CommissionsService,
              private modelsService: ModelsService,
              private brandsService: BrandsService,
              private typesService: TypesService) {
  }

  ngOnInit() {
    let appliance = this.commissionGroup.get('appliance');
    this.appliances = this.fetchAllByParam(appliance, 'serialNumber', this.appliancesSubject, this.appliancesService);
    let model = appliance?.get('model');
    this.models = this.fetchAllByParam(model, 'name', this.modelsSubject, this.modelsService);
    let brand = appliance?.get('brand');
    this.brands = this.fetchAllByParam(brand, 'name', this.brandsSubject, this.brandsService);
    this.types = this.fetchAllByParam(appliance, 'applianceType', this.typesSubject, this.typesService);
  }

  private fetchAllByParam(mainControl: AbstractControl | null | undefined, field: string,
                          subject: BehaviorSubject<any>, service:
    GetterByParam<any>): Observable<any[]> {
    if (mainControl) {
      let innerControl = mainControl.get(field);
      if (innerControl) {
        this.subscriptions.push(innerControl.valueChanges.pipe(
          debounceTime(250),
          distinctUntilChanged(),
          mergeMap(value  => service.findAllByParam(field, value))
          ).subscribe((value: any[]) => {
            subject.next(value);
        }));
      }
    }
    return subject.asObservable();
  }

  createCommission(commissionGroup: FormGroup) {
    this.subscriptions.push(this.commissionService.addCommission(commissionGroup.value).subscribe());
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
    this.appliancesSubject.complete();
  }

  ngDoCheck(): void {
    console.log('do check', this.subscriptions.length);
  }
}
