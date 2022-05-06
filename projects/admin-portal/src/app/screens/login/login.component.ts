import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "../../../../../common-services/notification.service";
import {BehaviorSubject} from "rxjs";
import {HttpService} from "../../../../../common-services/http.service";

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

  ngOnInit(): void {
    console.log('this.formGroup', this.formGroup);
    this.loadForm();
  }

  async onSubmit() {
    if (!this.formGroup.valid) {
      await this.notificationService.showError('Please clear the form errors.');
      return
    }
    this.isLoggingIn$.next(true);
    try {
      let res = await this.httpService.executeRequest( 'admin/login', 'post', this.formGroup.value).toPromise();
      this.notificationService.showSuccess(res.body.message);
      console.log('res', res);
      await this.router.navigate(['/dashboard']);
    } catch (e) {
      console.log('Error', e);
      this.isLoggingIn$.next(false)
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
