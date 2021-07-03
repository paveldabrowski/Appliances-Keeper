import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/services/appliances.service";
import { Appliance, ApplianceType, Brand, Model } from "../../../appliances/models";
import { catchError, debounceTime, distinctUntilChanged, mergeMap, switchMap } from "rxjs/operators";
import { GetterByParam } from "../../../model";
import { CommissionsService } from "../../commissions.service";
import { ModelsService } from "../../../appliances/services/models.service";
import { BrandsService } from "../../../appliances/services/brands.service";
import { TypesService } from "../../../appliances/services/types.service";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent<T> implements OnInit, OnDestroy, DoCheck {

  appliances!: Observable<Appliance[]>;
  private appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  private subscriptions: Subscription = new Subscription();
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
        name: ['']
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
              private commissionService: CommissionsService) {
  }

  ngOnInit() {
    let appliance = this.commissionGroup.get('appliance');
    this.appliances = this.fetchAllByParam(appliance, 'serialNumber', this.appliancesSubject, this.appliancesService);
  }

  private fetchAllByParam(mainControl: AbstractControl | null | undefined, field: string,
                          subject: BehaviorSubject<any>, service: GetterByParam<any>): Observable<any[]> {
    if (mainControl) {
      let innerControl = mainControl.get(field);
      if (innerControl) {
        this.subscriptions.add(innerControl.valueChanges.pipe(
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

  createCommission(commissionGroup2: FormGroup) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
  }

  ngDoCheck(): void {

  }
}
