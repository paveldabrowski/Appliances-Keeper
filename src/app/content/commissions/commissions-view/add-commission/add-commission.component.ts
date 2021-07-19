import { Component, DoCheck, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { AbstractControl, FormBuilder, FormGroupDirective, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/services/appliances.service";
import { Appliance } from "../../../appliances/models";
import { debounceTime, distinctUntilChanged, mergeMap, switchMap, take } from "rxjs/operators";
import { GetterByParam, GetterBySearchTerm } from "../../../model";
import { CommissionsService } from "../../commissions.service";
import { MatOptionSelectionChange } from "@angular/material/core";
import { CustomValidators } from "../../../CustomValidators";
import { Client } from "../../../clients/Client";
import { ClientsService } from "../../../clients/clients.service";
import { Commission } from "../../Commission";
import { MessageService } from "../../../../message.service";
import { Hour, Technician, TechnicianTerm } from "../../../technicians/models";
import { TechniciansService } from "../../../technicians/technicians.service";
import { MatDatepickerInputEvent } from "@angular/material/datepicker";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { HourSchedulerComponent } from "../../hour-secheduler/hour-scheduler.component";
import { TechniciansTermsService } from "../../../technicians/technicians-terms.service";
import { AddApplianceComponent } from "../../../appliances/add-appliance/add-appliance.component";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent implements OnInit, OnDestroy, DoCheck {

  @ViewChild(FormGroupDirective) formGroup?: FormGroupDirective;
  appliances!: Observable<Appliance[]>;
  clients!: Observable<Client[]>
  technicians!: Observable<Technician[]>;
  private appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  private clientsSubject: BehaviorSubject<Client[]> = new BehaviorSubject<Client[]>([]);
  private techniciansSubject: BehaviorSubject<Technician[]> = new BehaviorSubject<Technician[]>([]);
  private commissionCreateSubject: Subject<Commission> = new Subject<Commission>();
  private selectedAppliance: Appliance | null = null;
  private subscriptions: Subscription = new Subscription();
  private subjects: BehaviorSubject<any>[] = [];
  private selectedTechnician: Technician | null = null;
  private selectedTerm: TechnicianTerm | null = null;

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      id: null,
      serialNumber: [null, [Validators.required]]
    }),
    client: [null, [Validators.required]],
    creationDate: [{value: Date.now(), disabled: true}],
    problemDescription: null,
    technician: null,
    technicianTerm:  [{value: null, disabled: true}, Validators.required],
    dateControl: [{value: null, disabled: true}, Validators.required],
    repairDate: null,
    technicianReport: null,
    solutionDescription: null,
    adviceGiven: false,
    clientVisited: false,
    commissionStatus: false
  });

  startDate: Date = new Date(Date.now());

  constructor(private fb: FormBuilder,
              private appliancesService: AppliancesService,
              private commissionService: CommissionsService,
              private clientsService: ClientsService,
              private techniciansService: TechniciansService,
              private termsService: TechniciansTermsService,
              private messageService: MessageService,
              private dialog: MatDialog) {
  }

  ngOnInit() {
    let appliance = this.commissionGroup.get('appliance');
    this.appliances = this.fetchAllByParam(appliance, 'serialNumber', this.appliancesSubject, this.appliancesService);
    let clientControl = this.commissionGroup.controls['client'];
    this.clients = this.fetchAllForControl<Client>(clientControl, this.clientsService, this.clientsSubject)
    let technicianControl = this.commissionGroup.controls['technician'];
    this.technicians = this.fetchAllForControl<Technician>(technicianControl, this.techniciansService, this.techniciansSubject)
    this.validateDateControl();
    this.subscriptions.add(this.commissionCreateSubject.pipe(
      switchMap(commission => this.commissionService.add(commission))
    ).subscribe(commission => {
      this.messageService.notifySuccess(`Commission ${commission.id} for client ${commission.client?.name} ${commission.client?.lastName} successfully crated!`);
      },
        error => {
      this.messageService.notifyError(error.message);
      console.log(error)
        }));
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

  private validateDateControl() {
    const dateControl = this.commissionGroup.controls['dateControl'];
    this.subscriptions.add(dateControl.valueChanges.subscribe(() => {
      if (dateControl.invalid || !dateControl.value) {
        this.commissionGroup.controls['technicianTerm'].reset();
      }
    }));
  }

  createCommission(): void {
    const commission = new Commission(this.commissionGroup.value);
    this.commissionCreateSubject.next(commission);
    this.resetForm();
  }

  resetForm(): void {
    this.formGroup?.resetForm();
    this.selectedTerm = null;
    this.selectedTechnician = null;
    this.selectedAppliance = null;
  }

  onSelectAppliance($event: MatOptionSelectionChange, appliance: Appliance): void {
    if ($event.source.selected) {
      this.commissionGroup.controls['appliance'].patchValue(appliance, {emitEvent: false});
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

  customDisplay(object: Client | Technician): string {
    return object ? `${ object.name } ${ object.lastName } id: ${ object.id }` : "";
  }

  verifyTechnician(): void {
    let technicianControl = this.commissionGroup.controls['technician'];
    if (!(technicianControl.value instanceof Object)) {
      this.commissionGroup.controls['dateControl'].disable();
      technicianControl.reset();
      this.selectedTechnician = null;
    }
  }

  onSelectTechnician($event: MatOptionSelectionChange, technician: Technician): void {
    if ($event.source.selected) {
      this.selectedTechnician = technician;
      this.commissionGroup.controls['dateControl'].enable();
    }
  }

  onlyWorkDays(date: Date | null): boolean {
    if (date) {
      const day = date.getDay();
      return day !== 0 && day !== 6;
    }
    return false;
  }

  openHoursScheduler($event: MatDatepickerInputEvent<Date, Date | null>): void {

    if ($event.value && this.commissionGroup.controls['dateControl'].valid) {
      if (this.selectedTerm) {
        this.termsService.releaseTerm(this.selectedTerm).pipe(take(1)).subscribe()
      }

      const dialog: MatDialogRef<HourSchedulerComponent, TechnicianTerm> = this.dialog.open(HourSchedulerComponent, {
        role: "dialog", disableClose: true, data: {
          date: $event.value,
          technician: this.selectedTechnician
        }
      });
      this.subscribeTermsDialogClose(dialog);
    }
  }

  private subscribeTermsDialogClose(dialog: MatDialogRef<HourSchedulerComponent, TechnicianTerm>) {
    dialog.afterClosed().pipe(
      take(1),
      switchMap(term => this.termsService.reserveTechnicianTerm(term).pipe(take(1)))
    ).subscribe(term => {
      this.selectedTerm = term;
      this.commissionGroup.controls['technicianTerm'].patchValue(Hour[term.hour as unknown as keyof typeof Hour]);
      this.commissionGroup.controls['repairDate'].patchValue(term);
    });
  }

  ngDoCheck(): void {
    // console.log(this.commissionGroup.value)
  }

  showAddApplianceForm(): void {
    this.dialog.open(AddApplianceComponent, {
      role: "dialog",
      autoFocus: false,
      disableClose: true
    })
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.appliancesSubject.complete();
    this.clientsSubject.complete();
    this.techniciansSubject.complete();
  }
}
