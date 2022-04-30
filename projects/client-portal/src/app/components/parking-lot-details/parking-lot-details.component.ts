import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParkingLot} from "../../types/types";
import * as moment from "moment";
import {searchData} from "../../store/search/search.reducer";
import {Observable} from "rxjs";
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {updateBookingData} from "../../store/booking/booking.actions";

@Component({
  selector: 'app-parking-lot-details',
  templateUrl: './parking-lot-details.component.html',
  styleUrls: ['./parking-lot-details.component.scss']
})
export class ParkingLotDetailsComponent implements OnInit {

  @Input() searchData$: Observable<searchData> | undefined;
  @Input() parkingLot: ParkingLot | undefined;
  @Output() toggleExpandPLDetailWindow: EventEmitter<any> = new EventEmitter();
  @Output() closePLDetailWindow: EventEmitter<any> = new EventEmitter();
  isPLDetailWindowExpanded = false;
  moment: any = moment;

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchData$?.subscribe(e => {
      // console.log('e', e);
    })
  }


  async navigateToCheckOut() {
    this.store.dispatch(updateBookingData({payload: {parkingLot: this.parkingLot}}));
    await this.router.navigate(['checkout'])
  }
}
