import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isRememberMeChecked = false;
  isLoggingIn$ = new BehaviorSubject(false);

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.loadForm();
  }

  async onSubmit() {
    if (!this.formGroup.valid) {
      await this.notificationService.showError('Please clear the form errors.');
      return
    }
    this.isLoggingIn$.next(true);
    try {
      let res = await this.httpService.post('login', {}, this.formGroup.value, '');
      this.notificationService.showSuccess(res.data.message);
      console.log('res', res);
      await this.router.navigate(['']);
    } catch (e) {

    }
    setTimeout(() => {
      this.isLoggingIn$.next(false)
    }, 3000);

  }

  private loadForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  rememberMe() {

  }


}
