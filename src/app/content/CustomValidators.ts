import { AbstractControl } from "@angular/forms";

export class CustomValidators {

  static activateRequiredValidator(control: AbstractControl | null): void {
    control?.markAsTouched();
    control?.setErrors({'required': true});
  }
}
