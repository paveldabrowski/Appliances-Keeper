import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { Hour, Technician, TechnicianTerm, WorkingDay } from "../../technicians/models";
import { TechniciansService } from "../../technicians/technicians.service";
import { BehaviorSubject, combineLatest, forkJoin, of, Subject, Subscription, timer } from "rxjs";
import { MatSelectionListChange } from "@angular/material/list";
import { TechniciansTermsService } from "../../technicians/technicians-terms.service";
import { combineAll, map, switchMap, take, tap } from "rxjs/operators";
import { ifStmt } from "@angular/compiler/src/output/output_ast";

@Component({
  selector: 'app-hour-scheduler',
  templateUrl: './hour-scheduler.component.html',
  styleUrls: ['./hour-scheduler.component.css']
})
export class HourSchedulerComponent implements OnInit, DoCheck {

  selectedTechnician: Technician;
  date: Date;
  terms: Subject<TechnicianTerm[]> = new Subject<TechnicianTerm[]>();
  isWorkday: boolean = false;
  subscriptions: Subscription = new Subscription();
  hour = Hour;
  selectedTerm: TechnicianTerm | null = null;


  constructor(@Inject(MAT_DIALOG_DATA) data: { date: Date, technician: Technician },
              private techniciansService: TechniciansService,
              private termsService: TechniciansTermsService,
              private dialogRef: MatDialogRef<HourSchedulerComponent, TechnicianTerm>,) {
    this.selectedTechnician = data.technician;
    this.date = data.date;

  }

  ngDoCheck(): void {
    // console.log(this.selectedTerm);
  }

  ngOnInit(): void {
    this.initializeWorkingDayTerms();
  }

  private initializeWorkingDayTerms() {
    this.subscriptions.add(this.techniciansService.getWorkingDay(this.selectedTechnician, this.date).pipe(
      tap(workingDay => this.releaseTermsIfNotAssignToCommission(workingDay)),
      switchMap(() => this.techniciansService.getWorkingDay(this.selectedTechnician, this.date))
    ).subscribe(workingDay => {
      if (workingDay) {
        this.isWorkday = true;
        this.terms.next(workingDay.technicianTerms);
      } else
        this.isWorkday = false;
    }));
  }

  private releaseTermsIfNotAssignToCommission(workingDay: WorkingDay) {
    if (workingDay) {
      const technicianTerms = workingDay.technicianTerms;
      if (technicianTerms) {
        technicianTerms.forEach(term => {
          if (!term.commissionId) {
            console.log(term)
            this.termsService.releaseTerm(term).pipe(take(1)).subscribe();

          }
        });
      }
    }
  }

  covertEnumNameToHourValue(term: TechnicianTerm) {
    return Hour[term.hour as unknown as keyof typeof Hour];
  }

  onHourSelect($event: MatSelectionListChange) {
    this.selectedTerm = $event.options[0].value as TechnicianTerm;
  }


  // onHourSelect($event: MatSelectionListChange) {
  //   console.log($event)
  //   const term= $event.options[0].value as TechnicianTerm;
  //   if (!this.selectedTerm) {
  //     this.termsService.reserveTechnicianTerm(term).pipe(take(1)).subscribe(value => this.selectedTerm = value);
  //     return;
  //   }
  //
  //   combineLatest([this.termsService.reserveTechnicianTerm(this.selectedTerm), this.termsService.reserveTechnicianTerm(term)]).pipe(
  //     take(1)
  //   ).subscribe(value => {
  //     this.selectedTerm = value[1];
  //     console.log(value);
  //   })
  // }
}
