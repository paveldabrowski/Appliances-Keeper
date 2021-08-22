import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { ContentDescriptor } from "../../model";
import { Brand } from "../models";
import { BrandsService } from "../services/brands.service";
import { MessageService } from "../../../message.service";
import { Subject, Subscription } from "rxjs";
import { switchMap, take } from "rxjs/operators";
import { MatTable } from "@angular/material/table";
import { BrandsTableComponent } from "./brands-table/brands-table.component";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { AddBrandComponent } from "../add-appliance/add-brand/add-brand.component";

@Component({
  selector: 'app-brands-view',
  templateUrl: './brands-view.component.html',
  styleUrls: ['./brands-view.component.css']
})
export class BrandsViewComponent implements OnInit, OnDestroy, ContentDescriptor {
  @ViewChild(BrandsTableComponent) table!: BrandsTableComponent;
  private selectedBrand: Brand | undefined;
  private deleteBrandSubject: Subject<Brand> = new Subject<Brand>();

  private subscriptions: Subscription = new Subscription();

  constructor(private brandsService: BrandsService,
              private messageService: MessageService,
              private dialog: MatDialog) { }

  ngOnInit(): void {
    this.subscriptions.add(this.deleteBrandSubject.pipe(
      switchMap(brand => this.brandsService.deleteBrand(brand))
    ).subscribe(
      () => {
        this.messageService.notifySuccess("Brand is deleted");
        this.selectedBrand = undefined;
        this.table.refreshTable();
      }, error => {
        this.messageService.notifyError(error.error)
        console.log(error)
      }
    ))
  }

  getTitle(): string {
    return "Brands";
  }

  brandSelected(brand: Brand | undefined) {
    this.selectedBrand = brand;
  }

  showAddBrand() {
    const matDialogRef: MatDialogRef<AddBrandComponent, boolean> = this.dialog.open(AddBrandComponent, {role: "dialog", disableClose: true});
    matDialogRef.componentInstance.brandCreated.pipe(
      take(1)
    ).subscribe(brand => {
      if (brand) {
        this.table.refreshTable();
      }
    });
  }

  deleteBrand() {
    if (this.selectedBrand) {
      this.deleteBrandSubject.next(this.selectedBrand);
    } else {
      this.messageService.notifyInfo("Select brand to delete!")
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }


}
