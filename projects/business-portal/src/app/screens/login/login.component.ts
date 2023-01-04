import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {Store} from "@ngrx/store";
import {updateUser} from "../../store/user/user.actions";
import {Routes, BaseUrl} from '../../config/config';

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
    private store: Store,
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
      const res = await this.httpService.executeRequest(BaseUrl + Routes.login, 'post', this.formGroup.value).toPromise();
      this.notificationService.showSuccess(res.body.message);
      this.store.dispatch(updateUser(res.body.data));
      localStorage.setItem('token', res.body.data.token);
      await this.router.navigate(['']);
      this.isLoggingIn$.next(false);
    } catch (e) {
      console.log('Error', e.error.message);
      this.notificationService.showError(e.error.message);
      this.isLoggingIn$.next(false);
    }
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
