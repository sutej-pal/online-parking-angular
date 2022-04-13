import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  formGroup: any;

  constructor(
    private fb: FormBuilder
  ) { }

  ngOnInit() {
    this.loadForm();
  }

  private loadForm() {
    this.formGroup = this.fb.group({
      password: ['', [Validators.required,]],
      confirmPassword: ['', [Validators.required]]
    })
  }

  onSubmit() {

  }
}
