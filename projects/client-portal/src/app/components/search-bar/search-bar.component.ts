import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
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
import {Store} from "@ngrx/store";
import {updateSearch} from "../../store/search/search.actions";
import {getSearchData} from "../../store/search/search.selectors";
import {searchData} from "../../store/search/search.reducer";
import {MatMenuTrigger} from "@angular/material/menu";
import {HttpService} from "../../../../../common-services/http.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {GoogleMapService} from "../../services/google-map.service";

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, AfterViewInit {

  @ViewChild(MatMenuTrigger) vehicleSelectionPanelMenu: MatMenuTrigger | undefined;

  options = {
    componentRestrictions: {country: ["in"]},
    fields: ["formatted_address", "geometry", "name"],
    strictBounds: false,
    types: ["address"],
  };
  private autocomplete: google.maps.places.Autocomplete | any;
  google: any;
  formGroup: FormGroup = new FormGroup({});
  isFormReady$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  searchData$: Observable<searchData> | undefined;
  isVehicleSelectionVisible = false;
  vehicleTypesList: any = [];
  selectedVehicleType: any;

  constructor(
    private store: Store,
    private router: Router,
    private fb: FormBuilder,
    private httpService: HttpService,
    private dateAdapter: DateAdapter<Date>,
    private googleMapService: GoogleMapService,
    private notificationService: NotificationService,
  ) {
    this.dateAdapter.setLocale('en-GB'); //dd/MM/yyyy
  }

  async ngAfterViewInit() {
    await this.checkIfMapLoaded();
  }

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    this.isVehicleSelectionVisible = this.router.url === '/search';
    await this.getVehiclesTypes();
    this.loadForm();
  }

  get f() {
    return this.formGroup.controls;
  }

  async checkIfMapLoaded() {
    this.google = this.googleMapService.google;
    if (this.google && this.google.maps) {
      await this.initializeAutoComplete();
    } else {
      setTimeout(async () => {
        await this.checkIfMapLoaded();
      }, 500);
    }
  }

  async initializeAutoComplete() {
    this.google = this.googleMapService.google;
    const input = document.getElementById("pac-input") as HTMLInputElement;
    if (input) {
      this.autocomplete = new this.google.maps.places.Autocomplete(input, this.options);
      this.autocomplete.addListener("place_changed", () => {
        const place = this.autocomplete.getPlace();
        this.updateForm(place);
      });
    }
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
        .geocode({location: latLng}, (response: any[]) => {
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
      exitDateTime: [data.exitDateTime, [Validators.required]],
      vehicleType: [this.selectedVehicleType.id]
    }, {
      validators: DateTimeValidator.validateDiff('arrivalDateTime', 'exitDateTime')
    })
    this.isFormReady$.next(true);
    this.searchData$?.subscribe(e => {
      this.formGroup.patchValue(e);
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
        arrivalDateTime: this.formGroup.value.arrivalDateTime,
        exitDateTime: this.formGroup.value.exitDateTime,
        destination: this.formGroup.value.destination,
        vehicle: this.formGroup.value.vehicleType,
      }
      this.store.dispatch(updateSearch({payload: searchData}))
      await this.router.navigate(['/search']);
    }
  }

  selectVehicleType(vehicle: any) {
    this.formGroup.get('vehicleType')?.setValue(vehicle.id);
    this.selectedVehicleType = vehicle;
    this.vehicleSelectionPanelMenu?.closeMenu()
  }

  async getVehiclesTypes() {
    try {
      const response = await this.httpService.executeRequest('/vehicle', 'get',).toPromise();
      this.vehicleTypesList = response.data;
      this.selectedVehicleType = this.vehicleTypesList.filter((vehicle: any) => vehicle.name === 'Car')[0];
    } catch (e) {
      console.log(e);
      this.notificationService.showError('Failed to load vehicles types.');
    }
  }
}
