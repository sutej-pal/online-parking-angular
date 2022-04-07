import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {BehaviorSubject, Observable} from "rxjs";
import {google} from 'google-maps';
import {
  FormBuilder,
  FormGroup,
  Validators
} from "@angular/forms";
import {Router} from "@angular/router";
import {DateAdapter} from "@angular/material/core";
import * as moment from "moment";
import {DateTimeValidator} from "./date-time-validator";
import {updateSearch} from "../../store/search/search.actions";
import {Store} from "@ngrx/store";
import {getSearchData} from "../../store/search/search.selectors";
import {searchData} from "../../store/search/search.reducer";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit {

  options = {
    componentRestrictions: {country: ["in"]},
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["address"],
  };
  private autocomplete: google.maps.places.Autocomplete | any;
  google: google | undefined
  formGroup: FormGroup = new FormGroup({});
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchData$: Observable<searchData> | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    this.loadForm();
    await this.checkIfMapLoaded();
  }

  async checkIfMapLoaded() {
    this.google = await AppComponent.googleMap;
    if (this.google && this.google.maps) {
      await this.initializeAutoComplete();
    } else {
      setTimeout(async () => {
        await this.checkIfMapLoaded();
      }, 500);
    }
  }

  async initializeAutoComplete() {
    this.google = await AppComponent.googleMap;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    this.autocomplete = new this.google.maps.places.Autocomplete(input, this.options);
    this.autocomplete.addListener("place_changed", () => {
      const place = this.autocomplete.getPlace();
      this.updateForm(place);
    });
  }

  async getCurrentLocation(e: MouseEvent) {
    e.stopPropagation();
    const currentLocation: any = await AppComponent.getCurrentLocation();
    console.log(currentLocation);
    if (this.google) {
      const geocoder = new this.google.maps.Geocoder();
      const latLng = {
        lat: parseFloat(currentLocation.lat),
        lng: parseFloat(currentLocation.lng),
      };
      geocoder
        .geocode({location: latLng}, (response) => {
          if (response[0]) {
            this.updateForm(response[0]);
          }
        });
    }
  }

  loadForm() {
    const t = moment('10:00', 'hh:mm a');
    const minutes = (t.hour() * 60) + t.minute();
    let date = moment().add(1, "days").startOf('day')
    let data = {
      arrivalDateTime: moment(date).add(minutes, 'minutes').format(),
      exitDateTime: moment(date).add(2, 'hours').add(minutes, 'minutes').format()
    }
    this.formGroup = this.fb.group({
      destination: ['', [Validators.required]],
      lat: [0],
      lng: [0],
      arrivalDateTime: [data.arrivalDateTime, [Validators.required]],
      exitDateTime: [data.exitDateTime, [Validators.required]]
    }, {
      validators: DateTimeValidator.validateDiff('arrivalDateTime', 'exitDateTime')
    })
    this.isFormReady$.next(true);
    this.searchData$?.subscribe(e => {
      this.formGroup.patchValue(e.searchData);
    })
  }

  updateForm(place: any) {
    const searchData = {
      destination: place.formatted_address,
      lat: place.geometry.location.lat(),
      lng: place.geometry.location.lng(),
    }
    this.formGroup.patchValue(searchData);
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      return
    } else {
      const searchData = {
        lat: this.formGroup.value.lat,
        lng: this.formGroup.value.lng,
        destination: this.formGroup.value.destination
      }
      this.store.dispatch(updateSearch({payload: searchData}))
      await this.router.navigate(['/search']);
    }
  }
}
