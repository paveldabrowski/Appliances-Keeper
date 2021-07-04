import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { ServiceAsyncValidator } from "../../../model";
import { map } from "rxjs/operators";


export class ModelNameValidator {
  static createValidator(service: ServiceAsyncValidator): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkIfNameExists(control.value as string).pipe(
        map((result: boolean) => result ? {'modelNameExists': true} : null)
      );
    };
  }
  }
