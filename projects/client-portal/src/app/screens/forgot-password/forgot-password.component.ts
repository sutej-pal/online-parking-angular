import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";

@Component({
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private fb: FormBuilder
  ) {
  }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm() {
    this.formGroup = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    })
  }

  async onSubmit() {
    await this.router.navigate(['/reset-password/userid/token']);
  }
}
