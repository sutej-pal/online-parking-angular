import {Component} from '@angular/core';
import {GoogleMapService} from "./services/google-map.service";
import {google} from "google-maps";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'client-portal';
  static googleMap: google;

  constructor(private googleMapService: GoogleMapService) {
  }

  async ngOnInit() {
    AppComponent.googleMap = await this.googleMapService.initMap();
  }

  static async getCurrentLocation() {
    interface currentLocation {
      lat: number,
      lng: number
    }

    return new Promise((resolve, reject) => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const location: currentLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            }
            resolve(location);
          },
          () => {
            const location: currentLocation = {
              lat: 0,
              lng: 0,
            }
            reject(location);
          }
        );
      } else {
        const location: currentLocation = {
          lat: 0,
          lng: 0,
        }
        reject(location);
      }
    })
  }
}
