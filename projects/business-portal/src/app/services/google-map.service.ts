import {Injectable} from '@angular/core';
import {Loader, LoaderOptions} from "google-maps";

@Injectable({
  providedIn: 'root'
})
export class GoogleMapService {

  constructor() {
  }

  async initMap() {
    const options: LoaderOptions = {
      libraries: ['places'],
      region: 'IN'
    };

    const loader = new Loader('AIzaSyDM4BtVx-2cRWTEEu3JOdx0szr735nXzPU', options);
    return await loader.load()
  }

  removeGoogleMapScripts() {
    let flag = false;
    const scripts = document.getElementsByTagName("script");
    for (let i = 0; i < scripts.length; i++) {
      if (scripts[i].src.match(/maps.googleapis.com/)) {
        flag = true
        scripts[i]?.parentNode?.removeChild(scripts[i]);
      }
    }
    if (flag) {
      this.removeGoogleMapScripts();
    }
  }
}

