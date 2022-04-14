import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParkingLot} from "../../types/types";

@Component({
  selector: 'app-parking-lot-details',
  templateUrl: './parking-lot-details.component.html',
  styleUrls: ['./parking-lot-details.component.scss']
})
export class ParkingLotDetailsComponent implements OnInit {

  @Input() parkingLot: ParkingLot | undefined;
  @Output() closePLDetailWindow: EventEmitter<any> = new EventEmitter()

  constructor() { }

  ngOnInit(): void {
  }



}
