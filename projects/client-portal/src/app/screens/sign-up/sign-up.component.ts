import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {BehaviorSubject} from "rxjs";
import {ActivatedRoute, Router} from "@angular/router";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {Location} from "@angular/common";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});
  isRegistering$ = new BehaviorSubject(false)
  userType: string = '';
  isPasswordVisible = false;
  acceptTAndC = false;
  submitted = false;

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private location: Location,
    private route: ActivatedRoute,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.route.params.subscribe(e => {
      if (e.userType) {
        this.userType = e.userType
        this.createForm();
      }
    });
    this.createForm();
  }
  get f () {
    return this.formGroup.controls
  }

  private createForm() {
    this.formGroup = this.fb.group({
      name: ['', [Validators.required]],
      lastName: ['', [Validators.required]],
      email: ['', [Validators.required, Validators.email]],
      mobile: ['', [Validators.required, Validators.pattern(/^[\d]{10}$/)]],
      password: ['', [Validators.required]]
    });
    setTimeout(() => {
      console.log(this.formGroup)
    }, 3000);
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      console.log(this.formGroup)
      await this.notificationService.showError('Please fill up the required fields.');
      return
    }
    this.isRegistering$.next(true);

    try {
      let res = await this.httpService.executeRequest('sign-up', 'post', this.formGroup.value).toPromise();
      this.notificationService.showSuccess(res.data.message);
      console.log('res', res);
      await this.router.navigate(['/']);
    } catch (e) {

    }
    setTimeout(() => {
      this.isRegistering$.next(false)
    }, 3000);
  }

  navigateBack() {
    this.location.back();
  }
}
