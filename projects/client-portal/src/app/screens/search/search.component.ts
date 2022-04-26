import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {google} from 'google-maps';
import {Store} from "@ngrx/store";
import {getSearchData} from "../../store/search/search.selectors";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {MatDrawer} from "@angular/material/sidenav";
import {ParkingLot} from "../../types/types";
import {HttpService} from "../../../../../common-services/http.service";
import {Router} from "@angular/router";
import * as _ from "underscore";
import {NotificationService} from "../../../../../common-services/notification.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  @ViewChild('drawer', {static: true}) drawer: MatDrawer | undefined;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 15
  };
  parkingLotList: ParkingLot[] = [];
  google: google | undefined
  isParkingLotDetailsVisible = false;
  searchData$: Observable<searchData> | undefined;
  selectedParkingLot: ParkingLot | undefined;
  isPLDetailWindowExpanded = false;
  googleMap: google.maps.Map | undefined;
  mapMarkers: google.maps.Marker[] | undefined;

  constructor(
    private store: Store,
    private router: Router,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    await this.checkIfMapLoaded();
    this.updateGoogleMapAutocompletePosition();
  }

  async checkIfMapLoaded() {
    this.google = await AppComponent.googleMap;
    if (this.google && this.google.maps) {
      await this.loadGoogleMap();
      this.searchData$?.subscribe(async e => {
        await this.getParkingLots(e);
        this.addMarkerOnMap();
      })
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
    this.googleMap = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
    this.searchData$?.subscribe(e => {
      this.googleMap?.setCenter({lat: e.lat, lng: e.lng});
      this.addMarkerOnMap();
    })
  }

  showParkingLotDetails(parkingLot: ParkingLot) {
    this.selectedParkingLot = parkingLot;
    console.log('this.drawer', this.drawer);
    if (!this.drawer?.opened) {
      this.drawer?.open();
    }
  }

  updateGoogleMapAutocompletePosition() {
    const style = document.createElement('style');
    style.type = 'text/css';
    style.id = 'google-autocomplete'
    // @ts-ignore
    if (style.styleSheet) {
      // @ts-ignore
      style.styleSheet.cssText = 'your css styles';
    } else {
      style.appendChild(document.createTextNode('.pac-container.pac-logo {left: 353px !important;}'));
    }
    document.getElementsByTagName('head')[0].appendChild(style);
  }

  ngOnDestroy() {
    const style = document.getElementById('google-autocomplete');
    style?.remove();
  }

  async getParkingLots(data: searchData) {
    try {
      const result = await this.httpService.executeRequest('search', 'post', data).toPromise();
      this.parkingLotList = result.body.data;
    } catch (e) {
      console.log('Failed');
      this.notificationService.showError('Failed to load Parking Lots.');
    }
  }

  sortParkingLotsByPrice() {
    this.parkingLotList = _.sortBy(this.parkingLotList, (parkingLot) => {
      return parkingLot?.parkingSpot?.price
    });
  }

  sortParkingLotsByDistance() {

  }

  addMarkerOnMap() {
    let map = this.googleMap;

    // Deletes all markers in the array by removing references to them.
    const deleteMarkers = () => {
      setMapOnAll(null);
      this.mapMarkers = [];
    }

    // Sets the map on all this.mapMarkers in the array.
    const setMapOnAll = (map: google.maps.Map<Element> | google.maps.StreetViewPanorama | null) => {
      const length = this.mapMarkers?.length || 0
      for (let i = 0; i < length; i++) {
        // @ts-ignore
        this.mapMarkers[i].setMap(map);
      }
    }

    const addMarker = (location: { lat: number; lng: number } | undefined) => {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: '../../../assets/images/parking.png'
      });
      // @ts-ignore
      this.mapMarkers.push(marker);
    }

    deleteMarkers();


    this.parkingLotList.map(parkingLot => {
      addMarker(parkingLot?.geometry);
    })
  }
}
