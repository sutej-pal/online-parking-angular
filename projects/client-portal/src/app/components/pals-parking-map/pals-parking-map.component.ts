import {Component, ElementRef, Input, OnChanges, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {select, Store} from "@ngrx/store";
import {GoogleMapService} from "../../services/google-map.service";
import {getSearchData} from "../../store/search/search.selectors";
import {ParkingLot} from "../../types/types";
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-pals-parking-map',
  templateUrl: './pals-parking-map.component.html',
  styleUrls: ['./pals-parking-map.component.scss']
})
export class PalsParkingMapComponent implements OnInit, OnChanges {

  @Input() parkingLots: ParkingLot[] = [];
  google: google;

  constructor(
    private store: Store,
    private googleMapService: GoogleMapService,
    private utilitiesService: UtilitiesService
  ) {
  }

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  googleMap: any;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    mapTypeId: 'roadmap',
    zoom: 16,
    mapId: '2e5ef6cf2a84b8af',
  };
  searchData$: Observable<searchData> | undefined;
  mapMarkers: google.maps.Marker[] | undefined;

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    await this.loadGoogleMap();
  }

  async ngOnChanges() {
    //   this.searchData$?.subscribe(async e => {
    //     const google = await this.googleMapService.getGoogleMapInstance();
    //     // this.addMarkerOnMap({lat: e.lat, lng: e.lng});
    //   });
  }

  async loadGoogleMap() {
    this.google = await this.googleMapService.getGoogleMapInstance();
    this.searchData$?.subscribe(e => {
      this.mapOptions.center = {lat: e.lat, lng: e.lng}
      // this.googleMap?.setCenter({lat: e.lat, lng: e.lng});
      setTimeout(() => {
        this.googleMap = new this.google.maps.Map(this.map?.nativeElement, this.mapOptions);
        this.addMarkerOnMap({lat: e.lat, lng: e.lng});
      }, 1000);
    })
  }

  addMarkerOnMap(userPosition: { lat: number; lng: number; } | undefined) {
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
      const marker = new this.google.maps.Marker({
        position: {lat: location[0], lng: location[1]},
        map: map,
        icon: '../../../assets/images/parking.png'
      });
      this.mapMarkers?.push(marker);
    }
    deleteMarkers();

    this.parkingLots.map(parkingLot => {
      addMarker(parkingLot?.location.coordinates);
    })

    // add user's current position
    this.addUserCurrentPositionMarker(userPosition)
  }

  addUserCurrentPositionMarker(location: { lat: number; lng: number } | undefined) {
    const priceTag = document.createElement('div');
    priceTag.className = 'price-tag';
    priceTag.textContent = '₹ 10';

    // @ts-ignore
    const priceTagMarker = new this.google.maps.marker.AdvancedMarkerView({
      map: this.googleMap,
      position: location,
      content: priceTag,
    });
    // priceTagMarker.setAnimation(2);
    priceTagMarker.addListener('gmp-click', () => {
      console.log('Hi');
    });
    this.mapMarkers?.push(priceTagMarker);
  }

}
