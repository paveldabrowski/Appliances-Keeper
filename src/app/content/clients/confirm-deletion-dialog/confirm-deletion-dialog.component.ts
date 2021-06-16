import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
  selector: 'app-confirm-deletion-dialog',
  templateUrl: './confirm-deletion-dialog.component.html',
  styleUrls: ['./confirm-deletion-dialog.component.css']
})
export class ConfirmDeletionDialogComponent implements OnInit {
  title: string = "Delete client?";
  description: string = "This decision cannot be undone.";

  constructor(@Inject(MAT_DIALOG_DATA) public data?: {title: string, description: string}) {
    if (data) {
      if (data.title) this.title = data.title;
      if (data.description) this.description = data.description;
    }
  }

  ngOnInit(): void {
  }
}
