import { AbstractControl, FormGroup } from "@angular/forms";
import { Appliance } from "./models";

export class ApplianceValidators {

  static forbiddenSerialNumberValidator<ValidatorFn>(control: AbstractControl, appliance: Appliance) {
    return control.value === appliance.serialNumber ? {'applianceExists': true} : null;
  }

  static validateModelBelongsToRightBrand<ValidatorFn>(control: AbstractControl, applianceGroup: FormGroup) {
    const brandIdFromModel: number = applianceGroup?.get('model')?.get('brand')?.get('id')?.value;
    const brandIdFromMainForm: number = applianceGroup?.get('brand')?.get('id')?.value;
    return brandIdFromModel === brandIdFromMainForm ? null : {'modelIsNotAssignedToRightBrand': true};
  }

  static activateRequiredValidator(control: AbstractControl | null): void {
    control?.markAsTouched();
    control?.setErrors({'required': true});
  }
}
