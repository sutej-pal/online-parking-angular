import {Injectable} from '@angular/core';
import * as moment from "moment/moment";

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

  getParkingCost(parkingSpot: any, arrivalDateTime: any, exitDateTime: any ) {
    return parkingSpot.cost * moment(exitDateTime).diff(arrivalDateTime, 'hours');
  }
}
