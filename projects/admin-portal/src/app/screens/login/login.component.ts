import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  formGroup: FormGroup = new FormGroup({});

  constructor(
    private fb: FormBuilder,
  ) {
  }

  ngOnInit(): void {
    console.log('this.formGroup', this.formGroup);
    this.addControlsToForm();
  }

  onSubmit() {
    console.log('hi');
  }

  private addControlsToForm() {
    this.formGroup = this.fb.group({
      email: ['', Validators.required],
      password: ['', Validators.required]
    });
  }
}
