import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {Observable} from "rxjs";
import {HttpService} from "../../../../../common-services/http.service";
import {ParkingLotService} from "../../services/parking-lot.service";
import {ParkingLot} from "../../store/parking-lot/parking-lot.reducer";

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {

  user$: Observable<any> | undefined;
  parkingLotArray: ParkingLot[] = [];

  constructor(
    private router: Router,
    private store: Store,
    private parkingLotService: ParkingLotService,
  ) {
  }

  async ngOnInit() {
    this.user$ = this.store.select((state: any) => state.user) as Observable<any>;
    await this.getParkingLots();
  }

  async getParkingLots() {
    this.parkingLotArray = await this.parkingLotService.list();
  }

  async addParkingLot() {
    await this.router.navigate(['parking-lot/add']);
  }
}
