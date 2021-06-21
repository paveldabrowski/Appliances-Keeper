import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { FormBuilder, FormControl, FormGroup, Validators } from "@angular/forms";
import { map, startWith } from "rxjs/operators";

@Component({
  selector: 'com-add-commission',
  templateUrl: './add-commission.component.html',
  styleUrls: ['./add-commission.component.css']
})
export class AddCommissionComponent implements OnInit {

  commissionGroup = this.fb.group({
    appliance: this.fb.group({
      serialNumber: ["", Validators.required],
      model: [""],
      brand: [""]
    }),

  })

  constructor(private fb: FormBuilder) {
  }

  filteredOptions!: Observable<string[]>;

  ngOnInit() {

  }

  private _filter(value: string): string[] {
    return []
  }
  createCommission($event: any) {

  }
}
