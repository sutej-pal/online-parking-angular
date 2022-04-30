import {Component, OnInit} from '@angular/core';
import {getSearchData} from "../../store/search/search.selectors";
import {Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {Store} from "@ngrx/store";
import * as moment from "moment/moment";
import {getBookingData} from "../../store/booking/booking.selectors";
import {BookingData} from "../../store/booking/booking.reducer";

@Component({
  selector: 'app-ticket-summary',
  templateUrl: './ticket-summary.component.html',
  styleUrls: ['./ticket-summary.component.scss']
})
export class TicketSummaryComponent implements OnInit {

  searchData$: Observable<searchData> | undefined;
  bookingData$: Observable<BookingData> | undefined;
  moment: any = moment;

  constructor(
    private store: Store,
  ) {
  }

  ngOnInit(): void {
    this.searchData$ = this.store.select(getSearchData);
    this.bookingData$ = this.store.select(getBookingData);

    this.bookingData$.subscribe(e => {
      console.log('e', e);
    })
  }

}
