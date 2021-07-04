import { ServiceAsyncValidator } from "../../../model";
import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { map } from "rxjs/operators";

export class BrandNameValidator {
  static createValidator(service: ServiceAsyncValidator): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkIfNameExists(control.value as string).pipe(
        map((result: boolean) => result ? {'brandExists': true} : null)
      );
    };
  }
}
