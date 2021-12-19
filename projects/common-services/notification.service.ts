import {Injectable} from '@angular/core';
import {ToastrService} from "ngx-toastr";
import {IndividualConfig} from "ngx-toastr/toastr/toastr-config";

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
    extendedTimeOut: 10000000,
    messageClass: "",
    newestOnTop: false,
    onActivateTick: false,
    payload: null,
    positionClass: "toast-top-right",
    progressAnimation: 'decreasing',
    progressBar: true,
    tapToDismiss: false,
    timeOut: 300000000,
    titleClass: "toast-title",
    toastClass: "ngx-toastr"
  }

  constructor(
    private toastr: ToastrService
  ) {
  }

  public showSuccess(message: string, title?: string, config = {}) {
    const options = Object.assign(this.toastOptions, config);
    this.toastr.success(message, title, options);
  }

  public showError(message: string, title?: string, config = {}) {
    const options = Object.assign(this.toastOptions, config);
    this.toastr.error(message, title, options)
    // const options = Object.assign(this.toastOptions, config);
    // return new Promise(resolve => {
    //   this.toastr.error(message, title, options)
    //     .onTap
    //     .pipe(take(1))
    //     .subscribe(() => {
    //       this.toastr.clear()
    //       resolve(true);
    //     });
    // })
  }


}
