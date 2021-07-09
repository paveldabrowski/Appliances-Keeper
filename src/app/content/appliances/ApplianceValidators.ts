import { AbstractControl, FormGroup } from "@angular/forms";
import { Appliance } from "./models";
import { CustomValidators } from "../CustomValidators";

export class ApplianceValidators extends CustomValidators {

  static forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl, appliance: Appliance) {
    return control.value === appliance.serialNumber ? {'applianceExists': true} : null;
  }

  static validateModelBelongsToRightBrand<ValidatorFn>(control: AbstractControl, applianceGroup: FormGroup) {
    const brandIdFromModel: number = applianceGroup?.get('model')?.get('brand')?.get('id')?.value;
    const brandIdFromMainForm: number = applianceGroup?.get('brand')?.get('id')?.value;
    return brandIdFromModel === brandIdFromMainForm ? null : {'modelIsNotAssignedToRightBrand': true};
  }

}
