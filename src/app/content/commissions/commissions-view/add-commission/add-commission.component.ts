import { Component, OnInit } from '@angular/core';
import { Observable, of } from "rxjs";
import { FormBuilder, Validators } from "@angular/forms";
import { AppliancesService } from "../../../appliances/appliances.service";
import { Appliance } from "../../../appliances/models";
import { debounceTime, distinctUntilChanged } from "rxjs/operators";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent implements OnInit {
  appliances!: Observable<Appliance[]>;

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      serialNumber: ["", Validators.required],
      model: [""],
      brand: [""]
    }),

  })

  constructor(private fb: FormBuilder, private appliancesService: AppliancesService) {
  }

  ngOnInit() {
    this.commissionGroup.get('appliance')?.get('serialNumber')?.valueChanges.pipe(
      debounceTime(400),
      distinctUntilChanged()
    ).subscribe((value: string) => {
      console.log(value)
      if (value.length > 0){
        this.appliances = this.appliancesService.findApplianceBySerialNumber(value);
      } else {
        this.appliances = of();
      }
    });
  }


  createCommission($event: any) {

  }
}
