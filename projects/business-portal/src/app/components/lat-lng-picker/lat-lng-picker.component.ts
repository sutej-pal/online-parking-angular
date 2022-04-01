import {Component, ElementRef, OnDestroy, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {NotificationService} from "../../../../../common-services/notification.service";
import {GoogleMapService} from "../../services/google-map.service";
import {AppComponent} from "../../app.component";

@Component({
  selector: 'app-lat-lng-picker',
  templateUrl: './lat-lng-picker.component.html',
  styleUrls: ['./lat-lng-picker.component.scss']
})

export class LatLngPickerComponent implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 12
  };
  coordinatesData: { lat: number; lng: number; } | undefined;

  constructor(
    private notificationService: NotificationService,
    private googleMapService: GoogleMapService,
    public dialogRef: MatDialogRef<LatLngPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
    await this.loadGoogleMap();
    this.dialogRef.beforeClosed().subscribe(e => {
      console.log(e);
    })
  }

  async loadGoogleMap() {
    const google = AppComponent.googleMap
    if (this.data.center && this.data.center.lat !== '' && this.data.center.lng !== '') {
      this.mapOptions.center = this.data.center;
    } else {
      this.mapOptions.center = await AppComponent.getCurrentLocation()
    }
    const MapTypeId = google.maps.MapTypeId;
    this.mapOptions['mapTypeId'] = MapTypeId.ROADMAP;
    const map = new google.maps.Map(this.map?.nativeElement, this.mapOptions);

    let markers: google.maps.Marker[] = [];

    map.addListener("click", (event) => {
      deleteMarkers();
      addMarker(event.latLng);
      map.panTo(event.latLng);
      this.selectCoordinates(event.latLng);
    });

    function addMarker(location: google.maps.LatLng) {
      const marker = new google.maps.Marker({
        position: location,
        map: map,
      });
      markers.push(marker);
    }

    // Deletes all markers in the array by removing references to them.
    function deleteMarkers() {
      setMapOnAll(null);
      markers = [];
    }

    // Sets the map on all markers in the array.
    function setMapOnAll(map: google.maps.Map<Element> | google.maps.StreetViewPanorama | null) {
      for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(map);
      }
    }
  }

  selectCoordinates(latLng: google.maps.LatLng) {
    this.coordinatesData = {
      lat: latLng.lat(),
      lng: latLng.lng()
    }
  }

  setCoordinates() {
    if (this.coordinatesData) {
      this.dialogRef.close(this.coordinatesData);
    } else {
      this.notificationService.showError('Please add a marker on map');
    }
  }

  ngOnDestroy() {
    this.googleMapService.removeGoogleMapScripts();
  }
}
