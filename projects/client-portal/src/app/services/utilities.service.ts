import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UtilitiesService {

  constructor() {
  }

  onImgError(event: ErrorEvent) {
    let element = event.target as HTMLImageElement
    element.src = '../assets/images/default-placeholder.png';
  }
}
