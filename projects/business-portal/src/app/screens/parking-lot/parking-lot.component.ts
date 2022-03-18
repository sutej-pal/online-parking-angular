import {Component, OnInit} from '@angular/core';
import {Router} from "@angular/router";
import {Store} from "@ngrx/store";
import {loadParkingLots} from "../../store/parking-lot/parking-lot.actions";
import {Observable, Subscription} from "rxjs";
import {getUser} from "../../store/user/user.selectors";

@Component({
  selector: 'app-parking-lot',
  templateUrl: './parking-lot.component.html',
  styleUrls: ['./parking-lot.component.scss']
})
export class ParkingLotComponent implements OnInit {

  user$: Observable<any> | undefined;

  constructor(
    private router: Router,
    private store: Store
  ) {
  }

  ngOnInit(): void {
    this.user$ = this.store.select((state: any) => state.user) as Observable<any>;
    this.user$.subscribe(e => {
      console.log('e', e)
    });
  }

  async addParkingLot() {
    await this.router.navigate(['parking-lot/add']);
  }
}
