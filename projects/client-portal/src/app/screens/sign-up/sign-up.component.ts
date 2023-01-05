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
  countriesList: any = [];

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
      firstName: ['Sutej', [Validators.required]],
      lastName: ['Pal', [Validators.required]],
      email: ['sutejpal@hotmail.com', [Validators.required, Validators.email]],
      // country: ['', [Validators.required]],
      // state: ['', [Validators.required]],
      city: ['mathura', [Validators.required]],
      phone: ['7017222049', [Validators.required, Validators.pattern(/^[\d]{10}$/)]],
      password: ['Default@123', [Validators.required]]
    });
  }

  async onSubmit() {
    this.submitted = true;
    if (this.formGroup.invalid) {
      console.log(this.formGroup)
      await this.notificationService.showError('Please fill up the required fields.');
      return
    }
    if (!this.acceptTAndC) {
      await this.notificationService.showError('Please accept the terms and conditions.');
      return
    }
    this.isRegistering$.next(true);

    try {
      let res = await this.httpService.executeRequest('sign-up', 'post', this.formGroup.value).toPromise();
      this.notificationService.showSuccess(res.body.message);
      await this.router.navigate(['/']);
    } catch (e: any) {
      this.notificationService.showError(e.error.message);
      this.isRegistering$.next(false)
    }
  }

  navigateBack() {
    this.location.back();
  }
}
