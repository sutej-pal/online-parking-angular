import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Loader, LoaderOptions} from "google-maps";
import {NotificationService} from "../../../../../common-services/notification.service";

@Component({
  selector: 'app-lat-lng-picker',
  templateUrl: './lat-lng-picker.component.html',
  styleUrls: ['./lat-lng-picker.component.scss']
})
export class LatLngPickerComponent implements OnInit {

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
    public dialogRef: MatDialogRef<LatLngPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
    this.getCurrentLocation();
    this.dialogRef.beforeClosed().subscribe(e => {
      console.log(e);
    })
  }

  getCurrentLocation() {
    // Try HTML5 geolocation.
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.mapOptions.center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          }
          this.loadGoogleMap();
        },
        () => {
          this.loadGoogleMap();
          // handleLocationError(true, infoWindow, map.getCenter());
        }
      );
    } else {
      // Browser doesn't support Geolocation
      // handleLocationError(false, infoWindow, map.getCenter());
    }
  }

  async loadGoogleMap() {
    const options: LoaderOptions = {
      libraries: ['places'],
      region: 'IN'
    };

    const loader = new Loader('AIzaSyDM4BtVx-2cRWTEEu3JOdx0szr735nXzPU', options);

    const google = await loader.load();
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
}
