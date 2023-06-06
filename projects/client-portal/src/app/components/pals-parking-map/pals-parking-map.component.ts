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

  constructor(
    private store: Store,
    private googleMapService: GoogleMapService,
    private utilitiesService: UtilitiesService
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
  async ngOnChanges() {
    this.searchData$?.subscribe(async e => {
      const google = await this.googleMapService.getGoogleMapInstance();
      this.addMarkerOnMap({lat: e.lat, lng: e.lng});
    });
  }

  async loadGoogleMap() {
    const google = await this.googleMapService.getGoogleMapInstance();
    this.googleMap = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
    this.searchData$?.subscribe(e => {
      this.googleMap?.setCenter({lat: e.lat, lng: e.lng});
      this.addMarkerOnMap({lat: e.lat, lng: e.lng});
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
      const marker = new google.maps.Marker({
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

  async addUserCurrentPositionMarker(location: { lat: number; lng: number } | undefined) {
    let map = this.googleMap;
    // // const label =
    // const options: google.maps.MarkerOptions = {
    //   position: location,
    //   map: map,
    //   label: {
    //     text: `<div>Sutej Pal</div>`,
    //     className: 'sample'
    //   }
    // }
    const t = await this.utilitiesService.sample(map, location);
    console.log(t);
    // const options = await this.googleMapService.getMarkerOptions(location, map, 'sample');
    // const marker = new google.maps.Marker(options);
    const infoWindow =  new google.maps.InfoWindow({
      content: 'Hello World! s',
      position: location
    });
    // marker.setAnimation(2);
    // marker.addListener('click', () => {
    //   infoWindow.open(map);
    // });
    // this.mapMarkers?.push(marker);
  }

}
