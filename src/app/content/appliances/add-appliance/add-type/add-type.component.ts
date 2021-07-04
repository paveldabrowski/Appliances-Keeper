import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Subject, Subscription } from "rxjs";
import { ApplianceType, Brand } from "../../models";
import { FormControl, FormGroup, FormGroupDirective, Validators } from "@angular/forms";
import { BrandNameValidator } from "../add-brand/BrandNameValidator";
import { BrandsService } from "../../services/brands.service";
import { MessageService } from "../../../../message.service";
import { switchMap } from "rxjs/operators";
import { TypeNameValidator } from "./TypeNameValidator";
import { TypesService } from "../../services/types.service";

@Component({
  selector: 'app-add-type',
  templateUrl: './add-type.component.html',
  styleUrls: ['./add-type.component.css']
})
export class AddTypeComponent implements OnInit, OnDestroy {

  @ViewChild(FormGroupDirective) form?: FormGroupDirective;
  typeSubject: Subject<ApplianceType> = new Subject<ApplianceType>();
  subscriptions: Subscription = new Subscription();
  typeGroup: FormGroup = new FormGroup({
    id: new FormControl(null),
    name: new FormControl(null, Validators.required, TypeNameValidator.createValidator(this.typesService))
  });

  constructor(private typesService: TypesService, private messageService: MessageService) { }


  ngOnInit(): void {
    this.subscriptions.add(this.typeSubject.pipe(switchMap(type => this.typesService.add(type))).subscribe(type => {
      this.messageService.notifySuccess(`Appliance type ${type.name} successfully created.`)
    }, error => this.messageService.notifyError(error.message)));
  }

  createApplianceType() {
    this.typeSubject.next(this.typeGroup.value as ApplianceType);
    this.form?.resetForm();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
    this.typeSubject.complete();
  }
}
