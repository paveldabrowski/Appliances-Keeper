import { FormBuilder, FormGroup, Validators } from "@angular/forms";

export class CommissionGroup {

  private fb: FormBuilder = new FormBuilder();

  private _commissionGroup = this.fb.group({
    appliance: this.fb.group({
      id: null,
      serialNumber: [null, [Validators.required]]
    }),
    client: [null, [Validators.required]],
    creationDate: [{value: new Date(Date.now()), disabled: false}],
    problemDescription: null,
    technician: null,
    technicianTerm: [{value: null, disabled: true}, Validators.required],
    dateControl: [{value: null, disabled: true}, Validators.required],
    repairDate: null,
    technicianReport: null,
    solutionDescription: null,
    adviceGiven: false,
    clientVisited: false,
    commissionStatus: false
  });

  get commissionGroup(): FormGroup {
    return this._commissionGroup;
  }
}
