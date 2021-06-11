import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor(private notificationService: ToastrService) { }

  notifySuccess(message: string): void {
    this.notificationService.success(message, "Success", {});
  }

  notifyError(message: string): void {
    this.notificationService.error(message, "Error")
  }

  notifyInfo(massage: string): void {
    this.notificationService.info(massage, "Info")
  }

  notifyWarning(massage: string): void {
    this.notificationService.warning(massage, "Warning")
  }

}
