import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {Loader, LoaderOptions} from 'google-maps';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  mapObject: any

  constructor() {
  }

  async ngOnInit(): Promise<void> {
    await this.loadGoogleMap();
  }

  async loadGoogleMap() {
    const options: LoaderOptions = {
      libraries: ['places'],
      region: 'IN'
    };

    const loader = new Loader('AIzaSyDM4BtVx-2cRWTEEu3JOdx0szr735nXzPU', options);

    const google = await loader.load();
    const MapTypeId = google.maps.MapTypeId;
    this.mapObject = new google.maps.Map(this.map?.nativeElement, {
      center: {lat: 24.14, lng: 80.59},
      mapTypeId: MapTypeId.ROADMAP,
      zoom: 6,
    });
  }
}
