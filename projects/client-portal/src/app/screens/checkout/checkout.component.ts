import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  informationFormGroup: FormGroup = this.fb.group({});

  constructor(
    private fb: FormBuilder
  ) {
  }

  ngOnInit(): void {
    this.informationFormGroup = this.fb.group({
      firstName: ['']
    })
  }

}
