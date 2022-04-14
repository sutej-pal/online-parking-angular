import {Component, Input, OnInit} from '@angular/core';
import {ParkingLot} from "../../types/types";

@Component({
  selector: 'app-parking-lot-card',
  templateUrl: './parking-lot-card.component.html',
  styleUrls: ['./parking-lot-card.component.scss']
})
export class ParkingLotCardComponent implements OnInit {

  @Input() parkingLotData: ParkingLot | undefined

  constructor() { }

  ngOnInit(): void {
  }

}
