import { Component, DoCheck, OnDestroy, OnInit } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/services/appliances.service";
import { Appliance } from "../../../appliances/models";
import { debounceTime, distinctUntilChanged, mergeMap, switchMap } from "rxjs/operators";
import { GetterByParam } from "../../../model";
import { CommissionsService } from "../../commissions.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { CustomValidators } from "../../../CustomValidators";
import { Client } from "../../../clients/Client";
import { ClientsService } from "../../../clients/clients.service";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent<T> implements OnInit, OnDestroy, DoCheck {

  appliances!: Observable<Appliance[]>;
  clients!: Observable<Client[]>
  private appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private selectedAppliance: Appliance | null = null;
  private subscriptions: Subscription = new Subscription();
  private subjects: BehaviorSubject<any>[] = [];

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      id: null,
      serialNumber: [null, [Validators.required]]
    }),
    client: this.fb.group({
      id: null,
      name: null,
      lastName: null,
      phoneNumber: null,
      searchTerm: null
    }),
    creationDate: [{value: Date.now(), disabled: true}],
    problemDescription: null,

  });
  clientControl = new FormControl();


  constructor(private fb: FormBuilder,
              private appliancesService: AppliancesService,
              private commissionService: CommissionsService,
              private clientsService: ClientsService) {
  }

  ngOnInit() {
    let appliance = this.commissionGroup.get('appliance');
    this.appliances = this.fetchAllByParam(appliance, 'serialNumber', this.appliancesSubject, this.appliancesService);
    this.clients = this.clientsSubject.asObservable();
    this.fetchClients();
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

  private fetchClients() {
    this.subscriptions.add(this.clientControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(value => this.clientsService.findAllBySearchTerm(value))
    ).subscribe(clients => {
      this.clientsSubject.next(clients);
    }));
  }

  createCommission(commissionGroup2: FormGroup) {

  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
  }

  ngDoCheck(): void {

  }

  onSelectAppliance($event: MatOptionSelectionChange, appliance: Appliance): void {
    if ($event.source.selected) {
      this.commissionGroup.controls['appliance'].patchValue(appliance , {emitEvent: false});
      this.selectedAppliance = appliance;
    }
  }


  verifyAppliance(): void {
    const value = this.commissionGroup.controls['appliance'].get('serialNumber')?.value;
    if (!value || !this.selectedAppliance || (this.selectedAppliance && value !== this.selectedAppliance?.serialNumber)) {
      this.resetFormTree('appliance', 'serialNumber');
    }
  }

  private resetFormTree(formGroupName: string, formControlName: string): void {
    this.commissionGroup.controls[formGroupName].reset();
    const control = this.commissionGroup.controls[formGroupName].get(formControlName);
    CustomValidators.activateRequiredValidator(control);
  }

  onSelectClient($event: MatOptionSelectionChange, client: Client) {

  }

  displayClient(client: Client): string {
    return client? `${client.name} ${client.lastName} ${client.phoneNumber}` : "";

  }

}
