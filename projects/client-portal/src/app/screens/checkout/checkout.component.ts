import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import * as moment from "moment";
import {getSearchData} from "../../store/search/search.selectors";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {NotificationService} from "../../../../../common-services/notification.service";
import {getIndividual} from "../../store/individual/individual.selectors";
import {Individual} from "../../store/individual/individual.reducer";
import {WindowRefService} from "../../services/window-ref.service";
import {HttpService} from "../../../../../common-services/http.service";

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
    private winRef: WindowRefService,
    private httpService: HttpService,
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
    this.activeStep = 3;
    this.createRazorPayOrder();
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

  async createRazorPayOrder() {
    const options = {
      "amount": 100,
      "currency": "INR",
      "receipt": "receipt#1",
      "notes": {
        "key1": "value3",
        "key2": "value2"
      }
    }
    let res = await this.httpService.executeRequest('create-order', 'post', options).toPromise();
    this.payWithRazor(res.body.data.id);
  }

  payWithRazor(val: string) {
    const options: any = {
      key: 'rzp_test_tMwnmNia92ZzZq',
      name: "'Pal's Parking", // company name or product name
      description: '',  // product description
      image: '../../../assets/images/parking.png', // company logo or product image
      order_id: val, // order_id created by you in backend
      modal: {
        // We should prevent closing of the form when esc key is pressed.
        escape: false,
      },
      notes: {
        // include notes if any
      },
      theme: {
        color: '#3f51b5'
      }
    };
    options.handler = ((response: any, error: any) => {
      options.response = response;
      console.log(response);
      console.log(options);
      // call your backend api to verify payment signature & capture transaction
    });
    options.modal.ondismiss = (() => {
      // handle the case when user closes the form while transaction is in progress
      console.log('Transaction cancelled.');
    });
    const rzp = new this.winRef.nativeWindow.Razorpay(options);
    rzp.open();
  }
}
