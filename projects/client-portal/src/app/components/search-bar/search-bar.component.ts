import {Component, OnInit} from '@angular/core';
import {AppComponent} from "../../app.component";
import {BehaviorSubject} from "rxjs";
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

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private dateAdapter: DateAdapter<Date>
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  async ngOnInit() {
    await this.checkIfMapLoaded();
    this.loadForm();
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
    this.autocomplete.addListener("place_changed", this.fillInAddress);
  }

  private fillInAddress() {
    const place = this.autocomplete?.getPlace();
    console.log(place);
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
          console.log(response);
          if (response[0]) {
            // response[0].geometry.location.lat(): ƒ ()
            // lng: ƒ ()
            this.formGroup.controls['destination'].setValue(response[0].formatted_address);
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
      arrivalDateTime: [data.arrivalDateTime, [Validators.required]],
      exitDateTime: [data.exitDateTime, [Validators.required]]
    }, {
      validators: DateTimeValidator.validateDiff('arrivalDateTime', 'exitDateTime')
    })
    this.isFormReady$.next(true);
  }

  async onSubmit() {
    if (this.formGroup.invalid) {
      return
    } else {
      localStorage.setItem('searchData', JSON.stringify(this.formGroup.value));
      await this.router.navigate(['/search']);
    }
  }
}
