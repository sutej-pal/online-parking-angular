import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParkingLot} from "../../types/types";
import * as moment from "moment";

@Component({
  selector: 'app-parking-lot-details',
  templateUrl: './parking-lot-details.component.html',
  styleUrls: ['./parking-lot-details.component.scss']
})
export class ParkingLotDetailsComponent implements OnInit {

  @Input() parkingLot: ParkingLot | undefined;
  @Output() toggleExpandPLDetailWindow: EventEmitter<any> = new EventEmitter();
  @Output() closePLDetailWindow: EventEmitter<any> = new EventEmitter();
  isPLDetailWindowExpanded = false;
  moment: any = moment;

  constructor() { }

  ngOnInit(): void {
  }



}
