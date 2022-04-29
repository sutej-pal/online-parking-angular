import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {getSearchData} from "../../store/search/search.selectors";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {NotificationService} from "../../../../../common-services/notification.service";
import {getIndividual} from "../../store/individual/individual.selectors";
import {Individual} from "../../store/individual/individual.reducer";
import * as Razorpay from "razorpay";

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {

  informationFormGroup: FormGroup = this.fb.group({});
  searchData$: Observable<searchData> | undefined;
  individual$: Observable<Individual> | undefined;
  moment: any = moment;
  isFormSubmitted = false;
  activeStep = 2

  constructor(
    private store: Store,
    private fb: FormBuilder,
    private notificationService: NotificationService
  ) {
  }

  ngOnInit(): void {
    this.searchData$ = this.store.select(getSearchData);
    this.individual$ = this.store.select(getIndividual);
    this.createForm();
    this.individual$.subscribe(individual => {
      this.informationFormGroup.patchValue({
        firstName: individual.firstName,
        lastName: individual.lastName,
        city: individual.city,
        phone: individual.phone,
        email: individual.email,
      })
    })
  }

  get ifg() {
    return this.informationFormGroup.controls
  }

  onSubmit() {
    this.isFormSubmitted = true;
    console.log(this.informationFormGroup);
    if (this.informationFormGroup.invalid) {
      this.notificationService.showError('Please fix form errors.')
      return
    }
    this.activeStep = 3
  }

  createForm() {
    this.informationFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      // country: ['', Validators.required],
      // state: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      acceptTAndC: [false, Validators.requiredTrue],
      openToNewsAndPromotions: [false]
    })
  }

  createInstance() {
    var instance = new Razorpay({ key_id: 'YOUR_KEY_ID', key_secret: 'YOUR_SECRET' })

    instance.orders.create({
      amount: 50000,
      currency: "INR",
      receipt: "receipt#1",
      notes: {
        key1: "value3",
        key2: "value2"
      }
    })
  }
}
