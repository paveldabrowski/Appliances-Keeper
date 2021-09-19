import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDeletionDialogComponent } from "./confirm-deletion-dialog/confirm-deletion-dialog.component";
import { MatDialogModule } from "@angular/material/dialog";
import { MatButtonModule } from "@angular/material/button";
import { WebSocketAPI } from "../home-page/WebSocketAPI";



@NgModule({
  declarations: [
    ConfirmDeletionDialogComponent
  ],
  imports: [
    CommonModule,
    MatDialogModule,
    MatButtonModule
  ]
})
export class CoreModule { }
