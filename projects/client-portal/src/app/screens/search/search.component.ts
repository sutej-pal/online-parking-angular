import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {google} from 'google-maps';
import {Store} from "@ngrx/store";
import {getSearchData} from "../../store/search/search.selectors";
import {BehaviorSubject, Observable} from "rxjs";
import {searchData} from "../../store/search/search.reducer";
import {MatDrawer} from "@angular/material/sidenav";
import {ParkingLot} from "../../types/types";
import {HttpService} from "../../../../../common-services/http.service";
import {Router} from "@angular/router";
import * as _ from "underscore";
import {NotificationService} from "../../../../../common-services/notification.service";
import {GoogleMapService} from "../../services/google-map.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss']
})
export class SearchComponent implements OnInit, OnDestroy {

  @ViewChild('map', {static: true}) map: ElementRef | undefined;
  @ViewChild('drawer', {static: true}) drawer: MatDrawer | undefined;
  parkingLotList: ParkingLot[] = [];
  google: google | undefined
  searchData$: Observable<searchData> | undefined;
  selectedParkingLot$: BehaviorSubject<ParkingLot> = new BehaviorSubject<ParkingLot>({
    amenities: {
      cctv: false,
      secured: false,
      twentyFourHourService: false,
      wheelChairEntrance: false
    },
    minBookingDuration: 0,
    name: "",
    location: {
      coordinates: [0, 0]
    },
    parkingSpot: {
      price: 0
    }
  });
  isPLDetailWindowExpanded = false;

  constructor(
    private store: Store,
    private router: Router,
    private httpService: HttpService,
    private notificationService: NotificationService
  ) {
  }

  async ngOnInit() {
    this.searchData$ = this.store.select(getSearchData);
    this.searchData$?.subscribe(async e => {
      this.drawer?.close();
      await this.getParkingLots(e);
    })
  }

  showParkingLotDetails(parkingLot: ParkingLot) {
    this.selectedParkingLot$.next(parkingLot);
    if (!this.drawer?.opened) {
      this.drawer?.open();
    }
  }

  ngOnDestroy() {
  }

  async getParkingLots(data: searchData) {
    try {
      const result = await this.httpService.executeRequest('search', 'post', data).toPromise();
      this.parkingLotList = result.body.data;
    } catch (e) {
      this.notificationService.showError('Failed to load Parking Lots.');
    }
  }

  sortParkingLotsByPrice() {
    // this.parkingLotList = _.sortBy(this.parkingLotList, (parkingLot) => {
    //   return parkingLot?.parkingSpots?[0].price
    // });
  }

  sortParkingLotsByDistance() {

  }
}
