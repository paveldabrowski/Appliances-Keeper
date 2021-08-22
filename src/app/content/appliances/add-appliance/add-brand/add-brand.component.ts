import { Component, EventEmitter, OnDestroy, OnInit, Output, ViewChild } from '@angular/core';
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { BrandNameValidator } from "./BrandNameValidator";
import { BrandsService } from "../../services/brands.service";
import { Subject, Subscription } from "rxjs";
import { Brand } from "../../models";
import { switchMap } from "rxjs/operators";
import { MessageService } from "../../../../message.service";

@Component({
  selector: 'app-add-brand',
  templateUrl: './add-brand.component.html',
  styleUrls: ['./add-brand.component.css']
})
export class AddBrandComponent implements OnInit, OnDestroy {
  @ViewChild(FormGroupDirective) form?: FormGroupDirective;
  @Output("brandCreated") brandCreated: EventEmitter<Brand | undefined> = new EventEmitter<Brand | undefined>()
  brandSubject: Subject<Brand> = new Subject<Brand>();
  subscriptions: Subscription = new Subscription();
  brandGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required, BrandNameValidator.createValidator(this.brandsService))
  });

  constructor(private brandsService: BrandsService, private messageService: MessageService) {
  }

  ngOnInit(): void {
    this.subscriptions.add(this.brandSubject.pipe(
      switchMap(brand => this.brandsService.add(brand))
    ).subscribe(brand => {
      this.messageService.notifySuccess(`Brand ${ brand.name } successfully created.`);
      this.brandCreated.emit(brand);
    }, error => this.messageService.notifyError(error.message)));
  }

  createBrand() {
    this.brandSubject.next(this.brandGroup.value as Brand);
    this.form?.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.brandSubject.complete();
  }
}
