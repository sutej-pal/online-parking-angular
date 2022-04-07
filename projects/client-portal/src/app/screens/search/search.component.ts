import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {google} from 'google-maps';
import {Store} from "@ngrx/store";
import {getSearchData} from "../../store/search/search.selectors";
import {updateSearch} from "../../store/search/search.actions";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 15
  };
  reviews: any = [0, 1, 2];
  google: google | undefined
  isParkingLotDetailsVisible = false;
  searchData$: Observable<searchData> | undefined;

  constructor(
    private store: Store
  ) {
  }

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    await this.checkIfMapLoaded();
    const searchData = localStorage.getItem('searchData');
    // @ts-ignore
    console.log(JSON.parse(searchData));
  }

  async checkIfMapLoaded() {
    this.google = await AppComponent.googleMap;
    if (this.google && this.google.maps) {
      await this.loadGoogleMap();
    } else {
      setTimeout(async () => {
        await this.checkIfMapLoaded();
      }, 500);
    }
  }

  async loadGoogleMap() {
    const google = await AppComponent.googleMap
    const MapTypeId = google.maps.MapTypeId;
    this.mapOptions['mapTypeId'] = MapTypeId.ROADMAP;
    const map = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
    this.searchData$?.subscribe(e => {
      map.setCenter({lat: e.searchData.lat, lng: e.searchData.lng});
    })
  }

  showParkingLotDetails() {
    this.isParkingLotDetailsVisible = true
  }
}
