import {Component, Input, OnInit} from '@angular/core';
import {ParkingLot} from "../../types/types";
import {UtilitiesService} from "../../services/utilities.service";

@Component({
  selector: 'app-parking-lot-card',
  templateUrl: './parking-lot-card.component.html',
  styleUrls: ['./parking-lot-card.component.scss']
})
export class ParkingLotCardComponent implements OnInit {

  @Input() parkingLotData: ParkingLot | undefined

  constructor(
    public utilitiesService: UtilitiesService
  ) {
  }

  ngOnInit(): void {
  }

}
