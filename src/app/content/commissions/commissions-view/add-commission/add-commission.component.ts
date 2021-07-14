import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/services/appliances.service";
import { Appliance } from "../../../appliances/models";
import { debounceTime, distinctUntilChanged, mergeMap, switchMap } from "rxjs/operators";
import { GetterByParam, GetterBySearchTerm } from "../../../model";
import { CommissionsService } from "../../commissions.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { CustomValidators } from "../../../CustomValidators";
import { Client } from "../../../clients/Client";
import { ClientsService } from "../../../clients/clients.service";
import { Commission } from "../../Commission";
import { MessageService } from "../../../../message.service";
import { Technician } from "../../../technicians/models";
import { TechniciansService } from "../../../technicians/technicians.service";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent<T> implements OnInit, OnDestroy, DoCheck {

  @ViewChild(FormGroupDirective) formGroup?: FormGroupDirective;
  appliances!: Observable<Appliance[]>;
  clients!: Observable<Client[]>
  technicians!: Observable<Technician[]>;
  private appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private techniciansSubject: BehaviorSubject<Technician[]> = new BehaviorSubject<Technician[]>([]);
  private selectedAppliance: Appliance | null = null;
  private subscriptions: Subscription = new Subscription();
  private subjects: BehaviorSubject<any>[] = [];

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      id: null,
      serialNumber: [null, [Validators.required]]
    }),
    client: null,
    creationDate: [{value: Date.now(), disabled: true}],
    problemDescription: null,
    technician: null
  });
  startDate: number = Date.now();


  constructor(private fb: FormBuilder,
              private appliancesService: AppliancesService,
              private commissionService: CommissionsService,
              private clientsService: ClientsService,
              private techniciansService: TechniciansService,
              private messageService: MessageService) {  }

  ngOnInit() {
    let appliance = this.commissionGroup.get('appliance');
    this.appliances = this.fetchAllByParam(appliance, 'serialNumber', this.appliancesSubject, this.appliancesService);
    let clientControl = this.commissionGroup.controls['client'];
    this.clients = this.fetchAllForControl<Client>(clientControl, this.clientsService, this.clientsSubject)
    let technicianControl = this.commissionGroup.controls['technician'];
    this.technicians = this.fetchAllForControl<Technician>(technicianControl, this.techniciansService, this.techniciansSubject)
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

  private fetchAllForControl<S>(abstractControl: AbstractControl,
                                service: GetterBySearchTerm<S>,
                                subject: Subject<S[]>): Observable<S[]> {
    this.subscriptions.add(abstractControl.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap(value => service.findAllBySearchTerm(value))
    ).subscribe(value => {
     subject.next(value);
    }));
    return subject.asObservable();
  }

  createCommission(commissionGroup: FormGroup): void {
    this.subscriptions.add(this.commissionService.add(new Commission(this.commissionGroup.value)).subscribe(commission => {
      this.messageService.notifySuccess(`Commission ${commission.appliance?.serialNumber} successfully created!`)
    }, error => this.messageService.notifyError(`Error while creating commission ${error.message}`)));
    this.formGroup?.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.clientsSubject.complete();
    this.techniciansSubject.complete();
  }

  ngDoCheck(): void {
    // console.log(this.commissionGroup.value)
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

  onSelectClient($event: MatOptionSelectionChange, client: Client): void {
    if ($event.source.selected) {
      this.commissionGroup.controls['client'].patchValue(client);
    }
  }

  displayClient(client: Client): string {
    return client? `${client.name} ${client.lastName} id: ${client.id}` : "";
  }

  displayTechnician(technician: Technician): string {
    return technician? `${technician.name} ${technician.lastName} id: ${technician.id}` : "";
  }

  verifyTechnician(): void {

  }

  onSelectTechnician($event: MatOptionSelectionChange, technician: Technician) {

  }
}
