import {Component, OnInit} from '@angular/core';
import {google} from 'google-maps';
import {GoogleMapService} from "./services/google-map.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent implements OnInit {
  title = 'business-portal';
  static googleMap: google;

  constructor(private googleMapService: GoogleMapService) {
  }

  async ngOnInit() {
    AppComponent.googleMap = await this.googleMapService.initMap();
  }

  static async getCurrentLocation() {
    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            resolve({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            })
          },
          () => {
            reject({
              lat: 0,
              lng: 0,
            });
          }
        );
      } else {
        reject({
          lat: 0,
          lng: 0,
        });
      }
    })
  }
}
