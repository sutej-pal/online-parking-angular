import {Injectable} from '@angular/core';
import {google, Loader, LoaderOptions} from "google-maps";
import {AsyncSubject, Observable, Subscription} from "rxjs";

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
      libraries: ['places'],
      region: 'IN'
    };

    this.loader = new Loader('AIzaSyDM4BtVx-2cRWTEEu3JOdx0szr735nXzPU', options);
    this.google = await this.loader.load();
    this.isMapLoaded.next(true);
    this.isMapLoaded.complete();
  }

  getGoogleMapInstance(): Promise<google> {
    return new Promise((resolve, reject) => {
      this.isMapLoaded.subscribe(e => {
        resolve(this.google);
      })
    });
  }
}
