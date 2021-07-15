import { Component, DoCheck, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Hour, Technician, TechnicianTerm, WorkingDay } from "../../technicians/models";
import { TechniciansService } from "../../technicians/technicians.service";
import { BehaviorSubject, Observable, Subject, Subscription } from "rxjs";
import { MatListOption, MatSelectionList, MatSelectionListChange } from "@angular/material/list";
import { map } from "rxjs/operators";

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
              private techniciansService: TechniciansService) {
    this.selectedTechnician = data.technician;
    this.date = data.date;

  }

  ngDoCheck(): void {
    // console.log(this.selectedTerm);
  }

  ngOnInit(): void {
    this.subscriptions.add(this.techniciansService.getWorkingDay(this.selectedTechnician, this.date)
      .subscribe(workingDay => {
        if (workingDay) {
          this.isWorkday = true;
          this.terms.next(workingDay.technicianTerms);
        } else
          this.isWorkday = false;
      }));
  }

  enum(term: TechnicianTerm) {
    return Hour[term.hour as unknown as keyof typeof Hour];
  }

  onHourSelect($event: MatSelectionListChange) {
    // console.log($event)
    this.selectedTerm = $event.options[0].value as TechnicianTerm;
  }
}
