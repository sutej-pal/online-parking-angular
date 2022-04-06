import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";
import {google} from 'google-maps';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  mapOptions: any = {
    center: {
      lat: 0,
      lng: 0
    },
    zoom: 12
  };
  reviews: any = [0, 1, 2];
  google: google | undefined
  isParkingLotDetailsVisible = false;

  constructor() {
  }

  async ngOnInit() {
    await this.checkIfMapLoaded();
    const searchData = localStorage.getItem('searchData');
    // @ts-ignore
    console.log(JSON.parse(searchData));
  }

  async checkIfMapLoaded() {
    this.google = await AppComponent.googleMap;
    if (this.google && this.google.maps) {
      await this.loadGoogleMap();
    } else {
      setTimeout(async () => {
        await this.checkIfMapLoaded();
      }, 500);
    }
  }

  async loadGoogleMap() {
    const google = await AppComponent.googleMap
    const MapTypeId = google.maps.MapTypeId;
    this.mapOptions['mapTypeId'] = MapTypeId.ROADMAP;
    const map = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
  }

  showParkingLotDetails() {
    this.isParkingLotDetailsVisible = true
  }
}
