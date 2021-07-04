import { AbstractControl, AsyncValidatorFn, ValidationErrors } from "@angular/forms";
import { Observable } from "rxjs";
import { ServiceAsyncValidator } from "../../../model";
import { map } from "rxjs/operators";
import { AddModelComponent } from "./add-model.component";


export class ModelNameValidator {
  static createValidator(service: ServiceAsyncValidator, addModelComponent: AddModelComponent): AsyncValidatorFn {
    return (control: AbstractControl): Observable<ValidationErrors | null> => {
      return service.checkIfNameExists(control.value as string, addModelComponent.brand).pipe(
        map((result: boolean) => result ? {'modelExistsInBrand': true} : null)
      );
    };
  }
}
