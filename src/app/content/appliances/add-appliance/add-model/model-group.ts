import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModelNameValidator } from "./ModelNameValidator";
import { ModelsService } from "../../services/models.service";
import { AddModelComponent } from "./add-model.component";


export class ModelGroup {

  formBuilder = new FormBuilder();
  modelGroup: FormGroup;

  constructor(private modelsService: ModelsService, addModelComponent: AddModelComponent) {
    this.modelGroup = this.formBuilder.group({
      id: null,
      name: [
        {
          value: null,
          disabled: true
        },
        {
          validators: [Validators.required],
          asyncValidators: [ModelNameValidator.createValidator(modelsService, addModelComponent)],
          updateOn: 'blur',
        }
      ],
      brand: this.formBuilder.group({
        id: null,
        name: [null, [Validators.required],]

      }),
      applianceType: this.formBuilder.group({
        id: null,
        name: [null, [Validators.required]]
      }),
      description: null
    })
  }
}
