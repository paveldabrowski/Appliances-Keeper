import { Component, OnInit } from '@angular/core';
import { ApplianceType, Brand } from "../../models";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { ModelsService } from "../../services/models.service";
import { BrandsService } from "../../services/brands.service";
import { Observable } from "rxjs";
import { MatOptionSelectionChange } from "@angular/material/core";
import { TypesService } from "../../services/types.service";
import { ModelNameValidator } from "./ModelNameValidator";

@Component({
  selector: 'app-add-model',
  templateUrl: './add-model.component.html',
  styleUrls: ['./add-model.component.css']
})
export class AddModelComponent implements OnInit {
  brands!: Observable<Brand[]>;
  types!: Observable<ApplianceType[]>;
  private brand?: Brand;

  modelGroup: FormGroup = this.formBuilder.group({
    id: null,
    name: [
      null,
      {
        validators: [Validators.required],
        asyncValidators: [ModelNameValidator.createValidator(this.modelsService)],
        updateOn: 'blur'
      }
      ],
    brand: this.formBuilder.group({
      id: null,
      name: [null, [Validators.required],]

    }),
    applianceType: this.formBuilder.group({
      id: null,
      name: [null, [Validators.required]]
    })
  })

  constructor(private formBuilder: FormBuilder,
              private modelsService: ModelsService,
              private brandsService: BrandsService,
              private typesService: TypesService) { }

  ngOnInit(): void {
    this.brands = this.brandsService.findAll();
    this.types = this.typesService.findAll();
  }

  onBrandSelect($event: MatOptionSelectionChange, brand: Brand) {
    if ($event.source.selected) {
      this.brand = brand;
      this.modelGroup.controls['brand'].patchValue(brand);
    }
  }

  onTypeSelect($event: MatOptionSelectionChange, type: Brand) {
    if ($event.source.selected) {
      this.modelGroup.controls['applianceType'].patchValue(type);
    }
  }
}
