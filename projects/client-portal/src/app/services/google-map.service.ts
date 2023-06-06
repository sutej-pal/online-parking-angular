import {Injectable} from '@angular/core';
import {google, Loader, LoaderOptions} from "google-maps";
import {AsyncSubject, Observable, Subscription} from "rxjs";

export interface LatLng {
  lat: number,
  lng: number
}

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  static loader: any
  loader: Loader;
  google: google;
  isMapLoaded: AsyncSubject<boolean> = new AsyncSubject<boolean>();

  constructor() {
  }

  async initMap() {
    const options: LoaderOptions = {
      libraries: ['places', 'marker'],
      region: 'IN',
      version: 'beta',
    };

    this.loader = new Loader('AIzaSyDM4BtVx-2cRWTEEu3JOdx0szr735nXzPU', options);
    this.google = await this.loader.load();
    this.isMapLoaded.next(true);
    this.isMapLoaded.complete();
  }

  getGoogleMapInstance(): Promise<google> {
    return new Promise((resolve) => {
      this.isMapLoaded.subscribe(e => {
        resolve(this.google);
      })
    });
  }

  getPriceTagMarker(map: any, location: any, price: number | undefined) {
    const priceTag = document.createElement('div');
    priceTag.className = 'price-tag';
    priceTag.textContent = '₹ ' + price;

    // @ts-ignore
    return new this.google.maps.marker.AdvancedMarkerView({
      map: map,
      position: location,
      content: priceTag,
    });
  }
}
