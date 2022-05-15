import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {ParkingLot} from "../../types/types";
import * as moment from "moment";
import {searchData} from "../../store/search/search.reducer";
import {BehaviorSubject, Observable} from "rxjs";
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
  @Input() parkingLot$: BehaviorSubject<ParkingLot>;
  @Output() toggleExpandPLDetailWindow: EventEmitter<any> = new EventEmitter();
  @Output() closePLDetailWindow: EventEmitter<any> = new EventEmitter();
  price: number | undefined;
  isPLDetailWindowExpanded = false;
  moment: any = moment;
  bookingTime: number;

  constructor(
    private store: Store,
    private router: Router,
  ) {
  }

  ngOnInit(): void {
    this.searchData$?.subscribe(e => {
      const diff = moment(e.exitDateTime).diff(moment(e.arrivalDateTime), 'hours', true);
      this.bookingTime = Math.ceil(diff);
      console.log('d');
    });
    this.parkingLot$.subscribe(e => {
      if (e) {

        if (e.minBookingDuration === 24) {

        } else {
          // @ts-ignore
          this.price = e.parkingSpot?.price * this.bookingTime
        }
      }
    })

  }


  async navigateToCheckOut() {
    const searchData = {
      basePrice: this.price,
      parkingLot: this.parkingLot$.value
    }
    this.store.dispatch(updateBookingData({payload: searchData}));
    await this.router.navigate(['checkout'])
  }
}
