import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Appliance, ApplianceType, Brand, Model } from "../../../appliances/models";
import { BehaviorSubject, Observable } from "rxjs";
import { AppliancesService } from "../../../appliances/appliances.service";
import { ModelsService } from "../../../appliances/models.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import {
  AbstractControl,
  FormControl,
  NgForm,
  ValidationErrors,
  Validator,
  ValidatorFn,
  Validators
} from "@angular/forms";
import { MatSelect } from "@angular/material/select";
import { MatButton } from "@angular/material/button";




@Component({
  selector: 'app-add-appliance',
  templateUrl: './add-appliance.component.html',
  styleUrls: ['./add-appliance.component.css']
})
export class AddApplianceComponent implements OnInit, AfterViewInit {
  @ViewChild("brandInput") brandInput!: HTMLInputElement;
  @ViewChild("modelSelect") modelSelect!: MatSelect;
  @ViewChild("applianceForm") ngForm!: NgForm;
  @ViewChild("submitButton") submitButton!: MatButton;

  appliances: Observable<Appliance[]> = new Observable<Appliance[]>();
  appliancesSubject: BehaviorSubject<Appliance[]> = new BehaviorSubject<Appliance[]>([]);
  models!: Observable<Model[]>;
  brands: Observable<Brand[]> = new Observable<Brand[]>();
  types: Observable<ApplianceType[]> = new Observable<ApplianceType[]>();
  model?: Model;
  appliance: Appliance = new Appliance();
  serialNumber: FormControl = new FormControl(null, [
    Validators.required,
    control => this.forbiddenNameValidator(control, this.appliance)
  ]);

  constructor(private appliancesService: AppliancesService, private modelsService: ModelsService) {
  }

  ngAfterViewInit(): void {
    this.serialNumber.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((value: string) => this.appliancesService.findAllByParam('serialNumber', value))
    ).subscribe((appliances: Appliance[]) => {
      this.appliancesSubject.next(appliances);
      if (appliances.length === 1 && this.serialNumber.value === appliances[0].serialNumber) {
        this.submitButton.disabled = true;
        this.appliance = appliances[0];
        this.serialNumber.updateValueAndValidity({onlySelf: true})
      } else {
        this.submitButton.disabled = false;
        this.appliance = new Appliance();
      }

    })
  }

  ngOnInit(): void {
    this.models = this.modelsService.findAll();
    this.appliances = this.appliancesSubject.asObservable();

  }

  compareModels(x: Model, y: Model): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  print() {
    console.log(this.model)
  }

  fetchApplianceFromBackend(value: string) {
    if (value !== null && value.length > 0) {
      this.appliances = this.appliancesService.findAllByParam('serialNumber', value).pipe(
        debounceTime(250),
        distinctUntilChanged(),
      );
    } else
      this.appliances = new Observable<Appliance[]>();
  }


  forbiddenNameValidator<ValidatorFn>(control: AbstractControl, appliance: Appliance) {
    return control.value === appliance.serialNumber ? {'applianceExists': true} : null;
  }

}
