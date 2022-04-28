import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {StepperSelectionEvent} from "@angular/cdk/stepper";
import * as moment from "moment";
import {getSearchData} from "../../store/search/search.selectors";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {NotificationService} from "../../../../../common-services/notification.service";
import {getIndividual} from "../../store/individual/individual.selectors";
import {Individual} from "../../store/individual/individual.reducer";

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
        country: individual.country,
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
  }

  createForm() {
    this.informationFormGroup = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      country: ['', Validators.required],
      city: ['', Validators.required],
      phone: ['', Validators.required],
      email: ['', Validators.required],
      acceptTAndC: [false, Validators.required],
      openToNewsAndPromotions: [false]
    })
  }
}
