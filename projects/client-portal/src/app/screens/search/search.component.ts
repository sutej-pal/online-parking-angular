import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {AppComponent} from "../../app.component";

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
  reviews: any = [0, 1, 2, 3, 4, 5, 6];

  constructor() {
  }

  async ngOnInit() {
    await this.loadGoogleMap();
  }

  async loadGoogleMap() {
    const google = await AppComponent.googleMap
    const MapTypeId = google.maps.MapTypeId;
    this.mapOptions['mapTypeId'] = MapTypeId.ROADMAP;
    const map = new google.maps.Map(this.map?.nativeElement, this.mapOptions);
  }

}
