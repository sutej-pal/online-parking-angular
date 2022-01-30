import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {Location} from '@angular/common';
import {BehaviorSubject} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-edit-parking-lot',
  templateUrl: './edit-parking-lot.component.html',
  styleUrls: ['./edit-parking-lot.component.scss']
})
export class EditParkingLotComponent implements OnInit {
  formGroup: FormGroup = new FormGroup({});
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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
    if (this.formGroup.valid) {
      console.log('hi');

    }
  }

  async cancel() {
    this.location.back();
  }

  private createForm() {
    this.formGroup = this.fb.group({
      parkingLotName: ['', Validators.required]
    });
    setTimeout(() => {
      this.isFormReady$.next(true);
    }, 500);
  }
}
