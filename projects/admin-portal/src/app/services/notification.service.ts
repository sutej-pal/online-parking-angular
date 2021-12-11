import {Injectable} from '@angular/core';
import {MatSnackBar} from '@angular/material/snack-bar';
import {NotificationSuccessComponent} from "../Components/notification/notification-success/notification-success.component";
import {ToastrService} from "ngx-toastr";
import {IndividualConfig} from "ngx-toastr/toastr/toastr-config";
import {take} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  toastOptions: IndividualConfig = {
    closeButton: true,
    disableTimeOut: false,
    easeTime: 300,
    easing: "",
    enableHtml: false,
    extendedTimeOut: 1000,
    messageClass: "",
    newestOnTop: false,
    onActivateTick: false,
    payload: null,
    positionClass: "toast-top-right",
    progressAnimation: 'decreasing',
    progressBar: true,
    tapToDismiss: false,
    timeOut: 3000,
    titleClass: "toast-title",
    toastClass: "ngx-toastr"
  }

  constructor(
    private toastr: ToastrService
  ) {
  }

  public showSuccess(message: string, title: string) {
    this.toastr.success('Hello world!', 'Toastr fun!');
  }

  public showError(message: string, title?: string, config = {}) {
    const options = Object.assign(this.toastOptions, config);
    return new Promise(resolve => {
      this.toastr.error(message, title, options)
        .onTap
        .pipe(take(1))
        .subscribe(() => {
          this.toastr.clear()
          resolve(true);
        });
    })
  }


}