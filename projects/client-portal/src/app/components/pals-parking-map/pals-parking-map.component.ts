import {Component, ElementRef, Input, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';
import {AppComponent} from "../../app.component";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {Store} from "@ngrx/store";
import {Router} from "@angular/router";
import {FormBuilder} from "@angular/forms";
import {HttpService} from "../../../../../common-services/http.service";
import {DateAdapter} from "@angular/material/core";
import {GoogleMapService} from "../../services/google-map.service";
import {NotificationService} from "../../../../../common-services/notification.service";
import {getSearchData} from "../../store/search/search.selectors";
import {ParkingLot} from "../../types/types";

@Component({
  selector: 'app-pals-parking-map',
  templateUrl: './pals-parking-map.component.html',
  styleUrls: ['./pals-parking-map.component.scss']
})
export class PalsParkingMapComponent implements OnInit {

  @Input() parkingLots: ParkingLot[] = [];

  constructor(
    private store: Store,
    private googleMapService: GoogleMapService
  ) {
  }

  google: google | undefined;
  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  googleMap: google.maps.Map | undefined;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    mapTypeId: 'roadmap',
    zoom: 15
  };
  searchData$: Observable<searchData> | undefined;
  mapMarkers: google.maps.Marker[] | undefined;

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    await this.loadGoogleMap();
  }

  async loadGoogleMap() {
    const google = await this.googleMapService.getGoogleMapInstance();
    this.googleMap = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
    this.searchData$?.subscribe(e => {
      this.googleMap?.setCenter({lat: e.lat, lng: e.lng});
      this.addMarkerOnMap();
    })
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

    const addMarker = (location: any) => {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
        icon: '../../../assets/images/parking.png'
      });
      this.mapMarkers?.push(marker);
    }
    deleteMarkers();

    this.parkingLots.map(parkingLot => {
      addMarker(parkingLot?.geometry);
    })
  }

}
