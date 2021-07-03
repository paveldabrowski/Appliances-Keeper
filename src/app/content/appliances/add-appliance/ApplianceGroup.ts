import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { AddApplianceComponent } from "./add-appliance.component";
import { ApplianceValidators } from "../ApplianceValidators";

export class ApplianceGroup {

  private formBuilder: FormBuilder = new FormBuilder();

  constructor(private addApplianceComponent: AddApplianceComponent) { }

  private _applianceGroup: FormGroup = this.formBuilder.group({
    serialNumber: [
      null,
      [
        Validators.required,
        (control: AbstractControl) => ApplianceValidators.forbiddenSerialNumberValidator(control, this.addApplianceComponent.appliance)
      ]
    ],
    model: this.formBuilder.group({
      id: null,
      name: null,
      brand: this.formBuilder.group({
        id: null,
        name: null
      }),
      applianceType: this.formBuilder.group({
        id: null,
        name: [{value: null, disabled: true}],
      }),
    }),
    brand: this.formBuilder.group({
      id: null,
      name: [null, [Validators.required,  (control: AbstractControl) => ApplianceValidators.validateModelBelongsToRightBrand(control, this._applianceGroup)]]
    })
  });


  get applianceGroup(): FormGroup {
    return this._applianceGroup;
  }
}
