import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { Appliance, ApplianceType, Brand, Model } from "../../../appliances/models";
import { BehaviorSubject, Observable } from "rxjs";
import { AppliancesService } from "../../../appliances/appliances.service";
import { ModelsService } from "../../../appliances/models.service";
import { debounceTime, distinctUntilChanged, switchMap } from "rxjs/operators";
import { AbstractControl, FormControl, FormGroup, NgForm, Validators } from "@angular/forms";
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
  applianceGroup: FormGroup = new FormGroup({
    serialNumber: new FormControl(null, [
      Validators.required,
      control => this.forbiddenSerialNumberValidator(control, this.appliance)
    ]),
    model: new FormGroup({
      id: new FormControl(),
      name: new FormControl(),
      brand: new FormControl()
    }),
    brand: new FormControl(),
    type: new FormControl(),
  });


  constructor(private appliancesService: AppliancesService, private modelsService: ModelsService) {
  }

  ngAfterViewInit(): void {

  }

  ngOnInit(): void {
    this.models = this.modelsService.findAll();
    this.appliances = this.appliancesSubject.asObservable();
    const serialNumber = this.applianceGroup.controls['serialNumber'];
    serialNumber.valueChanges.pipe(
      debounceTime(250),
      distinctUntilChanged(),
      switchMap((value: string) => this.appliancesService.findAllByParam('serialNumber', value))
    ).subscribe((appliances: Appliance[]) => {
      this.appliancesSubject.next(appliances);
      if (appliances.length === 1 && serialNumber.value === appliances[0].serialNumber) {
        this.appliance = appliances[0];
        serialNumber.updateValueAndValidity();
      } else {
        this.appliance = new Appliance();
      }
    })


  }

  compareModels(x: Model, y: Model): boolean {
    return x && y ? x.id === y.id : x === y;
  }

  print() {
    console.log(this.model)
  }

  forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl, appliance: Appliance) {
    return control.value === appliance.serialNumber ? {'applianceExists': true} : null;
  }
}
