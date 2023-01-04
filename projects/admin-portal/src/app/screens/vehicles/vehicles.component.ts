import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from "@angular/forms";
import {BehaviorSubject, Observable} from "rxjs";

@Component({
  selector: 'app-vehicles',
  templateUrl: './vehicles.component.html',
  styleUrls: ['./vehicles.component.scss']
})
export class VehiclesComponent implements OnInit {
  formGroup: any;
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.createForm();
  }

  get f() {
    return this.formGroup.controls;
  }

  onSubmit() {

  }

  createForm() {
    this.formGroup = this.fb.group({
      name: ['', Validators.required]
    });
    this.isFormReady$.next(true);
  }
}
