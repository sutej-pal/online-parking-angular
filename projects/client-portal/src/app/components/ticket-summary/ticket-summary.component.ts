import {Component, OnInit} from '@angular/core';
import {getSearchData} from "../../store/search/search.selectors";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {Store} from "@ngrx/store";
import * as moment from "moment/moment";
import {getBookingData} from "../../store/booking/booking.selectors";
import {BookingData} from "../../store/booking/booking.reducer";
import {ParkingLot} from "../../types/types";

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.scss']
})
export class TicketSummaryComponent implements OnInit {

  searchData$: Observable<searchData> | undefined;
  bookingData$: Observable<BookingData> | undefined;
  moment: any = moment;
  parkingLotAmenities: { icon: string, name: string }[] = [];

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.searchData$ = this.store.select(getSearchData);
    this.bookingData$ = this.store.select(getBookingData);

    this.bookingData$.subscribe(e => {
      for (const [key, value] of Object.entries(e.parkingLot.amenities)) {
        if (value) {
          const facility = {
            icon: 'icon',
            name: key
          }
          switch (key) {
            case 'cctv': {
              facility.icon = 'videocam';
              break;
            }
            case 'secured': {
              facility.icon = 'videocam';
              break;
            }
            case 'twentyFourHourService': {
              facility.icon = 'videocam';
              break;
            }
          }
          this.parkingLotAmenities.push(facility);
        }
      }
      console.log(this.parkingLotAmenities);
    })
  }

}
