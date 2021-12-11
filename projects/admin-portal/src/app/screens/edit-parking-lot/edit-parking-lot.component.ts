import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {Location} from '@angular/common';

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.scss']
})
export class EditParkingLotComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});

  constructor(
    private router: Router,
    private location: Location,
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  onSubmit() {
  }

  createForm() {
    this.formGroup = this.fb.group({
      email: ['', Validators.required]
    });
  }

  onCancel() {
    this.location.back();
  }
}
