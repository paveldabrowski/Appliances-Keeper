import { Component, OnInit, ViewChild } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Subject, Subscription } from "rxjs";
import { TechniciansTableComponent } from "../technicians-table/technicians-table.component";
import { Technician } from "../models";

@Component({
  selector: 'app-technicians-view',
  templateUrl: './technicians-view.component.html',
  styleUrls: ['./technicians-view.component.css']
})
export class TechniciansViewComponent implements OnInit, ContentDescriptor {

  @ViewChild(TechniciansTableComponent) tableComponent!: TechniciansTableComponent;
  private selectedTechnician?: Technician;
  private subscriptions: Subscription = new Subscription();
  private deleteTechnicianSubject: Subject<Technician> = new Subject<Technician>();
  private technicianCreatedSubject: Subject<Technician> = new Subject<Technician>();

  constructor() { }

  ngOnInit(): void {
  }

  getTitle(): string {
    return "Technicians";
  }

  technicianSelected(technician: Technician | undefined) {
    this.selectedTechnician = technician;
  }
}
