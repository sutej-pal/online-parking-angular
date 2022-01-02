import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {NotificationService} from "../../../../../common-services/notification.service";
import {Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isRegistering$ = new BehaviorSubject(false)

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.createForm();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[\d]{10}$/)]],
      location: ['']
    })
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      await this.notificationService.showError('Please clear the form errors.');
      return
    }
    this.isRegistering$.next(true);
    try {
      let res = await this.httpService.post('/register', {}, this.formGroup.value, '');
      this.notificationService.showSuccess(res.data.message);
      console.log('res', res);
      await this.router.navigate(['/dashboard']);
    } catch (e) {

    }
    setTimeout(() => {
      this.isRegistering$.next(false)
    }, 3000);
  }
}
