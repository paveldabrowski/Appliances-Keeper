import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
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
  @ViewChild(FormGroupDirective) formGroup?: FormGroupDirective;

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
      id: [''],
      serialNumber: ['', Validators.required],
      model: this.fb.group({
        id: [''],
        name: [''],
        brand: null
      }),
      brand: this.fb.group({
        id: [''],
        name: [''],
        modelList: ['']
      }),
      applianceType: this.fb.group({
        id: [''],
        name: ['']
      }),
      client: null
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
    let type = appliance?.get('applianceType');
    this.types = this.fetchAllByParam(type, 'name', this.typesSubject, this.typesService);
    this.subscriptions.push(this.appliances.subscribe(value => {
      if (value && value.length === 1 && appliance?.get('serialNumber')?.value === value[0].serialNumber) {
        appliance?.patchValue({
          id: value[0].id,
          model: {
            id: value[0].model?.id,
            name: value[0].model?.name
          },
          brand: {
            id: value[0].brand?.id,
            name: value[0].brand?.name,
            modelList: value[0].brand?.modelList
          },
          applianceType: {
            id: value[0].applianceType?.id,
            name: value[0].applianceType?.name
          }
        });
      } else {
        appliance?.patchValue({
          id: null,
          model: {
            id: null,
            name: null
          },
          brand: {
            id: null,
            name: null,
            modelList: null
          },
          applianceType: {
            id: null,
            name: null
          }
        });
      }

    }));
  }

  private fetchAllByParam(mainControl: AbstractControl | null | undefined, field: string,
                          subject: BehaviorSubject<any>, service: GetterByParam<any>): Observable<any[]> {
    if (mainControl) {
      let innerControl = mainControl.get(field);
      if (innerControl) {
        this.subscriptions.push(innerControl.valueChanges.pipe(
          debounceTime(250),
          distinctUntilChanged(),
          mergeMap(value => service.findAllByParam(field, value))
        ).subscribe((value: any[]) => {
          subject.next(value);
        }));
      }
    }
    return subject.asObservable();
  }

  createCommission(commissionGroup: FormGroup) {
    console.log(commissionGroup.value)
    // let appliance = null;
    // this.appliancesService.addAppliance().subscribe(value => appliance = value,).unsubscribe();
    // console.log(appliance);
    // if (appliance) {
    //   commissionGroup.get('appliance')?.setValue(appliance);
    //   this.commissionService.addCommission(commissionGroup.value).subscribe().unsubscribe();
    // }

    this.appliancesService.addAppliance(commissionGroup.get('appliance')?.value as Appliance).pipe(
      mergeMap((value: Appliance)  => {
        commissionGroup.get('appliance')?.setValue(value);
         return this.commissionService.addCommission(commissionGroup.value);
      })
    ).subscribe(value => console.log(value));


    this.formGroup?.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(value => value.unsubscribe());
    this.appliancesSubject.complete();
  }

  ngDoCheck(): void {
    console.log('do check', this.subscriptions.length);
  }
}
