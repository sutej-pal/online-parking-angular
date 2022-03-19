import {Component, ElementRef, Inject, OnInit, ViewChild} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {Loader, LoaderOptions} from "google-maps";

@Component({
  selector: 'app-lat-lng-picker',
  templateUrl: './lat-lng-picker.component.html',
  styleUrls: ['./lat-lng-picker.component.scss']
})
export class LatLngPickerComponent implements OnInit {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  mapObject: any

  constructor(
    public dialogRef: MatDialogRef<LatLngPickerComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
  }

  async ngOnInit() {
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
