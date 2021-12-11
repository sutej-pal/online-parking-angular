import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {NotificationService} from "../../services/notification.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    console.log('this.formGroup', this.formGroup);
    this.addControlsToForm();
  }

  async onSubmit() {
    // let res = await this.notificationService.showError('test');
    // console.log(res);
    await this.notificationService.showError('test');
  }

  private addControlsToForm() {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
